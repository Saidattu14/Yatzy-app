package com.example.WebSocketServer;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.gson.JsonObject;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Hashtable;
import java.util.concurrent.ExecutionException;

@SpringBootApplication
public class WebSocketServerApplication {

	public static void main(String[] args) throws FirebaseMessagingException, ExecutionException, InterruptedException {

		SpringApplication.run(WebSocketServerApplication.class, args);

	}
}
