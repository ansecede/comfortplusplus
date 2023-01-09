import React from "react";
import avatar from "../../../assets/avatar-profile.jpg";
import { auth } from "../../../config/firebase";
import { signOut } from "firebase/auth";

function ProfileCard({ user }) {
  return (
    <div className="w-72 lg:w-72 md:w-[267px] bg-gray-800 rounded-2xl px-8 py-6 shadow-lg my-10 whitespace-pre-line">
      <div className="flex items-center justify-between">
        <span className="text-gray-400 text-sm">Perfil</span>
      </div>
      <div className="mt-6 w-fit mx-auto">
        <img src={avatar} className="rounded-full w-28" alt="profile picture" />
      </div>

      <div className="mt-8">
        <h2 className="text-white font-bold text-2xl">Welcome</h2>
        <p className="text-white font-bold">{user.displayName}</p>
      </div>
      <p className="text-emerald-400 font-semibold mt-2.5">
        {user.displayName === "Admin" ? "Administrador" : "Usuario"}
      </p>
      <div className="mt-3 text-white text-sm">
        <span className="text-gray-400 font-semibold">Edificio: </span>
        <span>11C</span>
      </div>
      <div className="mt-3 text-white text-sm">
        <span className="text-gray-400 font-semibold">Sala: </span>
        <span>Laboratorio de Sistemas Telematicos</span>
      </div>
      <div className="mt-3 flex flex-col justify-center items-center">
        <button
          className="p-4 rounded bg-emerald-400 active:scale-[.97] active:duration-75 transition-all hover:scale-[1.05] ease-in-out"
          onClick={() => {
            signOut(auth);
          }}
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

export default ProfileCard;
