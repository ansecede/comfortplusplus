const PORT = 7201;
const express = require("express");
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname, "public")));

// app.get("/comfort", (_req, res) =>
//   res.sendFile(path.join(__dirname, "/public/dist/index.html"))
// );

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
