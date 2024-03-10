import React, { createContext, useState, useEffect } from "react";
import { AuthContextType } from "../types/context";

// Define the context
const AuthContext = createContext<AuthContextType | null>(null);

// Data Provider component
const AuthProvider= ({ children }: any) => {
  const [auth, setAuth] = useState(false);
//   const [pushToken, setPushToken] = useState("");
//   const [nav, setNav] = useState("home");

  const ctx = React.useMemo(() => ({
    auth,
    setAuth,
  }), [auth]);

  return (
    <AuthContext.Provider
      value={ctx}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };