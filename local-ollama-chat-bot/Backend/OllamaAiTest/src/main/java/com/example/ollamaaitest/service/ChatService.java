package com.example.ollamaaitest.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.stereotype.Service;

@Service
public class ChatService {

    private final ChatClient chatClient;

    public ChatService(ChatModel chatModel) {
        this.chatClient = ChatClient.create(chatModel);
    }

    public String chat(String message) {
        System.out.println(message);
        return chatClient.prompt()
                .user(message)
                .call()
                .content();
    }

}
