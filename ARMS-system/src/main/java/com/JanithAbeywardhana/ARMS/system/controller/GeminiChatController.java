package com.JanithAbeywardhana.ARMS.system.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.JanithAbeywardhana.ARMS.system.model.GeminiChatRequest;
import com.JanithAbeywardhana.ARMS.system.model.GeminiChatResponse;
import com.JanithAbeywardhana.ARMS.system.service.GeminiChatService;

import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class GeminiChatController {

	@Autowired
    private GeminiChatService geminiChatService;
    
    @PostMapping("/support")
    public Mono<ResponseEntity<GeminiChatResponse>> getChatSupport(@RequestBody GeminiChatRequest request) {
        // Validate request
        if (request.getMessage() == null || request.getMessage().trim().isEmpty()) {
            GeminiChatResponse errorResponse = new GeminiChatResponse();
            errorResponse.setSuccess(false);
            errorResponse.setError("Message cannot be empty");
            errorResponse.setResponse("Please share what's troubling you. I'm here to help.");
            return Mono.just(ResponseEntity.badRequest().body(errorResponse));
        }
        
        return geminiChatService.getChatResponse(request)
                .map(response -> ResponseEntity.ok(response))
                .onErrorReturn(ResponseEntity.internalServerError().body(
                    createErrorResponse(request.getSessionId())
                ));
    }
    
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> healthCheck() {
        Map<String, String> status = new HashMap<>();
        status.put("status", "AI Support System is running");
        status.put("service", "Gemini Chat Support");
        return ResponseEntity.ok(status);
    }
    
    private GeminiChatResponse createErrorResponse(String sessionId) {
        GeminiChatResponse response = new GeminiChatResponse();
        response.setSessionId(sessionId);
        response.setSuccess(false);
        response.setError("Service temporarily unavailable");
        response.setResponse("I'm having technical difficulties. Please contact university counseling services or call emergency services if you need immediate help.");
        return response;
    }

}
