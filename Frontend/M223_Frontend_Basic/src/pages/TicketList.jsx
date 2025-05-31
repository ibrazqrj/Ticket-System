import React, { useEffect, useState } from "react";
import TicketService from "../services/ticket.service";
import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";

// Liste aller Tickets anzeigen
function TicketList() {
  const [tickets, setTickets] = useState([]); // Tickets vom Server
  const [error, setError] = useState(""); // Fehleranzeige

  const currentUser = AuthService.getCurrentUser(); // Aktuell eingeloggter Benutzer
  const isAdmin = currentUser?.roles?.includes("ADMIN"); // Ist der Benutzer ein Admin?

  useEffect(() => {
    TicketService.getAllTickets()
      .then((res) => setTickets(res.data))
      .catch(() => setError("Tickets konnten nicht geladen werden."));
  }, []);

  return (
    <div className="page-container">
      <h2>Tickets</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <table>
        <thead>
          <tr>
            <th>Titel</th>
            <th>Projekt</th>
            <th>Status</th>
            <th>Ersteller</th>
            <th>Aktion</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => {
            const isOwner = ticket.creator?.username === currentUser.username;
            const canEdit = isAdmin || (isOwner && ticket.status === "OPEN");

            return (
              <tr key={ticket.id}>
                <td>{ticket.title}</td>
                <td>{ticket.project?.name}</td>
                <td>{ticket.status}</td>
                <td>{ticket.creator?.username}</td>
                <td>
                  {/* Ticket bearbeiten/löschen, wenn erlaubt */}
                  {canEdit && (
                    <>
                      <Link to={`/tickets/edit/${ticket.id}`}>
                        <button>Bearbeiten</button>
                      </Link>
                      <button
                        onClick={() => {
                          if (window.confirm("Möchtest du dieses Ticket wirklich löschen?")) {
                            TicketService.deleteTicket(ticket.id).then(() =>
                              setTickets(tickets.filter((t) => t.id !== ticket.id))
                            );
                          }
                        }}
                      >
                        Löschen
                      </button>
                    </>
                  )}

                  {/* Ticket schließen, wenn offen */}
                  {ticket.status === "OPEN" && (
                    <button
                      onClick={() =>
                        TicketService.closeTicket(ticket.id).then(() =>
                          setTickets(
                            tickets.map((t) =>
                              t.id === ticket.id ? { ...t, status: "CLOSED" } : t
                            )
                          )
                        )
                      }
                    >
                      Schließen
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TicketList;
