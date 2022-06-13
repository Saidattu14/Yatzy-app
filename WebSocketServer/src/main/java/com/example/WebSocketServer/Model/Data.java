package com.example.WebSocketServer.Model;

import com.example.WebSocketServer.Services.Scoreboard;
import org.json.JSONObject;

import java.util.Hashtable;
import java.util.List;

public class Data {
    private JSONObject estimated_score;
    private JSONObject colors;
    private Scoreboard sc = new Scoreboard();
    private Hashtable<String,Integer> checking;
    public Data(JSONObject estimated_score, Hashtable<String, Integer> checking, JSONObject colors)
    {
        this.estimated_score = estimated_score;
        this.colors = colors;
        this.checking = checking;
        this.checking.put("Ones",1);
        this.checking.put("Twos",1);
        this.checking.put("Threes",1);
        this.checking.put("Fours",1);
        this.checking.put("Fives",1);
        this.checking.put("Sixs",1);
        this.checking.put("Pair",1);
        this.checking.put("TwoPair",1);
        this.checking.put("ThreeofKind",1);
        this.checking.put("FourofKind",1);
        this.checking.put("FullHouse",1);
        this.checking.put("SmallStraight",1);
        this.checking.put("LargeStraight",1);
        this.checking.put("Chance",1);
        this.checking.put("Yatzy",1);
    }

    public void setEstimated_score(JSONObject estimated_score) {

        this.estimated_score = estimated_score;
    }

    public JSONObject getEstimated_score(List<Integer> list) {

        this.estimated_score = this.sc.Score(this.estimated_score,list,this.checking);
        return this.estimated_score;
    }
    public void setColors(JSONObject colors)
    {
        this.colors = colors;
    }
    public  void  setChecking(Hashtable<String, Integer> checking, String s)
    {
        this.checking.put(s,0);
    }

    public Hashtable<String, Integer> getChecking() {
        return this.checking;
    }

    public  JSONObject getColors()
    {
        return  this.colors;
    }
}
