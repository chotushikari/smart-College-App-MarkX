import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));

  const logout = () => {
    setToken(null);
    setRole(null);
    localStorage.clear();
    window.location.href = "/login";
  };

  useEffect(() => {
    if (token && role) {
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
    }
  }, [token, role]);

  return (
    <AuthContext.Provider value={{ token, role, setToken, setRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
