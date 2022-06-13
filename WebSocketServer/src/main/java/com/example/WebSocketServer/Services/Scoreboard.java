package com.example.WebSocketServer.Services;

import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.*;

@Service
public class Scoreboard {

    public int Ones_Twos_Threes_Fours_Fives_Sixs(List<Integer> list,int value)
    {

        int score = 0;
        for(int i = 0;i<list.size();i++)
        {

            if(list.get(i) == value)
            {
                score = score + 1;
            }
        }
        return score*value;
    }
    public int ThreeofKind_FourofKind_Yatzy(List<Integer> list,int value)
    {

        int a[]=new int[7];
        boolean result = false;
        int score = 0;
        int number = 0;
        for(int i = 0;i<list.size();i++)
        {
            a[list.get(i)] = a[list.get(i)] + 1;
            score = score + list.get(i);
            if(a[list.get(i)] >= value)
            {
                number = list.get(i);
                result = true;
            }
        }
        if(result == true) {
           if(value == 5)
           {
               return  50;
           }
            return value*number;

        }
        return  0;
    }
    public int Pair(List<Integer> list)
    {
        int a[]=new int[7];
        for(int i = 0;i<list.size();i++)
        {
            a[list.get(i)] = a[list.get(i)] + 1;
        }
        for(int i = 6;i>=1;i--)
        {
            if(a[i] >= 2)
            {
                return 2*i;
            }
        }
        return 0;
    }
    public int TwoPair(List<Integer> list)
    {
        int a[]=new int[7];
        int count = 0;
        int sum = 0;
        for(int i = 0;i<list.size();i++)
        {
            a[list.get(i)] = a[list.get(i)] + 1;
        }
        for(int i = 6;i>=1;i--)
        {
            if(a[i] >= 2)
            {
                sum = sum + i*2;
                count = count + 1;
            }
        }
        if(count >= 2)
        {
            return sum;
        }
        return 0;
    }
    public int Chance(List<Integer> list)
    {
        int score = 0;
        for(int i = 0;i<list.size();i++)
        {
           score = score + list.get(i);
        }
        return score;
    }
    public int FullHouse(List<Integer> list)
    {
        int a[]=new int[7];
        int count = 0;
        int sum = 0;
        for(int i = 0;i<list.size();i++)
        {
            a[list.get(i)] = a[list.get(i)] + 1;
        }
        for(int i = 6;i>=1;i--)
        {
            if(a[i] == 2)
            {
                sum = sum + a[i]*2;
                count = count + 1;
            }
            else if(a[i] == 3)
            {
                sum = sum + a[i]*3;
                count = count + 1;
            }
        }
        if(count >= 2)
        {
            return 25;
        }
        return 0;
    }
    public int SmallStraight(List<Integer> list)
    {
        List<Integer> newList = new ArrayList<>();
        Map<Integer, Integer> score_map = new HashMap<>();
        int a[]=new int[7];
        int score = 0;
        for(int i = 1;i<=5;i++)
        {
            newList.add(i);
        }
        for(int i = 0;i<list.size();i++)
        {
            score = score + list.get(i);
            newList.remove(list.get(i));
        }
        if(newList.size() == 0)
        {
            return 30;
        }
        return 0;
    }
    public int LargeStraight(List<Integer> list)
    {
        List<Integer> newList = new ArrayList<>();
        Map<Integer, Integer> score_map = new HashMap<>();
        int a[]=new int[7];
        for(int i = 2;i<=6;i++)
        {
            newList.add(i);
        }
        for(int i = 0;i<list.size();i++)
        {
            newList.remove(list.get(i));
        }
        if(newList.size() == 0)
        {
            return 40;
        }
        return 0;
    }
    public JSONObject Score(JSONObject js,List<Integer> list,Hashtable<String,Integer> checking)
    {
        int ct = 0;
        if(checking.get("Ones") == 1)
        {
            int Score = Ones_Twos_Threes_Fours_Fives_Sixs(list,1);
            js.remove("Ones");
            js.put("Ones",Score);
            ct++;
        }
        if(checking.get("Twos") == 1)
        {
            int Score = Ones_Twos_Threes_Fours_Fives_Sixs(list,2);
            js.remove("Twos");
            js.put("Twos",Score);
            ct++;
        }
        if(checking.get("Threes") == 1)
        {
            int Score = Ones_Twos_Threes_Fours_Fives_Sixs(list,3);
            js.remove("Threes");
            js.put("Threes",Score);
            ct++;
        }
        if(checking.get("Fours") == 1)
        {
            int Score = Ones_Twos_Threes_Fours_Fives_Sixs(list,4);
            js.remove("Fours");
            js.put("Fours",Score);
            ct++;
        }
        if(checking.get("Fives") == 1)
        {
            int Score = Ones_Twos_Threes_Fours_Fives_Sixs(list,5);
            js.remove("Fives");
            js.put("Fives",Score);
            ct++;
        }
        if(checking.get("Sixs") == 1)
        {
            int Score = Ones_Twos_Threes_Fours_Fives_Sixs(list,6);
            js.remove("Sixs");
            js.put("Sixs",Score);
            ct++;
        }
        if(checking.get("ThreeofKind") == 1)
        {
            int Score = ThreeofKind_FourofKind_Yatzy(list,3);
            js.remove("ThreeofKind");
            js.put("ThreeofKind",Score);
            ct++;
        }
        if(checking.get("FourofKind") == 1)
        {
            int Score = ThreeofKind_FourofKind_Yatzy(list,4);
            js.remove("FourofKind");
            js.put("FourofKind",Score);
            ct++;
        }
        if(checking.get("SmallStraight") == 1)
        {
            int Score = SmallStraight(list);
            js.remove("SmallStraight");
            js.put("SmallStraight",Score);
            ct++;
        }
        if(checking.get("LargeStraight") == 1)
        {
            int Score = LargeStraight(list);
            js.remove("LargeStraight");
            js.put("LargeStraight",Score);
            ct++;
        }
        if(checking.get("FullHouse") == 1)
        {
            int Score = FullHouse(list);
            js.remove("FullHouse");
            js.put("FullHouse",Score);
            ct++;
        }
        if(checking.get("Yatzy") == 1)
        {
            int Score = ThreeofKind_FourofKind_Yatzy(list,5);
            js.remove("Yatzy");
            js.put("Yatzy",Score);
            ct++;
        }
        if(checking.get("Chance") == 1)
        {
            int Score = Chance(list);
            js.remove("Chance");
            js.put("Chance",Score);
            ct++;
        }
        if(checking.get("Pair") == 1)
        {
            int Score = Pair(list);
            js.remove("Pair");
            js.put("Pair",Score);
            ct++;
        }
        if(checking.get("TwoPair") == 1)
        {
            int Score = TwoPair(list);
            js.remove("TwoPair");
            js.put("TwoPair",Score);
            ct++;
        }
        return js;
    }
}
