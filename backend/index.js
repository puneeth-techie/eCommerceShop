import http from "http";
import dotenv from "dotenv";
import app from "./startup/app.js";

dotenv.config();
const server = http.createServer(app);
const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Server Started in ${process.env.NODE_ENV} mode, at ${port}...`);
});
