const url = "mqtt://192.168.10.178";

// Create an MQTT client instance
const options = {
  // Clean session
  clean: true,
  connectTimeout: 4000,
  // Authentication
  clientId: `React-mqtt-${Math.random().toString(16).substr(2, 8)}`,
  username: "labtelematica",
  password: "l4bt3l3m4tic@",
};

module.exports = { url, options };
