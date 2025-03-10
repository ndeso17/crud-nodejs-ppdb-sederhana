require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const { exec } = require("child_process");

const app = express();
const port = process.env.PORT;

const logs = require("./Logs");

// EJS view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "Views"));
app.use(express.static(path.join(__dirname, "Public")));

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logs);

//! Routes
const routes = require("./Routes");
app.use("/", routes);

function startServer() {
  const server = app.listen(port, () => {
    console.log(`Server berjalan pada port ${port}!`);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.log(`Port ${port} sedang digunakan, mencoba membebaskannya...`);
      exec(`fuser -k ${port}/tcp`, (error) => {
        if (error) {
          console.error(
            `Gagal mematikan proses di port ${port}:`,
            error.message
          );
          process.exit(1);
        } else {
          console.log(`Port ${port} berhasil dibebaskan, restart server...`);
          setTimeout(startServer, 1000);
        }
      });
    } else {
      console.error("Error server:", err.message);
      process.exit(1);
    }
  });
}

startServer();
