package com.hms.aims.model;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "surveys")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Survey {

    @Id
    private String id;

    @Min(1)
    @Max(5)
    private int facialMuscles;

    @Min(1)
    @Max(5)
    private int lipsPerioral;

    @Min(1)
    @Max(5)
    private int jaw;

    @Min(1)
    @Max(5)
    private int tongue;

    @Min(1)
    @Max(5)
    private int upperExtremities;

    @Min(1)
    @Max(5)
    private int lowerExtremities;

    @Min(1)
    @Max(5)
    private int neckShouldersHips;

    @Min(1)
    @Max(5)
    private int severityOfMovements;

    @Min(1)
    @Max(5)
    private int incapacitationDueToMovements;

    @Min(1)
    @Max(5)
    private int patientAwareness;

    @Min(1)
    @Max(5)
    private int emotionalDistress;

    @Min(1)
    @Max(5)
    private int globalRating;

    private String patientId;

    private String otherIssues;
}
