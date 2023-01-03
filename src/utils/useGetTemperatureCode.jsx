import { useEffect, useState } from "react";
import { rtdb } from "../config/firebase";
import { off, onValue, ref } from "firebase/database";

function useGetTemperature(temp) {
  const [temperature, setTemperature] = useState(temp);

  useEffect(() => {
    setTimeout(() => {
      const recomendation = ref(rtdb, "/recomendation/rec");
      let listener = onValue(recomendation, (snapshot) => {
        setTemperature(snapshot.val());
      });
      // Stop listening for updates when no longer required
      return () => off(recomendation, listener);
    }, 1000);
  }, [temperature]);

  return temperature;
}

export default useGetTemperature;
