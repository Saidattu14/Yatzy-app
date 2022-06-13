package com.example.WebSocketServer.Services;
import com.google.firebase.messaging.*;
import org.springframework.stereotype.Service;
import java.util.concurrent.ExecutionException;



@Service
public class SendingNotificationService {

    public void sendMessage(String registrationToken, String from, String to) throws ExecutionException, InterruptedException {
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
