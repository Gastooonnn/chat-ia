require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const chatRoutes = require("./routes/chat.routes");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.use(express.static(path.join(__dirname, "..", "..", "frontend")));

app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "frontend", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});