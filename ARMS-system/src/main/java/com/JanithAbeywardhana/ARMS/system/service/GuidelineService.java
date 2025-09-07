package com.JanithAbeywardhana.ARMS.system.service;

import java.util.List;

import com.JanithAbeywardhana.ARMS.system.model.Guideline;

public interface GuidelineService {
	
	public Guideline saveGuideline(Guideline guideline);
	
	public List<Guideline> getAllGuidelines();
	
	public Guideline updateGuideline(Guideline guideline);
	
	public String deleteGuideline(Long id);
	
	public Guideline getGuidelineById (Long id);
	
	

}
