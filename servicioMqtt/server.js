const express = require("express");
const cors = require("cors");
const mqtt = require("mqtt");
const app = express();
const { url, options } = require("./mqttConfig");
const client = mqtt.connect(url, options);

app.use(express.json());
app.use(cors());

app.get("/connect", (req, res) => {
  res.send({ res: "Connected and waiting for orders..." });
});

app.post("/send", (req, res) => {
  console.log(req.body);
  const msg = req.body.msg;
  const topic = req.body.topic;
  try {
    client.publish(topic, msg);
  } catch (err) {
    console.error(err);
  }

  res.send({ res: `Message succesfuly publish on ${topic}` });
});

app.get("/end", (req, res) => {
  client.end();
  res.send({ res: "Disconnected from MQTT broker..." });
});

app.listen(3000, console.log("Server started"));
