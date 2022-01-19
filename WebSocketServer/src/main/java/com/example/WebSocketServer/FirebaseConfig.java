package com.example.WebSocketServer;
import com.google.firebase.messaging.*;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.ExecutionException;


public class FirebaseConfig {

    void FirebaseSendMessage(String registrationToken,String from, String to) throws FirebaseMessagingException, ExecutionException, InterruptedException {
        String Token = "expuSyXKQKq4BorJrtk1iC:APA91bH3UjevvrV72n85HFpYstvdy8jlJOP4zP-iReTmCfN8Fpy9S8QhsRiGwffZsfFbDPGnIHZ6coe-o8Mp8cQi2TvwYyXOcQ_yJBLBtuRyVAPo0vOiGqbsCZdTWJtPIIvK74tWzQp5";
        Message message = Message.builder()
                .setNotification(Notification.builder()
                        .setTitle("Game Play Request " +" From " + to)
                        .setBody("Hello " + from + " I would like to play against you?")
                        .build())
                .setAndroidConfig(AndroidConfig.builder()
                        .setTtl(3600 * 1000)
                        .putData("OpponentName",to)
                        .setNotification(AndroidNotification.builder()
                                .setIcon("stock_ticker_update")
                                .setColor("#f45342")
                                .build())
                        .build())
                .setApnsConfig(ApnsConfig.builder()
                        .setAps(Aps.builder()
                                .setBadge(42)
                                .build())
                        .build())
                .setToken(registrationToken)
                .build();
        String response = FirebaseMessaging.getInstance().sendAsync(message).get();
        // Response is a message ID string.
        System.out.println("Successfully sent message: " + response);
    }
}
