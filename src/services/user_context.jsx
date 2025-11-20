import React, { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Vérifie le token au chargement de l’app
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        console.log("Token expiré");
        logout();
      } else {
        setUser(decoded);
      }
    } catch (err) {
      console.error("Token invalide");
      logout();
    }

    setLoading(false);
  }, []);

  // LOGIN
  const login = (token) => {
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);
    setUser(decoded);
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);

export default UserProvider;
