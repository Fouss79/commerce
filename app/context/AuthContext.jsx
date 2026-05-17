"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔥 RESTORE SESSION AU REFRESH
  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }

    setLoading(false);
  }, []);

  // 🔥 LOGIN
  const login = async (email, password) => {
    const res = await axios.post("http://localhost:8080/api/auth/login", {
      email,
      password,
    });

    const data = res.data;

   const userData = {
  id: data.id,
  email: data.email,
  role: data.role,
  prenom: data.prenom,
  nom: data.nom,
  numero: data.numero,
  adresse: data.adresse,
  ville: data.ville,
};
    // 🔐 SAVE
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(userData));

    setUser(userData);
    setIsAuthenticated(true);

    return data;
  };

  
  // 🔥 LOGOUT

const logout = () => {

  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("cartItems");

  // 🔥 notifier panier
  window.dispatchEvent(new Event("cartUpdated"));

  setUser(null);
  setIsAuthenticated(false);
};
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);