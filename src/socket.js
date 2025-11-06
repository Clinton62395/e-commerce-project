// src/socket.js
import { io } from "socket.io-client";
import { API_URL } from "./services/constant";

const SOCKET_URL = API_URL;

// ✅ Configuration améliorée
export const socket = io(SOCKET_URL, {
  transports: ["websocket", "polling"],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  autoConnect: true,
});

// 🟢 Événements de connexion
socket.on("connect", () => {
  console.log("✅ [Socket.IO] Connecté au serveur:", socket.id);
  console.log(
    "✅ [Socket.IO] Transport utilisé:",
    socket.io.engine.transport.name
  );
});

socket.on("disconnect", (reason) => {
  console.log("❌ [Socket.IO] Déconnecté:", reason);
});

socket.on("connect_error", (error) => {
  console.error("⚠️ [Socket.IO] Erreur de connexion:", error.message);
  console.error("⚠️ [Socket.IO] Type d'erreur:", error.type);
  console.error("⚠️ [Socket.IO] Description:", error.description);
});

socket.on("reconnect", (attemptNumber) => {
  console.log(`🔄 [Socket.IO] Reconnecté après ${attemptNumber} tentative(s)`);
});

socket.on("reconnect_attempt", (attemptNumber) => {
  console.log(`🔄 [Socket.IO] Tentative de reconnexion ${attemptNumber}...`);
});

socket.on("reconnect_error", (error) => {
  console.error("⚠️ [Socket.IO] Erreur de reconnexion:", error.message);
});

socket.on("reconnect_failed", () => {
  console.error(
    "❌ [Socket.IO] Échec de reconnexion après plusieurs tentatives"
  );
});

// / ✅ SIMPLIFICATION: Événement de confirmation (optionnel)

socket.on("connection-confirmed", (data) => {
  console.log("✅ [Socket.IO] Confirmation:", data);
});

export default socket;
