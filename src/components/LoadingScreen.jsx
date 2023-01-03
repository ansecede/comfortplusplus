import React from "react";
import "./loadingscreen.css";

function LoadingScreen() {
  return (
    <div className="absolute top-0 left-0 w-full h-screen bg-gray-800 flex flex-col justify-center text-center">
      <h1 className="text-shadow text-8xl py-6">Comfort++</h1>
    </div>
  );
}

export default LoadingScreen;
