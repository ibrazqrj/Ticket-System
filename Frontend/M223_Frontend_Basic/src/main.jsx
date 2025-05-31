import './index.css'
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter }
	from "react-router-dom";
import "./index.css";
import App from "./App";
import "./styles/GlobalStyles.css";

ReactDOM.createRoot(document.getElementById("root"))
.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
