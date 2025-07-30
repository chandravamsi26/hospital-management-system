package com.hms.aims.repository;

import com.hms.aims.model.Survey;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface SurveyRepository extends MongoRepository<Survey, String> {
    Optional<Survey> findByPatientId(String patientId);
}
