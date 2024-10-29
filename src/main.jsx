import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Detail from "./routes/Detail.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Detail/:date" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
