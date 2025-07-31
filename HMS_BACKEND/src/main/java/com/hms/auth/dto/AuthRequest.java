package com.hms.auth.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthRequest {
    private String email;
    private String password;
}
