import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  recCodeToTemp,
  formatTemperature,
  realtimeDbHandlers,
  getUserData,
} from "../../../utils/homeUtils";
import useGetTemperatureCode from "../../../utils/useGetTemperatureCode";
import useGetRecomendation from "../../../utils/useGetRecomendation";
import { AuthContext } from "../../Stack";
import { BsThermometerSnow } from "react-icons/bs";
import { IoHappyOutline } from "react-icons/io5";
import { WiHot } from "react-icons/wi";
import Timer from "./Timer";
import ProfileCard from "./ProfileCard";
import AdminPanel from "./AdminPanel";
import useSetTitle from "../../../utils/useSetTitle";
import mqttService from "../../../utils/mqttUtils";

function Home() {
  useSetTitle("Home");

  //Para ver usuario logueado. Button id=Borrar
  const [currentUser, authState] = useContext(AuthContext);
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState(null);

  async function resolveData() {
    const [role, username] = await getUserData(currentUser.uid);
    setUserRole(role);
    setUserName(username);
  }

  resolveData();

  const [setRec, incrementUserComfortState] = realtimeDbHandlers();
  const { publish, topic } = mqttService;
  const done = useGetRecomendation(setRec);
  const temperature = useGetTemperatureCode(0, setRec);
  const displayTemperature = formatTemperature(recCodeToTemp(temperature));

  /*
  Ideas o cosas necesarias para mejorar el UI/UX
  -Poner un timer que avise cuanto falta para el siguiente cambio de estado
  -Mejorar el feedback cuando se presiona un boton de comfort
  -Hacer que lo botones se blooquen cuando vote cualquier instancia del usuario estudiante. Desbloquear cuando llegue la recomendación. Es decir cada 15 minutos.
  */

  return (
    // Contenedor completo
    <div className="flex-grow flex flex-col md:flex-row md:flex p-8 ">
      {/* Parte Home con funcionalidades */}
      <div className="md:p-6 md:mr-6 md:w-2/3 md:border-r-2 md:border-r-gray-400 flex flex-col justify-center items-center">
        <div className="bg-gray-800 rounded-2xl px-8 py-6 shadow-lg my-10 w-5/6 h-11/12 text-gray-50">
          <h1>
            <Link to={"/about"} className="underline">
              Acerca del proyecto
            </Link>
          </h1>
          <div className="flex flex-col justify-center items-center mt-4">
            <h1>Temperatura del aire:</h1>
            <h1 className="font-semibold text-xl">
              {displayTemperature ? displayTemperature : "Cargando..."}
            </h1>
          </div>
          {userRole === "admin" ? (
            <AdminPanel
              displayTemperature={displayTemperature}
              temperature={temperature}
              recCodeToTemp={recCodeToTemp}
              setRec={setRec}
            />
          ) : (
            <></>
          )}

          {/*---------------------------- Botones para votar ----------------------------*/}
          <div className="inline-block text-center w-full mb-4 text-black">
            <h1 className="mt-5 text-gray-50">
              Cuentanos, ¿qué sientes en este momento?
            </h1>
            <div className="float-left px-[2px] sm:px-4 w-1/3 ">
              <div className="flex flex-col items-center">
                <BsThermometerSnow className="p-4" color="#60a5fa" size={80} />
              </div>
              <button
                className="w-full rounded bg-emerald-400 h-[28px]"
                onClick={() => {
                  incrementUserComfortState(0);
                  publish(topic, "cold");
                  alert("Se registro su voto correctamente");
                }}
              >
                Frio
              </button>
            </div>
            <div className="float-left px-[2px] sm:px-4 w-1/3">
              <div className="flex flex-col items-center">
                <IoHappyOutline className="p-4" color="#FFF" size={80} />
              </div>
              <button
                className="w-full rounded bg-emerald-400 h-[28px]"
                onClick={() => {
                  incrementUserComfortState(1);
                  publish(topic, "neutral");
                  alert("Se registro su voto correctamente");
                }}
              >
                Neutral
              </button>
            </div>
            <div className="float-left px-[2px]  sm:px-4 w-1/3 ">
              <div className="flex flex-col items-center">
                <WiHot className="p-4" color="#fbbf24" size={80} />
              </div>
              <button
                className="w-full rounded bg-emerald-400 h-[28px]"
                onClick={() => {
                  incrementUserComfortState(2);
                  publish(topic, "warm");
                  alert("Se registro su voto correctamente");
                }}
              >
                Calor
              </button>
            </div>
          </div>
          <Timer />
        </div>
        {/* <div>
          <button
            className="bg-red-500"
            onClick={() => {
              console.log(currentUser);
            }}
          >
            show
          </button>
        </div> */}
      </div>

      {/*---------------------------- Profile segment ----------------------------*/}
      <div className="md:w-1/3 md:border-opacity-0 border-t-2 border-t-gray-400 flex flex-col justify-center items-center">
        <ProfileCard role={userRole} username={userName} />
      </div>
    </div>
  );
}

export default Home;
