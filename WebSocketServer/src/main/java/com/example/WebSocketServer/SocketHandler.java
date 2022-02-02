package com.example.WebSocketServer;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.gson.JsonObject;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import javax.websocket.Session;
import java.io.IOException;
import java.util.*;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.ExecutionException;

@Component
public class SocketHandler extends TextWebSocketHandler {
    private Hashtable<String,String> match = new Hashtable<>();
    private Hashtable<String,WebSocketSession> MySession = new Hashtable<>();
    private HashMap<WebSocketSession,Client> ClientData = new HashMap<>();
    private HashMap<String,Users> UserList = new HashMap<>();
    private List<Users> list = new ArrayList<>();

    private FirebaseConfig fb = new FirebaseConfig();
    List sessions = new CopyOnWriteArrayList<>();
    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message)
            throws InterruptedException, IOException, FirebaseMessagingException, ExecutionException {
        String s = message.getPayload().toString();
        JSONObject js11 = new JSONObject(s);
        String s1 = js11.getString("Method");
        if(s1.equals("Connect")) {
            AddClientsData(session,js11);
        }
        else if(s1.equals("Dicerolling"))
        {
          RollingDices(session,js11);
        }
        else if(s1.equals("Score_Update"))
        {
            ScoreUpdate(session,js11);
        }
        else if(s1.equals("UserList"))
        {
            UserListData(session,js11);
        }
        else if(s1.equals("Validation"))
        {
            UserValidation(session);
        }
        else if(s1.equals("AddUser"))
        {
            AddUser(session,js11);
        }
        else if(s1.equals("RequestMsg"))
        {
            UserRequest(session,js11);
        }

    }



    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        super.afterConnectionClosed(session, status);
        session.close();
        getSessions();
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
       System.out.println(session);
        Data d = new Data(new JSONObject(), new Hashtable<>(),new JSONObject());
        this.ClientData.put(session,new Client(d));
        this.sessions.add(session);

    }

    public void getSessions() {

        System.out.println(this.sessions.size());
    }
    public void setSessions(List sessions) {
        this.sessions = sessions;
    }

    public  void GameStart(WebSocketSession s1, WebSocketSession s2) throws IOException {
        Client c1 = this.ClientData.get(s1);
        c1.setOpponent(s2);
        JSONObject e1 = new JSONObject();
        e1.put("Method","Roll Dice");
        e1.put("OppMethod","Opponent Turn");
        JSONObject e2 = new JSONObject();
        e2.put("Method","Opponent Turn");
        e2.put("OppMethod","Roll Dice");
        SendingMessages(e1,e2,s1,s2);
    }
    public void SendingMessages(JSONObject j1, JSONObject j2, WebSocketSession s1,WebSocketSession s2) throws IOException {
        TextMessage msg1 = new TextMessage(j1.toString());
        TextMessage msg2 = new TextMessage(j2.toString());
        s1.sendMessage(msg1);
        s2.sendMessage(msg2);
    }
    public void RollingDices(WebSocketSession session,JSONObject object) throws IOException {
        JSONArray jsa = object.getJSONArray("Dices");
        List<Integer> list = new ArrayList<Integer>();
        jsa.iterator().forEachRemaining(element -> {
                list.add((Integer) element);
        });
        JSONObject e2 = new JSONObject();
        e2.put("Method","OpponentDices");
        e2.put("Dices",jsa);
        JSONObject e1 = new JSONObject();
        e1.put("Method","Estimated_MyScore");
        e1.put("MyScore",this.ClientData.get(session).getMyobj().getEstimated_score(list));
        e1.put("Colors",this.ClientData.get(session).getMyobj().getColors());
        SendingMessages(e1,e2,session,this.ClientData.get(session).getOpponent());
    }
    public void ScoreUpdate(WebSocketSession session,JSONObject object) throws IOException {
        this.ClientData.get(session).getMyobj().setEstimated_score(object.getJSONObject("MyScore"));
        Data d1 = this.ClientData.get(session).getMyobj();
        this.ClientData.get(session).getMyobj().setChecking(d1.getChecking(),object.getString("Checking"));
        d1.setColors(object.getJSONObject("Colors"));
        JSONObject e1 = new JSONObject();
        e1.put("Method", "Update_MyScore");
        e1.put("MyScore", object.getJSONObject("MyScore"));
        e1.put("Colors", object.getJSONObject("Colors"));
        JSONObject e2 = new JSONObject();
        e2.put("Method", "Update_OppScore");
        e2.put("Score",object.getJSONObject("MyScore"));
        SendingMessages(e1,e2,session,this.ClientData.get(session).getOpponent());
    }
    public void AddClientsData(WebSocketSession session, JSONObject object)
    {
        String s2 = object.getString("OpponentName");
        String s3 = object.getString("MyName");
        Client c = this.ClientData.get(session);
        c.setMyName(s3);
        c.setOpponentName(s2);
        try {
            this.match.put(s3,s2);
            this.MySession.put(s3,session);
            if(this.match.get(s2).equals(s3))
            {
                System.out.println("Matched");
                c.setOpponent(this.MySession.get(s2));
                GameStart(this.MySession.get(s2),session);
                this.ClientData.get(session).getMyobj().setEstimated_score(object.getJSONObject("MyScore"));
                this.ClientData.get(session).getMyobj().setColors(object.getJSONObject("Colors"));
                WebSocketSession a = this.ClientData.get(session).getOpponent();
                this.ClientData.get(a).getMyobj().setEstimated_score(object.getJSONObject("MyScore"));
                this.ClientData.get(a).getMyobj().setColors(object.getJSONObject("Colors"));
            }
        }
        catch (Exception ex)
        {
          System.out.println("UnMatched Error");
        }
    }
    public void  UserListData(WebSocketSession s, JSONObject object)
    {
        try {
            String s2 = object.getString("MyName");
            Users ur = this.UserList.get(s2);
            int index = ur.getIndex();
            this.list.remove(index);
            JSONObject js = new JSONObject();
            js.put("Method","UserList");
            js.put("Data",this.list);
            TextMessage msg1 = new TextMessage(js.toString());
            s.sendMessage(msg1);
            this.list.add(index,ur);
        }
        catch (Exception ex)
        {
            System.out.println("Error List");
        }
    }
    public void  UserValidation(WebSocketSession s) throws IOException {

        try {

            JSONObject js = new JSONObject();
            js.put("Method","UserList");
            js.put("Data",this.list);
            TextMessage msg1 = new TextMessage(js.toString());
            s.sendMessage(msg1);
        }
        catch (Exception ex)
        {
            System.out.println("Error user");
        }
    }
    public void  AddUser(WebSocketSession s,JSONObject object) throws IOException {

        try {

            String s2 = object.getString("MyName");
            String s3 = object.getString("FCMToken");
            if(this.UserList.get(s2) == null)
            {
                Users ur = new Users(s2,s3,"Online");
                this.UserList.put(s2, ur);
                this.list.add(ur);
                ur.setIndex(this.list.size()-1);
                JSONObject e1 = new JSONObject();
                e1.put("Method", "UserValid");
                e1.put("Result", "true");
                TextMessage msg1 = new TextMessage(e1.toString());
                s.sendMessage(msg1);
            }
            else
            {
                throw new IOException("Bad Name");
            }

        }
        catch (Exception ex)
        {
            JSONObject e1 = new JSONObject();
            e1.put("Method", "UserValid");
            e1.put("Result", "false");
            TextMessage msg1 = new TextMessage(e1.toString());
            s.sendMessage(msg1);
        }
    }
    public void  UserRequest(WebSocketSession s,JSONObject object) throws ExecutionException, FirebaseMessagingException, InterruptedException {
        String s2 = object.getString("OpponentName");
        String s3 = object.getString("MyName");
        String s4 = object.getString("OpponentFCM");
        fb.FirebaseSendMessage(s4,s2,s3);
    }

}
