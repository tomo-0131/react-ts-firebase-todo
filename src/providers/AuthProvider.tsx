import React, { useState, useEffect } from "react";
import { auth } from '../service/firebase'

export const AuthContext = React.createContext({});

export const AuthProvider = ({ children }: { children: any }) => {

  const [currentUser, setCurrentUser] = useState<any | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged(setCurrentUser)
  }, [])

  return (
    <AuthContext.Provider value={{ currentUser }}>
      { children }
    </AuthContext.Provider>
  )
}
