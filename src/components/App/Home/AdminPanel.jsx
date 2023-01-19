import React from "react";
import mqttHandlers from "../../../utils/mqttUtils";
import "./adminpanel.css";

function AdminPanel({ temperature, recCodeToTemp, setRec }) {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center mt-4">
        <label>Cambiar temperatura del aire:</label>
        <input
          className="caret-transparent p-2 rounded w-1/2 text-center text-black"
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
      </div>
      <div
        className="mt-4 p-4 text-gray-200 flex justify-center border border-gray-600 rounded-lg lg:w-2/3 "
        onChange={(event) => setRec(parseInt(event.target.value))}
      >
        <label className="font-medium text-lg mr-4" htmlFor="">
          Estado:
        </label>
        <label className="font-normal text-lg mx-8" htmlFor="ON">
          <input
            value={1}
            name="estado"
            id="ON"
            className="mr-10"
            type="radio"
          />
          ON
        </label>
        <label className="font-normal text-lg mx-2" htmlFor="OFF">
          <input value={2} name="estado" id="OFF" type="radio" className="" />
          OFF
        </label>
      </div>
    </div>
  );
}

export default AdminPanel;
