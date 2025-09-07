package com.JanithAbeywardhana.ARMS.system.service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.JanithAbeywardhana.ARMS.system.config.GeminiConfig;
import com.JanithAbeywardhana.ARMS.system.model.GeminiChatRequest;
import com.JanithAbeywardhana.ARMS.system.model.GeminiChatResponse;
import com.fasterxml.jackson.databind.ObjectMapper;

import reactor.core.publisher.Mono;

@Service
public class GeminiChatService {

	@Autowired
    private WebClient geminiWebClient;
    
    @Autowired
    private GeminiConfig geminiConfig;
    
    private final ObjectMapper objectMapper = new ObjectMapper();
    
    // System prompt for ragging support
    private final String SYSTEM_PROMPT = """
        You are a compassionate AI assistant for the Anti-Ragging Management System (ARMS) at Sri Lankan universities. 
        Your role is to provide immediate emotional support, guidance, and resources to students who may be experiencing ragging or bullying.

        Guidelines:
        1. Always respond with empathy and understanding
        2. Encourage students to report incidents through proper channels
        3. Provide mental health support and coping strategies
        4. Never minimize their experiences
        5. Offer practical steps they can take
        6. Remind them that help is available and they're not alone
        7. If they're in immediate danger, direct them to emergency services
        8. Keep responses supportive but professional
        9. Provide information about their rights under Sri Lankan law
        10. Encourage them to seek help from trusted adults, counselors, or authorities

        Important contacts in Sri Lanka:
        - Emergency: 119
        - Police: 118
        - University counseling services
        - National helplines for mental health support

        Remember: Ragging is illegal in Sri Lanka under the Prohibition of Ragging Act No. 20 of 1998.
        Always prioritize the student's safety and well-being.
        """;
    
    public Mono<GeminiChatResponse> getChatResponse(GeminiChatRequest request) {
        try {
            // Combine system prompt with user message
            String fullPrompt = SYSTEM_PROMPT + "\n\nStudent Message: " + request.getMessage();
            
            // Prepare request body for Gemini API
            Map<String, Object> requestBody = createGeminiRequest(fullPrompt);
            
            return geminiWebClient.post()
                    .uri(uriBuilder -> uriBuilder
                            .queryParam("key", geminiConfig.getApiKey())
                            .build())
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .map(response -> parseGeminiResponse(response, request.getSessionId()))
                    .onErrorReturn(createErrorResponse(request.getSessionId(), "Failed to get AI response. Please try again."));
                    
        } catch (Exception e) {
            return Mono.just(createErrorResponse(request.getSessionId(), "Service temporarily unavailable"));
        }
    }
    
    private Map<String, Object> createGeminiRequest(String prompt) {
        Map<String, Object> part = new HashMap<>();
        part.put("text", prompt);
        
        Map<String, Object> content = new HashMap<>();
        content.put("parts", Arrays.asList(part));
        
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("contents", Arrays.asList(content));
        
        // Add safety settings to ensure appropriate responses
        Map<String, Object> safetySettings = new HashMap<>();
        safetySettings.put("category", "HARM_CATEGORY_HARASSMENT");
        safetySettings.put("threshold", "BLOCK_MEDIUM_AND_ABOVE");
        
        requestBody.put("safetySettings", Arrays.asList(safetySettings));
        
        return requestBody;
    }
    
    private GeminiChatResponse parseGeminiResponse(Map<String, Object> response, String sessionId) {
        try {
            List<Map<String, Object>> candidates = (List<Map<String, Object>>) response.get("candidates");
            if (candidates != null && !candidates.isEmpty()) {
                Map<String, Object> content = (Map<String, Object>) candidates.get(0).get("content");
                List<Map<String, Object>> parts = (List<Map<String, Object>>) content.get("parts");
                if (parts != null && !parts.isEmpty()) {
                    String text = (String) parts.get(0).get("text");
                    return new GeminiChatResponse(text, sessionId, true);
                }
            }
            return createErrorResponse(sessionId, "No response generated");
        } catch (Exception e) {
            return createErrorResponse(sessionId, "Error parsing response");
        }
    }
    
    private GeminiChatResponse createErrorResponse(String sessionId, String errorMessage) {
        GeminiChatResponse response = new GeminiChatResponse();
        response.setSessionId(sessionId);
        response.setSuccess(false);
        response.setError(errorMessage);
        response.setResponse("I'm sorry, I'm having trouble right now. Please reach out to a counselor or trusted adult for immediate support. In emergencies, call 119.");
        return response;
    }

}
