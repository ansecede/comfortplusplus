import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  recCodeToTemp,
  formatTemperature,
  realtimeDbHandlers,
} from "../../../utils/homeUtils";
import useGetTemperatureCode from "../../../utils/useGetTemperatureCode";
import useGetRecomendation from "../../../utils/useGetRecomendation";
import { AuthContext } from "../../Stack";
import { BsThermometerSnow } from "react-icons/bs";
import { IoHappyOutline } from "react-icons/io5";
import { WiHot } from "react-icons/wi";
import Timer from "../Timer";
import ProfileCard from "./ProfileCard";

function Home() {
  //Para ver usuario logueado. Button id=Borrar
  const [currentUser, authState] = useContext(AuthContext);

  const temperature = useGetTemperatureCode(0);
  const displayTemperature = formatTemperature(recCodeToTemp(temperature));

  const [setRec, incrementUserComfortState] = realtimeDbHandlers();
  const done = useGetRecomendation(setRec);

  /*
  Ideas o cosas necesarias para mejorar el UI/UX
  -Poner un timer que avise cuanto falta para el siguiente cambio de estado
  -Mejorar el feedback cuando se presiona un boton de comfort
  -Mejorar lo de prender, apagar, y cambiar la temperatura del aire
  - 
  */

  useEffect(() => {
    document.title = "Home - Comfort++";
  }, []);

  return (
    // Contenedor completo
    <div className="flex-grow flex flex-col md:flex-row md:flex p-8 ">
      {/* Parte Home con funcionalidades */}
      <div className="md:p-6 md:mr-6 md:w-2/3 md:border-r-2 md:border-r-gray-400 flex flex-col justify-center items-center">
        <div className="bg-gray-300 rounded-2xl px-8 py-6 shadow-lg my-10 w-5/6 h-11/12">
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
            <label className="mt-4">Cambiar temperatura del aire:</label>
            <input
              className="caret-transparent p-2 rounded w-1/2 text-center"
              type="number"
              name="ACtemp"
              min={16}
              max={24}
              value={temperature ? recCodeToTemp(temperature) : "0"}
              onKeyDown={(event) => event.preventDefault()}
              onChange={(value) => {
                let temp = parseInt(value.target.value);
                setRec(recCodeToTemp(temp));
              }}
            />
            <h1 className="mt-5">Cuentanos, ¿qué sientes en este momento?</h1>
          </div>

          {/* <button
            id="borrar"
            className="p-4 mx-4 rounded bg-gray-300"
            onClick={() => {
              console.log(currentUser);
              console.log(authState);
              console.log(temperature);
              console.log(recCodeToTemp(temperature));
              console.log(formatTemperature(recCodeToTemp(temperature)));
            }}
          >
            show
          </button> */}

          {/*---------------------------- Botones para votar ----------------------------*/}
          <div className="inline-block text-center w-full mb-4">
            <div className="float-left px-[2px] sm:px-4 w-1/3">
              <div className="flex flex-col items-center">
                <BsThermometerSnow className="p-4" color="#60a5fa" size={80} />
              </div>
              <button
                className="w-full rounded bg-emerald-400 h-[28px]"
                onClick={() => {
                  incrementUserComfortState(0);
                  alert("Se registro su voto correctamente");
                }}
              >
                Frio
              </button>
            </div>
            <div className="float-left px-[2px] sm:px-4 w-1/3">
              <div className="flex flex-col items-center">
                <IoHappyOutline className="p-4" color="#374151" size={80} />
              </div>
              <button
                className="w-full rounded bg-emerald-400 h-[28px]"
                onClick={() => {
                  incrementUserComfortState(1);
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
                  alert("Se registro su voto correctamente");
                }}
              >
                Calor
              </button>
            </div>
          </div>
          <Timer />
        </div>
      </div>

      {/*---------------------------- Profile segment ----------------------------*/}
      <div className="md:w-1/3 md:border-opacity-0 border-t-2 border-t-gray-400 flex flex-col justify-center items-center">
        <ProfileCard user={currentUser} />
      </div>
    </div>
  );
}

export default Home;
