package com.JanithAbeywardhana.ARMS.system.model;

import java.util.List;

class GeminiApiResponse {

private List<Candidate> candidates;
    
    public List<Candidate> getCandidates() { return candidates; }
    public void setCandidates(List<Candidate> candidates) { this.candidates = candidates; }
    
    static class Candidate {
        private Content content;
        
        public Content getContent() { return content; }
        public void setContent(Content content) { this.content = content; }
        
        static class Content {
            private List<Part> parts;
            
            public List<Part> getParts() { return parts; }
            public void setParts(List<Part> parts) { this.parts = parts; }
            
            static class Part {
                private String text;
                
                public String getText() { return text; }
                public void setText(String text) { this.text = text; }
            }
        }
        
    }
    
}
