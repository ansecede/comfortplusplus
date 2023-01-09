import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect } from "react";
import chillManBg from "../../assets/young-man-sitting-nobg.png";
import { auth } from "../../config/firebase";
import Form from "./Form";
import "./login.css";
import Register from "./Register";
import { getUserEmail } from "../../utils/homeUtils";

function Login() {
  const [wantsToRegister, setWantsToRegister] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);
  const [failed, setFailed] = useState(false);

  async function doSingIn(username, password) {
    const [email, exists] = await getUserEmail(username);
    if (!exists) {
      setFailed(false);
      setUserNotFound(true);
      return;
    }
    try {
      let response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response && response.user);
      console.log(response);
      console.log(response.user);
    } catch (e) {
      console.error(e.message);
      console.error(e.code);
      setUserNotFound(false);
      setFailed(true);
    }
  }

  useEffect(() => {
    document.title = "Login - Comfort++";
  }, []);

  return (
    <>
      <div className="flex flex-col w-full h-screen justify-center bg-gray-700 px-8">
        <img
          className="absolute top-1/2 left-1/2 sm:max-w-none max-h-full -translate-x-1/2 -translate-y-1/2 blur-sm"
          src={chillManBg}
          alt=""
        />
        <Form signInHandler={doSingIn} registerSetter={setWantsToRegister}>
          {failed ? (
            <div className="text-emerald-400 text-center mt-4">
              Incorrect password
            </div>
          ) : (
            <></>
          )}
          {userNotFound ? (
            <div className="text-emerald-400 text-center mt-4">
              User not found
            </div>
          ) : (
            <></>
          )}
        </Form>
        {/* {wantsToRegister ? (
          <Register registerSetter={setWantsToRegister} />
        ) : (
          <Form signInHandler={doSingIn} registerSetter={setWantsToRegister} />
        )} */}
      </div>
    </>
  );
}

export default Login;
