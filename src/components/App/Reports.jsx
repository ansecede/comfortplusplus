import React, { useEffect, useState } from "react";
import { fsdb } from "../../config/firebase";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import VotesChart from "./VotesChart";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "./reports.css";

function Reports() {
  const [votes, setVotes] = useState([]);

  useEffect(() => {
    document.title = "Reports - Comfort++";
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const comfortVotesRef = collection(fsdb, "Comfort");
      const q = query(comfortVotesRef, orderBy("date", "desc"), limit(1));
      const unsub = onSnapshot(q, (querySnapshot) => {
        console.log("snapshot", querySnapshot);
        querySnapshot.forEach((doc) => {
          let items = doc.data();
          setVotes([items.cold, items.neutral, items.warm]);
        });
      });

      return () => unsub;
    }, 500);
  }, []);

  function LoadingVotes() {
    return (
      <div className="flex flex-col items-center justify-center mt-15 pt-10">
        <AiOutlineLoading3Quarters
          className="text-emerald-400 animate-spin"
          size={200}
        />
        <h1 className="font-semibold text-3xl mt-8">Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <div className="sm:m-8 mt-8 mx-8 mb-2 text-center justify-center">
        <h1 className="font-semibold text-3xl sm:p-4">Número de votos</h1>
      </div>
      {votes.length != 0 ? <VotesChart votes={votes} /> : <LoadingVotes />}
      <button
        className="rounded-md bg-slate-600 text-white w-32"
        onClick={() => {
          setVotes([20, 30, 50]);
        }}
      >
        cargar
      </button>
    </>
  );
}

export default Reports;
