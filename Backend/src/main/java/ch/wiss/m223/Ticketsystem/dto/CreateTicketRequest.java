package ch.wiss.m223.Ticketsystem.dto;

import ch.wiss.m223.Ticketsystem.Model.TicketStatus;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CreateTicketRequest {
    private String title;
    private String description;
    private Long projectId;
    private Long assignedAdminId; // Optional
    private TicketStatus status;

    public TicketStatus getStatus() {
        return status;
    }

    public void setStatus(TicketStatus status) {
        this.status = status;
    }
}
