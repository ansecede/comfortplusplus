import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { useEffect } from "react";
import chillManBg from "../../assets/young-man-sitting-nobg.png";
import { auth } from "../../config/firebase";
import Form from "./Form";
import "./login.css";

function Login() {
  async function doSingIn(email, password) {
    try {
      let response = await signInWithEmailAndPassword(auth, email, password);
      if (response && response.user) {
        alert("Success ✅", "Authenticated successfully");
      }
    } catch (e) {
      alert("Denied ⛔", "User or password are incorrect");
      console.error(e.message);
      console.error(e.code);
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
        <Form signInHandler={doSingIn} />
      </div>
    </>
  );
}

export default Login;
