package com.example.ollamaaitest.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class ChatServiceTest {

    @Autowired
    private ChatService chatService;

   @Test
    void chat(){
       String response= chatService.chat("hey,What is the capital fo sri lanka");
       System.out.println(response);
       String response2= chatService.chat("hey,who is virat kohli?");
       System.out.println(response2);
   }
}
