import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [classes, setClasses] = useState([]); // ✅ yaha rakho classes

  return (
    <AuthContext.Provider value={{ user, setUser, classes, setClasses }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);