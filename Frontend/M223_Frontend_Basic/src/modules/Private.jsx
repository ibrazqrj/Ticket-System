import { useEffect, useState } from "react";
import axios from "axios";
import AuthService from "../services/auth.service";

const BASE_URL = "http://localhost:8080";

// username: admin123
// password: admin123

export default function Private() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();

    // Prüfe, ob der Benutzer eingeloggt ist
    if (!currentUser) {
      console.warn("User is not logged in");
      setMessage("Not logged in");
      return;
    }

    console.log("Calling private API endpoint");

    const token = currentUser.token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(`${BASE_URL}/items`, {}, config)
      .then((response) => {
        console.log("Response from private API:", response.data);
        setMessage(response.data);
      })
      .catch((error) => {
        console.error("Error fetching private data:", error);
        setMessage("Error fetching data");
      });
  }, []);

  return (
    <div>
      <h1>Private</h1>
      <p>{message}</p>
    </div>
  );
}
