import React, { useContext, useRef, useState } from "react";
import tempImage from "../../assets/temperature.svg";
import happyImage from "../../assets/happy.svg";
import { AuthContext } from "../Stack";

function Form({ signInHandler }) {
  //Para ver si se desloguea al usar signOff. Ver boton Register. Ln 66
  // const [currentUser, authState] = useContext(AuthContext);

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
      <div className="flex justify-center mb-2">
        <h1 className="text-3xl sm:text-5xl font-semibold text-gray-50">
          Comfort++
        </h1>
        <img className="w-10 ml-2" src={tempImage} alt="" />
        <img className="w-10 ml-2" src={happyImage} alt="" />
      </div>
      <div className="flex justify-center text-center">
        <h1 className="font-medium text-lg text-gray-100 mt-4">
          Welcome Back! Please enter your details to get comfort
        </h1>
      </div>
      <div className="mt-2  text-gray-200">
        <label className="font-medium text-lg" htmlFor="">
          Email:
        </label>
        <input
          className="w-full border-2 border-gray-300 rounded-xl p-4 mt-2 bg-transparent placeholder-gray-500"
          type="text"
          placeholder="Enter your email"
          autoComplete="on"
          autoFocus
          onKeyDown={kbBtnClick}
          onChange={(value) => setUserName(value.target.value)}
        />
      </div>
      <div className="mt-4 text-gray-200">
        <label className="font-medium text-lg" htmlFor="">
          Password:
        </label>
        <input
          className="w-full border-2 border-gray-300 rounded-xl p-4 mt-2 bg-transparent placeholder-gray-500"
          type="password"
          placeholder="Enter your password"
          onKeyDown={kbBtnClick}
          onChange={(value) => setPassword(value.target.value)}
        />
      </div>
      <div className="mt-8 flex flex-col gap-y-4">
        <button
          disabled={userName && password ? false : true}
          ref={myBtn}
          className={
            userName && password
              ? "py-3 rounded-xl bg-emerald-400 text-lg font-bold active:scale-[.97] active:duration-75 transition-all hover:scale-[1.01] ease-in-out"
              : "py-3 rounded-xl bg-emerald-200 text-lg font-bold"
          }
          onClick={(event) => {
            event.preventDefault();
            console.log(" Password: " + password);
            signInHandler(userName, password);
          }}
        >
          Sign In
        </button>
        {/* <button
          className=" py-3 rounded-xl bg-emerald-400 text-lg font-bold active:scale-[.97] active:duration-75 transition-all hover:scale-[1.01] ease-in-out"
          onClick={() => {
            console.log(currentUser);
            console.log(authState);
          }}
        >
          Register
        </button> */}
      </div>
    </div>
  );
}

export default Form;
