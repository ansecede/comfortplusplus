import { rtdb, fsdb } from "../config/firebase";
import { increment, ref, set, update } from "firebase/database";
import { doc, getDoc } from "firebase/firestore";

export function realtimeDbHandlers() {
  const comfortStates = ["cold", "neutral", "warm"];

  const setRec = async (ac_value) => {
    await set(ref(rtdb, "/recomendation"), {
      rec: ac_value,
    });
  };

  const incrementUserComfortState = async (value) => {
    let comfortState = comfortStates[value];
    const dbRef = ref(rtdb, "/comfort");

    await update(dbRef, {
      [comfortState]: increment(1),
    });
  };

  return [setRec, incrementUserComfortState];
}

export function recCodeToTemp(code) {
  const tempCases = [
    22,
    "OFF",
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    11,
    10,
    9,
    8,
    7,
    6,
    5,
    4,
    3,
  ];
  const correspondingRecCode = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 24, 23, 22, 21, 20, 19, 18, 17, 16,
  ];

  let idx = correspondingRecCode.indexOf(code);
  return tempCases[idx];
}

export function formatTemperature(temperature) {
  if (typeof temperature === "number") {
    return temperature + "ºC";
  }
  return temperature;
}

export async function getUserEmail(username) {
  let exists = null,
    email = null;
  const userNameRef = doc(fsdb, "usernames", username);
  const userNameDoc = await getDoc(userNameRef);
  if (!userNameDoc.exists()) {
    console.log("Username not found!");
    exists = false;
    return [email, exists];
  }

  const uidRef = doc(fsdb, "users", userNameDoc.data().uid);
  const uidDoc = await getDoc(uidRef);
  if (uidDoc.exists()) {
    exists = true;
    email = uidDoc.data().email;
    return [email, exists];
  }
}

export async function getUserRole(username) {
  const userNameRef = doc(fsdb, "usernames", username);
  const userNameDoc = await getDoc(userNameRef);

  const uidRef = doc(fsdb, "users", userNameDoc.data().uid);
  const uidDoc = await getDoc(uidRef);
  if (uidDoc.exists()) {
    return uidDoc.data().role;
  }
}
