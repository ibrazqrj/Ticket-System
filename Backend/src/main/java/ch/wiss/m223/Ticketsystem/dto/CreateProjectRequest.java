package ch.wiss.m223.Ticketsystem.dto;

import java.util.Set;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CreateProjectRequest {
    private String name;
    private Set<Long> userIds; // Liste der User-IDs, die dem Projekt zugewiesen werden
    private String description; // Optional, falls eine Beschreibung benötigt wird
}
