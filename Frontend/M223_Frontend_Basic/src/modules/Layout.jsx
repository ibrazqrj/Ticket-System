import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

export default function Layout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Navigation />
      <main style={{ flexGrow: 1, padding: "2rem" }}>
        <Outlet />
      </main>
    </div>
  );
}
