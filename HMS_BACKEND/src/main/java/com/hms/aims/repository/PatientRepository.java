package com.hms.aims.repository;

import com.hms.aims.model.Patient;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface PatientRepository extends MongoRepository<Patient, String> {
    @Query("{ $expr: { $regexMatch: { input: { $concat: [ '$firstName', ' ', '$lastName' ] }, regex: ?0, options: 'i' } } }")
    List<Patient> searchByFullNameRegex(String regex);
}
