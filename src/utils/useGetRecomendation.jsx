import { useEffect, useState } from "react";
import { fsdb } from "../config/firebase";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";

function useGetRecomendation(recomendationHandler) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const recomendatioRef = collection(fsdb, "recomendations2");
    const q = query(recomendatioRef, orderBy("date", "desc"), limit(1));
    const unsub = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let item = doc.data();
        console.log("llego una recomendacion, ejecutando...");
        recomendationHandler(item.option);
        setDone(true);
        // setTemperature(item.option);
      });
    });

    return () => unsub;
  }, []);

  return done;
}

export default useGetRecomendation;
