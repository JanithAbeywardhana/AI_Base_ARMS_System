package com.JanithAbeywardhana.ARMS.system.model;

import java.util.List;

class GeminiApiRequest {

    private List<Content> contents;
    
    public GeminiApiRequest(List<Content> contents) {
        this.contents = contents;
    }
    
    public List<Content> getContents() { return contents; }
    public void setContents(List<Content> contents) { this.contents = contents; }
    
    static class Content {
        private List<Part> parts;
        
        public Content(List<Part> parts) {
            this.parts = parts;
        }
        
        public List<Part> getParts() { return parts; }
        public void setParts(List<Part> parts) { this.parts = parts; }
    }
    
    static class Part {
        private String text;
        
        public Part(String text) {
            this.text = text;
        }
        
        public String getText() { return text; }
        public void setText(String text) { this.text = text; }
    }
    
}
