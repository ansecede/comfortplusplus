import React, { useState } from "react";
import Stack from "./components/Stack";
import LoadingScreen from "./components/LoadingScreen";
import { useLogin } from "./utils/useLogin";

function App() {
  const [currentUser, authState] = useLogin();
  const [done, setDone] = useState(false);

  setTimeout(() => {
    setDone(true);
  }, 1500);

  return (
    <>
      {done ? (
        <Stack currentUser={currentUser} authState={authState} />
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}

export default App;
