package com.example.WebSocketServer;

public class Users {
    private  String FCM;
    private String Name;
    private  String Status;
    private int Index;
    Users(String Name, String FCM, String Status)
    {
     this.Name = Name;
     this.FCM = FCM;
     this.Status = Status;
    }

    public int getIndex() {
        return Index;
    }

    public void setIndex(int index) {
        Index = index;
    }

    public String getFCM() {
        return FCM;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getStatus() {
        return Status;
    }

    public void setStatus(String status) {
        Status = status;
    }

    public void setFCM(String FCM) {
        this.FCM = FCM;
    }
}
