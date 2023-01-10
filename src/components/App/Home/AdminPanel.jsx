import React from "react";

function AdminPanel({ temperature, recCodeToTemp, setRec }) {
  return (
    <div className="flex flex-col justify-center items-center mt-4">
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
    </div>
  );
}

export default AdminPanel;
