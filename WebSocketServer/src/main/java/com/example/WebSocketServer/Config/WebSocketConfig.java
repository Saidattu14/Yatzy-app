package com.example.WebSocketServer.Config;

import com.example.WebSocketServer.Services.SendingNotificationService;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import com.example.WebSocketServer.Component.SocketHandler;

import java.io.FileInputStream;
import java.io.IOException;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

     @Autowired
     SendingNotificationService sendingNotificationService;

    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry){
        SocketHandler s = new SocketHandler(sendingNotificationService);
        registry.addHandler(s, "/user");
    }

    @Bean
    public void firebaseInitialization()
    {
        try {
            FileInputStream serviceAccount = new FileInputStream("C:\\Users\\nagas\\Documents\\GitHub\\Yatzy-app\\WebSocketServer\\src\\key1.json");
            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .setProjectId("myadmin14")
                    .build();
            FirebaseApp.initializeApp(options);
            System.out.println("FireBase Initialized");

        } catch (IOException e) {
            System.out.println("ERROR: invalid service account credentials");
        }
    }
}