import axios from "axios";

const API_URL = "http://localhost:8080/api/tickets";

const getAllTickets = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return axios.get(API_URL, {
    headers: {
      Authorization: "Bearer " + user.token,
    },
  });
};

const closeTicket = (ticketId) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return axios.put(`${API_URL}/${ticketId}/status`, { status: "CLOSED" }, {
    headers: {
      Authorization: "Bearer " + user.token,
    },
  });
};

const updateTicket = (id, data) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return axios.put(`${API_URL}/${id}`, data, {
    headers: {
      Authorization: "Bearer " + user.token,
    },
  });
};

const getTicketById = (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return axios.get(`${API_URL}/${id}`, {
    headers: {
      Authorization: "Bearer " + user.token,
    },
  });
};

const deleteTicket = (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: "Bearer " + user.token,
    },
  });
};

const assignUserToTicket = (ticketId, userId) => {
  return axios.put(
    `${API_URL}/${ticketId}/assign`,
    { userId },
    { headers: getAuthHeader() }
  );
};

const TicketService = {
  getAllTickets,
  getTicketById,
  closeTicket,
  updateTicket,
  deleteTicket,
  assignUserToTicket,
};

export default TicketService;
