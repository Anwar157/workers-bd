import { createContext, useContext } from "react";

export const AuthContext = createContext(null);

// custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};
