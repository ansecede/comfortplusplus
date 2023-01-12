import { useEffect, useState } from "react";
import { rtdb } from "../config/firebase";
import { off, onValue, ref } from "firebase/database";

function useGetTemperature(temp, fbRecSetter) {
  const [temperature, setTemperature] = useState(temp);

  useEffect(() => {
    setTimeout(() => {
      const recomendation = ref(rtdb, "/recomendation/rec");
      let listener = onValue(recomendation, (snapshot) => {
        setTemperature(snapshot.val());
      });
      temperature === 1
        ? setTimeout(() => {
            fbRecSetter(7);
          }, 2000)
        : true;

      // Stop listening for updates when no longer required
      return () => off(recomendation, listener);
    }, 1000);
  }, [temperature]);

  return temperature;
}

export default useGetTemperature;
