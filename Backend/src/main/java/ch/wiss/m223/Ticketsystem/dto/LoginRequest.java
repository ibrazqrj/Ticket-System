package ch.wiss.m223.Ticketsystem.dto;

import lombok.Getter;
import lombok.Setter;

@Setter @Getter
public class LoginRequest {
    private String username;
    private String password;
}
