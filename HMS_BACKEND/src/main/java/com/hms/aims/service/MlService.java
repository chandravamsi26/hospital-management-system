package com.hms.aims.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class MlService {

    private final RestTemplate restTemplate;
    private final String FLASK_URL = "http://localhost:5001/predict";

    public Map<String, String> getPrediction(Map<String, Integer> surveyData) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Integer>> request = new HttpEntity<>(surveyData, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(FLASK_URL, request, Map.class);
            return response.getBody();
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, String> fallback = new HashMap<>();
            fallback.put("assessment", "Unavailable");
            fallback.put("suggestion", "Prediction service is currently unreachable.");
            return fallback;
        }
    }
}
