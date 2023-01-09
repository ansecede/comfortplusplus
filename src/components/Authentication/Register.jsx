import React, { useRef, useState } from "react";
import InputForm from "./InputForm";
import tempImage from "../../assets/temperature.svg";
import happyImage from "../../assets/happy.svg";
import { FaArrowLeft } from "react-icons/fa";

function Register({ registerSetter }) {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const myBtn = useRef(null);

  function kbBtnClick(event) {
    if (event.keyCode === 13) {
      myBtn.current.click();
    }
  }

  return (
    <div className="relative bg-gray-800 px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 mx-auto sm:max-w-lg sm:rounded-lg rounded-md sm:px-10">
      <div className="absolute top-5 left-5 flex items-center justify-between">
        <FaArrowLeft
          color="white"
          size={20}
          className="cursor-pointer active:scale-[.8] active:duration-75 transition-all hover:scale-[1.1] ease-in-out"
          onClick={() => registerSetter(false)}
        />
      </div>
      <div className="flex justify-center my-2">
        <h1 className="text-3xl sm:text-5xl font-semibold text-gray-50">
          Comfort++
        </h1>
        <img className="w-10 ml-2" src={tempImage} alt="" />
        <img className="w-10 ml-2" src={happyImage} alt="" />
      </div>
      <div className="flex justify-center text-center">
        <h1 className="font-medium text-lg text-gray-100 mt-4">
          Register to get the best comfort experience
        </h1>
      </div>
      <InputForm
        label="Username:"
        type="text"
        placeholder="Create a username"
        kbAction={kbBtnClick}
        valueSetter={setUserName}
      />
      <InputForm
        label="Email:"
        type="email"
        placeholder="Enter your email"
        kbAction={kbBtnClick}
        valueSetter={setEmail}
      />
      <InputForm
        label="Password:"
        type="password"
        placeholder="Enter your password"
        kbAction={kbBtnClick}
        valueSetter={setPassword}
      />

      <div className="mt-8 flex flex-col gap-y-4">
        <button
          disabled={email && userName && password ? false : true}
          ref={myBtn}
          className={
            "py-3 rounded-xl text-lg font-bold " +
            (email && userName && password
              ? "bg-emerald-400 active:scale-[.97] active:duration-75 transition-all hover:scale-[1.01] ease-in-out"
              : "bg-emerald-200")
          }
          onClick={(event) => {
            event.preventDefault();
            console.log(" Username: " + userName);
            console.log(" Email: " + email);
            console.log(" Password: " + password);
          }}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Register;
