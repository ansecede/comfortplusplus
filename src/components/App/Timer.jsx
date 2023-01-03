import React, { useEffect, useState } from "react";

function Timer() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(14);
  const [seconds, setSeconds] = useState(59);
  const list = [hours, minutes, seconds];
  const text = ["Horas", "Minutos", "Segundos"];

  function getTime() {
    // if (seconds === 0) {
    //   setMinutes(minutes - 1);
    //   console.log("Porqueno corre la linea 13 ptm");
    //   setSeconds(59);
    // }
    setSeconds(seconds + 1);

    // console.log(time);

    // setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    // setMinutes(Math.floor((time / 1000 / 60) % 60));
    // setSeconds(Math.floor((time / 1000) % 60));
  }

  useEffect(() => {
    const interval = setInterval(() => getTime(), 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <div
      className="timer bg-gray-500 inline-block p-3 mt-3 text-center w-full"
      role="timer"
    >
      <h1 className="font-semibold text-lg">Cronometro en construcción...</h1>
      {/* {list.map((value, index) => {
        return (
          <div key={index} className="float-left col-4 w-1/3">
            <div
              className={`box p-3 ${
                index + 1 === list.length
                  ? "border-r-white border-opacity-0 border-r-2"
                  : "border-r-white border-opacity-20 border-r-2"
              }`}
            >
              <p id="day">{value}</p>
              <span className="text">{text[index]}</span>
            </div>
          </div>
        );
      })} */}
    </div>
  );
}

export default Timer;
