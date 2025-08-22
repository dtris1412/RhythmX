import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/authContext";
import { PlayerProvider } from "./contexts/playerContext";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Home from "./pages/home/home";
import Search from "./pages/search/search";
import Favorites from "./pages/favorites/favorites";
import Artists from "./pages/artists/artists";
import Layout from "./components/layouts/layout";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function PublicRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? children : <Navigate to="/" />;
}

function App() {
  return (
    <AuthProvider>
      <PlayerProvider>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout>
                  <Home />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <Layout>
                  <Search />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <Layout>
                  <Favorites />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/artists"
            element={
              <ProtectedRoute>
                <Layout>
                  <Artists />
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </PlayerProvider>
    </AuthProvider>
  );
}

export default App;
