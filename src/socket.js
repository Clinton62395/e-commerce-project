// src/socket.js
import { io } from "socket.io-client";
import { API_URL } from "./services/constant";

//  Remplace par ton adresse backend
const SOCKET_URL = API_URL;

export const socket = io(SOCKET_URL, {
  transports: ["websocket", "polling"],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 2000,
});

socket.on("connected to serveur", () => {
  console.log("socket connected  to server", socket.id);
});

socket.on("connectin-error", (err) => {
  console.log("error occured when  connecting  to server", err.message);
});
