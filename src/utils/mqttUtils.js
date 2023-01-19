const url = "http://127.0.0.1:3000/";
// const myTopic = "test/prueba";
const myTopic = "integradora/confort";

async function publish(topic, msg) {
  const res = await fetch(url + "send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      topic,
      msg,
    }),
  });
  const data = await res.json();

  console.log(data.res);
}

const mqttHandlers = {
  publish,
  topic: myTopic,
};

export default mqttHandlers;
