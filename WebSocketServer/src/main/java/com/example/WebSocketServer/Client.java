package com.example.WebSocketServer;

import org.springframework.web.socket.WebSocketSession;

public class Client {
    private WebSocketSession Opponent;
    private String OpponentName;
    private String MyName;
    private Data myobj;
    private Data Oppobj;
    Client(Data e)
    {
     this.myobj = e;
    }

    public Data getMyobj() {
        return this.myobj;
    }


    public String getOpponentName() {
        return OpponentName;
    }

    public WebSocketSession getOpponent() {
        return this.Opponent;
    }

    public void setOpponentName(String opponentName) {
        this.OpponentName = opponentName;
    }

    public void setMyName(String myName) {
        this.MyName = myName;
    }

    public void setOpponent(WebSocketSession opponent) {
        this.Opponent = opponent;
    }
}
