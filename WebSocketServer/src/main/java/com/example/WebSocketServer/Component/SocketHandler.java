package com.example.WebSocketServer.Component;
import com.example.WebSocketServer.Model.Client;
import com.example.WebSocketServer.Model.Data;
import com.example.WebSocketServer.Model.Users;
import com.example.WebSocketServer.Services.SendingNotificationService;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.*;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.ExecutionException;

@Component
public class SocketHandler extends TextWebSocketHandler {


    @Autowired
    SendingNotificationService sendingNotificationService;
    private final Hashtable<String,String> match = new Hashtable<>();
    private final Hashtable<String,WebSocketSession> mySession = new Hashtable<>();
    private final HashMap<WebSocketSession, Client> clientData = new HashMap<>();
    private final HashMap<String, Users> userList = new HashMap<>();
    private final List<Users> list = new ArrayList<>();
    List<Object> sessions = new CopyOnWriteArrayList<>();

    public SocketHandler(SendingNotificationService sendingNotificationService) {
        this.sendingNotificationService = sendingNotificationService;
    }


    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message)
            throws InterruptedException, IOException, ExecutionException {
        String s = message.getPayload();
        JSONObject js11 = new JSONObject(s);
        String s1 = js11.getString("Method");
        switch (s1) {
            case "Connect":
                addClientsData(session, js11);
                break;
            case "Dicerolling":
                rollingDices(session, js11);
                break;
            case "Score_Update":
                scoreUpdate(session, js11);
                break;
            case "UserList":
                userListData(session, js11);
                break;
            case "Validation":
                userValidation(session);
                break;
            case "AddUser":
                addUser(session, js11);
                break;
            case "RequestMsg":
                userRequest(js11);
                break;
            default:
                throw new IllegalStateException("Unexpected value: " + s1);
        }
    }



    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        super.afterConnectionClosed(session, status);
        session.close();
        this.clientData.remove(session);
        getSessions();
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        System.out.println(session);
        this.clientData.put(session,new Client(new Data(new JSONObject(), new Hashtable<>(),new JSONObject())));
        this.sessions.add(session);
    }

    public void getSessions() {

        System.out.println(this.sessions.size());
    }
    public void setSessions(List sessions) {

        this.sessions = sessions;
    }

    public  void gameStart(WebSocketSession s1, WebSocketSession s2) throws IOException {
        Client c1 = this.clientData.get(s1);
        c1.setOpponent(s2);
        JSONObject e1 = new JSONObject();
        e1.put("Method","Roll Dice");
        e1.put("OppMethod","Opponent Turn");
        JSONObject e2 = new JSONObject();
        e2.put("Method","Opponent Turn");
        e2.put("OppMethod","Roll Dice");
        sendingMessages(e1,e2,s1,s2);
    }
    public void sendingMessages(JSONObject j1, JSONObject j2, WebSocketSession s1,WebSocketSession s2) throws IOException {
        TextMessage msg1 = new TextMessage(j1.toString());
        TextMessage msg2 = new TextMessage(j2.toString());
        s1.sendMessage(msg1);
        s2.sendMessage(msg2);
    }
    public void rollingDices(WebSocketSession session,JSONObject object) throws IOException {
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
        e1.put("MyScore",this.clientData.get(session).getMyobj().getEstimated_score(list));
        e1.put("Colors",this.clientData.get(session).getMyobj().getColors());
        sendingMessages(e1,e2,session,this.clientData.get(session).getOpponent());
    }
    public void scoreUpdate(WebSocketSession session,JSONObject object) throws IOException {
        this.clientData.get(session).getMyobj().setEstimated_score(object.getJSONObject("MyScore"));
        Data d1 = this.clientData.get(session).getMyobj();
        this.clientData.get(session).getMyobj().setChecking(d1.getChecking(),object.getString("Checking"));
        d1.setColors(object.getJSONObject("Colors"));
        JSONObject e1 = new JSONObject();
        e1.put("Method", "Update_MyScore");
        e1.put("MyScore", object.getJSONObject("MyScore"));
        e1.put("Colors", object.getJSONObject("Colors"));
        JSONObject e2 = new JSONObject();
        e2.put("Method", "Update_OppScore");
        e2.put("Score",object.getJSONObject("MyScore"));
        sendingMessages(e1,e2,session,this.clientData.get(session).getOpponent());
    }
    public void addClientsData(WebSocketSession session, JSONObject object)
    {

        String s2 = object.getString("OpponentName");
        String s3 = object.getString("MyName");
        Client c = this.clientData.get(session);
        c.setMyName(s3);
        c.setOpponentName(s2);
        try {
            this.match.put(s3,s2);
            this.mySession.put(s3,session);
            if(this.match.get(s2).equals(s3))
            {
                System.out.println("Matched");
                c.setOpponent(this.mySession.get(s2));
                gameStart(this.mySession.get(s2),session);
                this.clientData.get(session).getMyobj().setEstimated_score(object.getJSONObject("MyScore"));
                this.clientData.get(session).getMyobj().setColors(object.getJSONObject("Colors"));
                WebSocketSession a = this.clientData.get(session).getOpponent();
                this.clientData.get(a).getMyobj().setEstimated_score(object.getJSONObject("MyScore"));
                this.clientData.get(a).getMyobj().setColors(object.getJSONObject("Colors"));
            }
        }
        catch (Exception ex)
        {
          System.out.println("UnMatched Error");
        }
    }
    public void  userListData(WebSocketSession s, JSONObject object)
    {
        try {
            String s2 = object.getString("MyName");
            Users ur = this.userList.get(s2);
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
    public void  userValidation(WebSocketSession s) throws IOException {

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
    public void  addUser(WebSocketSession s,JSONObject object) throws IOException {

        try {
            String s2 = object.getString("MyName");
            String s3 = object.getString("FCMToken");
            if(this.userList.get(s2) == null)
            {
                Users ur = new Users(s2,s3,"Online");
                this.userList.put(s2, ur);
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
    public void  userRequest(JSONObject object) throws ExecutionException, InterruptedException {
        String s2 = object.getString("OpponentName");
        String s3 = object.getString("MyName");
        String s4 = object.getString("OpponentFCM");
        sendingNotificationService.sendMessage(s4,s2,s3);
    }
}
