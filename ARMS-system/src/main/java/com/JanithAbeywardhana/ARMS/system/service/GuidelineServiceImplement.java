package com.JanithAbeywardhana.ARMS.system.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.JanithAbeywardhana.ARMS.system.model.Guideline;
import com.JanithAbeywardhana.ARMS.system.repository.GuidelineRepo;


@Service
public class GuidelineServiceImplement implements GuidelineService {
	
	@Autowired
	private GuidelineRepo guidelineRepo;

	@Override
	public Guideline saveGuideline(Guideline guideline) {
		return guidelineRepo.save(guideline);
	}

	@Override
	public Guideline getGuidelineById(Long id) {
		return guidelineRepo.findById(id).orElse(null);
				}

	@Override
	public List<Guideline> getAllGuidelines() {
		return guidelineRepo.findAll();
	}

	@Override
	public Guideline updateGuideline(Guideline guideline) {
		return guidelineRepo.save(guideline);
	}

	@Override
	public String deleteGuideline(Long id) {
		guidelineRepo.deleteById(id);
		return "Guideline deleted successfully!";
	}

	

}
