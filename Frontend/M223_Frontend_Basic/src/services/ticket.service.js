import axios from "axios";

const API_URL = "http://localhost:8080/api/tickets";

// Holt alle Tickets vom Server
const getAllTickets = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return axios.get(API_URL, {
    headers: {
      Authorization: "Bearer " + user.token,
    },
  });
};

// Holt ein einzelnes Ticket anhand seiner ID
const getTicketById = (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return axios.get(`${API_URL}/${id}`, {
    headers: {
      Authorization: "Bearer " + user.token,
    },
  });
};

// Erstellt ein neues Ticket
const createTicket = (ticketData) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return axios.post(API_URL, ticketData, {
    headers: {
      Authorization: "Bearer " + user.token,
    },
  });
};

// Aktualisiert ein bestehendes Ticket
const updateTicket = (id, data) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return axios.put(`${API_URL}/${id}`, data, {
    headers: {
      Authorization: "Bearer " + user.token,
    },
  });
};

// Löscht ein Ticket
const deleteTicket = (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: "Bearer " + user.token,
    },
  });
};

// Setzt den Status des Tickets auf "CLOSED"
const closeTicket = (ticketId) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return axios.put(
    `${API_URL}/${ticketId}/status`,
    { status: "CLOSED" },
    {
      headers: {
        Authorization: "Bearer " + user.token,
      },
    }
  );
};

// Admin zu Ticket zuweisen
const assignUserToTicket = (ticketId, userId) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return axios.put(
    `${API_URL}/${ticketId}/assign`,
    { userId },
    {
      headers: {
        Authorization: "Bearer " + user.token,
      },
    }
  );
};

// Export aller Funktionen
const TicketService = {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
  closeTicket,
  assignUserToTicket,
};

export default TicketService;
