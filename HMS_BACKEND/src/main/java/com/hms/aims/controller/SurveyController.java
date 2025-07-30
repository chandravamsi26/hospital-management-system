package com.hms.aims.controller;

import com.hms.aims.model.Patient;
import com.hms.aims.model.Survey;
import com.hms.aims.service.PdfService;
import com.hms.aims.service.SurveyService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class SurveyController {

    private final SurveyService surveyService;
    private final PdfService pdfService;

    @PostMapping("/patients")
    public ResponseEntity<Patient> savePatient(@RequestBody Patient patient) {
        Patient saved = surveyService.savePatient(patient);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/patients")
    public ResponseEntity<List<Patient>> getAllPatients() {
        return ResponseEntity.ok(surveyService.getAllPatients());
    }

    @GetMapping("/patients/{id}")
    public ResponseEntity<Patient> getPatientById(@PathVariable String id) {
        Patient patient = surveyService.getPatientById(id);
        if (patient != null) {
            return ResponseEntity.ok(patient);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/patients/search-results")
    public ResponseEntity<List<Patient>> searchPatients(@RequestBody Map<String, String> payload) {
        String keyword = payload.get("keyword");
        List<Patient> matched = surveyService.searchPatientsByName(keyword);
        return ResponseEntity.ok(matched);
    }

    @PostMapping("/surveys")
    public ResponseEntity<Survey> saveSurvey(@RequestBody Survey survey) {
        Survey saved = surveyService.saveSurvey(survey);
        return ResponseEntity.ok(saved);
    }

    @PostMapping("/download-pdf")
    public void downloadPdf(@RequestBody Map<String, Object> payload, HttpServletResponse response) {
        ObjectMapper mapper = new ObjectMapper();
        Patient patient = mapper.convertValue(payload.get("patient"), Patient.class);
        Survey survey = mapper.convertValue(payload.get("survey"), Survey.class);
        String chartBase64 = (String) payload.get("chartImage");

        if (patient != null && survey != null) {
            pdfService.generatePdf(patient, survey, chartBase64, response);
        } else {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
    }

    @GetMapping("/surveys/by-patient-id/{id}")
    public ResponseEntity<Survey> getSurveyByPatientId(@PathVariable String id) {
        return surveyService.getSurveyByPatientId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
