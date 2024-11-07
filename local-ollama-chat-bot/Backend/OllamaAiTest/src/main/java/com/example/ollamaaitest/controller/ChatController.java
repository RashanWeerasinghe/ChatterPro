package com.example.ollamaaitest.controller;
import com.example.ollamaaitest.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin
public class ChatController {

    @Autowired
    private ChatService chatService;

    @PostMapping
    public String getChatResponse(@RequestBody String message) {
        System.out.println(message);
        String result=chatService.chat(message);
        System.out.println("rsult"+result);
        return result;
    }
}