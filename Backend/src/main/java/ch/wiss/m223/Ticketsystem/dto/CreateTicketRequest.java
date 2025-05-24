package ch.wiss.m223.Ticketsystem.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CreateTicketRequest {
    private String title;
    private String description;
    private Long projectId;
    private Long assignedAdminId; // Optional
}
