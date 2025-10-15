// Entry point: mounts App into #root
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles.css"; // Tailwind base

createRoot(document.getElementById("root")).render(<App />);
