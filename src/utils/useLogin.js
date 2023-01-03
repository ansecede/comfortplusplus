import React, { useState } from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

export function useLogin() {
  const [authState, setAuthState] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setAuthState(true);
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
      setAuthState(false);
    }
  });

  return [currentUser, authState];
}
