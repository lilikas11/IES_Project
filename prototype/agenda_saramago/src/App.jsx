import React from "react";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar.jsx";
import Event_page from "./pages/event_page.jsx";
import My_tickets from "./pages/my_tickets.jsx";
import Profile from "./pages/profile_user.jsx";
import Favourites from "./pages/favourites.jsx";
import Home from "./pages/home.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import Event_search_page from "./pages/event_search_page.jsx";
import NotFound from "./pages/NotFound.jsx";
import Favicon from "react-favicon";
import ProtectedRoute from "./components/protectedRoute.jsx";

function App() {
  const faviconUrl = useState("/logo_small1.png");
  return (
    <BrowserRouter>
      <Favicon url={faviconUrl} />
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />{" "}
        {/* Fallback route for 404 Not Found */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/event_page/:id"
          element={
            <ProtectedRoute>
              <Event_page />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my_tickets"
          element={
            <ProtectedRoute>
              <My_tickets />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/favourites"
          element={
            <ProtectedRoute>
              <Favourites />
            </ProtectedRoute>
          }
        />
        <Route
          path="/event_search_page"
          element={
            <ProtectedRoute>
              <Event_search_page />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
