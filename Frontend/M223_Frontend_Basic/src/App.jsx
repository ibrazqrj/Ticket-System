import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./modules/Layout";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tickets from "./pages/Tickets";
import Login from "./modules/Login";
import NoPage from "./modules/NoPage";
import PrivateRoute from "./components/PrivateRoute";
import AuthService from "./services/auth.service";
import Register from "./pages/Register";
import * as TicketFormModule from "./pages/TicketForm";
const TicketForm = TicketFormModule.default;
import TicketList from "./pages/TicketList";
import EditTicketForm from "./pages/EditTicketForm";

function App() {
  return (
    <Routes>
      {/* ALLE geschützten Seiten unter Layout */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route
          index
          element={
            AuthService.getCurrentUser() ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="projects" element={<Projects />} />
        <Route path="tickets" element={<TicketList />} />
        <Route path="tickets/new" element={<TicketForm />} />
        <Route path="tickets/edit/:id" element={<EditTicketForm />} />
      </Route>

      {/* Öffentliche Routen */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
}

export default App;
