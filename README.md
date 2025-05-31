
**Projektname:** Mini Jira / Ticketsystem  
**Autor:** Ibrahim Zeqiraj  
**Klasse:** UIFZ-2325-004  
**Datum:** 31.05.2025

---

## 📑 Inhaltsverzeichnis

- 📚 Projektübersicht
    
- 🔐 Features
    
- 🧠 Technische Architektur
    
- 📁 Backend-Klassen
    
- ⚙ Beispiel-Testfälle (Backend)
    
- 📁 Projektstruktur (Frontend)
    
- 🧪 Tools
     
- 🧪 Tests
    
- 🛡 Sicherheitskonzept
    
- 📊 Datenmodell (PlantUML)
    
- 📝 User Stories
    
- ✅ Soll-Ist-Vergleich
    
- 🗂 Arbeitsplan & Aufwandsschätzung
    
- 📅 Arbeitsjournal
    

---

## 📚 Projektübersicht

Ziel war es, ein einfaches Ticket-System (Mini Jira) mit Benutzerverwaltung und Rechtevergabe umzusetzen. Die Anwendung besteht aus einem Spring Boot Backend mit JWT-Authentifizierung sowie einem React + Vite Frontend.

**Frontend:** React, Vite, Bootstrap  
**Backend:** Spring Boot, JWT, MySQL, JPA

Zentrale Funktionalitäten:

- Benutzerregistrierung und Login
    
- Rollensteuerung (USER, ADMIN)
    
- Projekt- und Ticketverwaltung
    
- Tokenbasierte Authentifizierung
    

⚠️ **Hinweis:** Die CRUD-Funktionen im Frontend (Ticket erstellen, bearbeiten, löschen) sind aktuell **nicht vollständig funktionsfähig**. Das Backend ist jedoch **vollständig lauffähig und über Postman nutzbar**.

---

## 🔐 Features

|Feature|Status|
|---|---|
|Registrierung/Login|✅ Fertig|
|JWT-Authentifizierung|✅ Fertig|
|Rollensteuerung (User/Admin)|✅ Fertig|
|Projekte erstellen/löschen|✅ Admin-only|
|Tickets erstellen/ansehen|✅ Backend ✔ / Frontend 🔴|
|Tickets bearbeiten/löschen|✅ Backend ✔ / Frontend 🔴|
|Kommentare zu Tickets|🔜 Geplant|

---

## 🧠 Technische Architektur

```
React + Vite (Frontend)
│
├── Axios Requests → /api/*
│
└── Spring Boot (Backend)
    ├── Security (JWT, Roles)
    ├── Controller
    ├── Service
    ├── Repository
    └── Entities (User, Role, Ticket, Project)
```

---

## 📁 Backend-Klassen

`**UserService.java**`

- Registrierung von Benutzern
    
- Passwort-Hashing mit BCrypt
    
- Rollen setzen (standardmäßig USER)
    

`**TicketService.java**`

- CRUD-Logik für Tickets
    
- Projekt- und Benutzerzuweisung
    
- Statusänderungen
    

`**SecurityConfiguration.java**`

- JWT-Filter, AuthProvider, CORS
    
- Zugriffsrechte: `@PreAuthorize()`
    

`**AuthTokenFilter.java**`

- Extrahiert und prüft JWT-Token
    
- Setzt Benutzer im SecurityContext
    

---

## ⚙ Beispiel-Testfälle (Backend)

### ✅ Benutzerregistrierung

- POST `/api/auth/signup`
    
- Erwartung: 200 OK mit Message `User registered successfully`
    
- Fehlerfall: 400 bei doppeltem Username oder ungültigem Passwort
    

### ✅ Ticket erstellen (POST)

- POST `/api/tickets`
    
- Erwartung: 200 OK mit erstelltem Ticket (Status: OPEN)
    
- Voraussetzung: Authentifizierter Benutzer + Projekt existiert
    

### ✅ Tokenprüfung

- GET `/api/projects`
    
- Erwartung: 403 ohne Token, 200 mit gültigem Token
    

---

## 📁 Projektstruktur (Frontend)

```
src/
├── pages/
│   ├── Register.jsx
│   ├── Login.jsx
│   ├── TicketList.jsx
│   ├── TicketForm.jsx
│   └── Projects.jsx
├── services/
│   ├── auth.service.js
│   ├── project.service.js
│   └── ticket.service.js
├── components/
│   └── PrivateRoute.jsx
├── App.jsx
└── index.jsx
```

---

## 🧪 Tools

- **Postman**: API-Tests aller Endpunkte
    
- **Vite**: React Dev Server
    
- **Spring Boot Devtools**: Hot reload für das Backend
    
- **MySQL Workbench**: Datenbankanalyse
    
- **GitHub**: Source Code (wenige Commits)
    

---
## 🧪 Tests

In diesem Projekt wurden sowohl automatisierte Unit-Tests als auch manuelle Tests durchgeführt, um zentrale Funktionen abzusichern und typische Nutzungsszenarien zu verifizieren.

---

### ✅ Automatisierte Tests (JUnit 5)

#### `UserServiceTest.java`

```java

public class UserServiceTest {

  

    private UserRepository userRepository;

    private RoleRepository roleRepository;

    private PasswordEncoder passwordEncoder;

    private UserService userService;

  

    @BeforeEach

    public void setup() {

        userRepository = mock(UserRepository.class);

        roleRepository = mock(RoleRepository.class);

        passwordEncoder = mock(PasswordEncoder.class);

        userService = new UserService();

        userService.setUserRepository(userRepository);

        userService.setRoleRepository(roleRepository);

        userService.setPasswordEncoder(passwordEncoder);

    }

  

    @Test

    public void testRegisterUser_success() {

        SignupRequest request = new SignupRequest();

        request.setUsername("ibrahim");

        request.setEmail("ibrahim@example.com");

        request.setPassword("Test@1234");

  

        when(userRepository.findByUsername("ibrahim")).thenReturn(Optional.empty());

        when(userRepository.findByEmail("ibrahim@example.com")).thenReturn(Optional.empty());

        when(roleRepository.findByName(ERole.ROLE_USER)).thenReturn(Optional.of(new Role(ERole.ROLE_USER)));

        when(passwordEncoder.encode("Test@1234")).thenReturn("encodedPassword");

  

        userService.registerUser(request);

  

        verify(userRepository, times(1)).save(Mockito.any(User.class));

    }

  

    @Test

    public void testRegisterUser_usernameTaken() {

        SignupRequest request = new SignupRequest();

        request.setUsername("ibrahim");

        request.setEmail("ibrahim@example.com");

        request.setPassword("Test@1234");

  

        when(userRepository.findByUsername("ibrahim")).thenReturn(Optional.of(new User()));

  

        Exception exception = assertThrows(RuntimeException.class, () -> {

            userService.registerUser(request);

        });

  

        assertTrue(exception.getMessage().contains("Username is already taken"));

    }

}
```

#### `TicketServiceTest.java`

```java

public class TicketServiceTest {

  

    private TicketRepository ticketRepository;

    private TicketService ticketService;

  

    @BeforeEach

    public void setup() {

        ticketRepository = mock(TicketRepository.class);

        ticketService = new TicketService();

        ticketService.setTicketRepository(ticketRepository);

    }

  

    @Test

    public void testGetAllTickets_returnsTickets() {

        Ticket ticket1 = new Ticket();

        ticket1.setTitle("Bug #1");

  

        Ticket ticket2 = new Ticket();

        ticket2.setTitle("Feature Request");

  

        when(ticketRepository.findAll()).thenReturn(Arrays.asList(ticket1, ticket2));

  

        List<Ticket> tickets = ticketService.getAllTickets();

        assertEquals(2, tickets.size());

        assertEquals("Bug #1", tickets.get(0).getTitle());

    }

  

    @Test

    public void testCreateTicket_savesTicket() {

        Ticket ticket = new Ticket();

        ticket.setTitle("New Ticket");

  

        when(ticketRepository.save(ticket)).thenReturn(ticket);

  

        Ticket saved = ticketService.createTicket(ticket);

        assertEquals("New Ticket", saved.getTitle());

        verify(ticketRepository, times(1)).save(ticket);

    }

}
```

### ✅ Manuelle Tests (Postman)

#### `Register & Login`
[!\[\[Manuelles Testing.mp4\]\]](https://streamable.com/2m09t0)
---
## 🛡 Sicherheitskonzept

- JWT-Token beim Login erzeugt → lokal gespeichert
    
- Token wird bei jedem Request übermittelt (Header)
    
- Rollen (USER, ADMIN) im Token enthalten
    
- Zugriffsschutz per `@PreAuthorize` und `SecurityFilterChain`
    
- CORS aktiviert für `http://localhost:5173`
    

---

## 📊 Datenmodell (PlantUML)

```
@startuml
entity User {
  *id : Long
  username : String
  password : String
  email : String
}

entity Role {
  *id : Long
  name : String
}

entity Ticket {
  *id : Long
  title : String
  description : String
  status : TicketStatus
}

entity Project {
  *id : Long
  name : String
  description : String
}

User ||--o{ Ticket : created
User ||--o{ Role : has
User }o--o{ Project : assigned_to
Ticket }o--|| Project : belongs_to
@enduml
```

---

## 📝 User Stories

Alle User Stories inkl. Akzeptanzkriterien findest du in diesem Abschnitt. Die wichtigsten:

- ✅ Registrierung mit Passwortprüfung und Rollenzuweisung
    
- ✅ Login mit JWT
    
- ✅ Projektverwaltung nur für Admin
    
- ✅ Ticketverwaltung pro User/Admin
    

---

## ✅ Soll-Ist-Vergleich

|   |   |   |   |   |
|---|---|---|---|---|
|Nr|Beschreibung|Soll-Zustand|Ist-Zustand|Kommentar|
|1|Registrierung/Login|✅|✅|Vollständig|
|2|Projektverwaltung|✅ Admin-only|✅|Nur für Admin|
|3|Ticket CRUD im Frontend|✅|🔴|API-Calls nicht ausgelöst|
|4|Rollen-/JWT-Handling|✅|✅|Funktioniert|
|5|Ticket-Kommentare|🔜 Optional|🔴|Noch nicht implementiert|

---

## 🗂 Arbeitsplan & Aufwandsschätzung

|                          |           |             |
| ------------------------ | --------- | ----------- |
| Aufgabe                  | Dauer (h) | Status      |
| Projektplanung & Setup   | 2         | ✅ Erledigt  |
| Backend: Auth + User     | 4         | ✅ Erledigt  |
| Backend: Projekt/Ticket  | 6         | ✅ Erledigt  |
| Frontend: Seitenstruktur | 4         | ✅ Teilweise |
| Frontend: Tickets        | 8         | 🔴 Offen    |
| JWT & Security           | 6         | ✅ Erledigt  |
| Tests (Postman)          | 2         | ✅ Teilweise |
| Dokumentation            | 5         | ✅ Erledigt  |
| Gesamter Aufwand:        | **32 h**  |             |

---

## 📅 Arbeitsjournal

|            |                             |                                                |
| ---------- | --------------------------- | ---------------------------------------------- |
| Datum      | Aufgabe                     | Beschreibung                                   |
| 17.05.2025 | Projektstart                | Projektidee & Setup Spring Boot, Vite erstellt |
| 17.05.2025 | Auth-Implementierung        | Registrierung, Login, JWT Auth im Backend      |
| 24.05.2025 | Projekte / Tickets Backend  | CRUD-Logik, DTOs, Security mit Rollensteuerung |
| 24.05.2025 | Frontend Pages              | Login, Register, Ticketanzeige umgesetzt       |
| 31.05.2025 | Fehlerbehebung              | Frontend API-Verbindungen unvollständig        |
| 31.05.2025 | Postman Test                | API-Calls getestet, Rollen überprüft           |
| 31.05.2025 | Dokumentation & Feinschliff | Projektdoku erstellt, User Stories formuliert  |

---

## 📌 Fazit

Das Backend funktioniert vollständig und bietet eine solide Grundlage für ein Ticket-System mit Benutzer- und Projektverwaltung. Das Frontend zeigt bereits die Struktur und Teile der Funktionalität, benötigt jedoch noch Feinschliff bei den API-Aufrufen (CRUD).

🟡 **Weiterführend:** Kommentare, vollständige Ticketbearbeitung und verbesserte Tests im Frontend sind als Erweiterung geplant.

📦 Projekt wurde lokal mit Vite deployt. Backend über Spring Boot gestartet.

---