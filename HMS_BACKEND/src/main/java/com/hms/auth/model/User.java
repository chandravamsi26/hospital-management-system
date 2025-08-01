package com.hms.auth.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    private String id;

    private String name;
    private String email;
    private String password;

    private Role role; // Enum: ADMIN, DOCTOR, PATIENT, LAB_TECHNICIAN
    private boolean active;
}
