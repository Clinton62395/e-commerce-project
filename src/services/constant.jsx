import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Fonction pour refresh le token - CORRIGÉE
const refreshToken = async () => {
  const refresh = localStorage.getItem("refreshToken");
  if (!refresh) {
    console.log("No refresh token found");
    return null;
  }

  try {
    // ✅ CORRECTION 1: Utiliser POST au lieu de GET (standard pour refresh)
    // ✅ CORRECTION 2: Envoyer le refresh token dans le body ou headers selon votre API
    const res = await axios.post(
      `${API_URL}/auth/refresh-token`,
      {
        refreshToken: refresh,
      },
      {
        headers: {
          "Content-Type": "application/json",
          // Ou selon votre API:
          Authorization: `Bearer ${refresh}`,
        },
      }
    );

    console.log("Refresh response:", res.data);

    // ✅ CORRECTION 3: Vérifier la structure de la réponse
    if (res.data && res.data.token) {
      // Sauvegarder les nouveaux tokens
      localStorage.setItem("token", res.data.token);

      // ✅ CORRECTION 4: Vérifier si un nouveau refresh token est fourni
      if (res.data.refreshToken) {
        localStorage.setItem("refreshToken", res.data.refreshToken);
      }

      return res.data.token;
    } else {
      console.log("Invalid refresh response structure:", res.data);
      return null;
    }
  } catch (error) {
    console.log("Refresh token error:", error.response?.data || error.message);

    // ✅ CORRECTION 5: Nettoyer les tokens invalides
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      // Rediriger vers la page de login si nécessaire
      window.location.href = "/login";
    }

    return null;
  }
};

// Intercepteur Request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepteur Response - CORRIGÉ
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // ✅ CORRECTION 6: Vérifier plus précisément l'expiration du token
    if (
      (error.response &&
        error.response.status === 401 &&
        !originalRequest._retry &&
        error.response.data?.message?.includes("expired")) ||
      error.response.data?.message?.includes("invalid")
    ) {
      originalRequest._retry = true;

      const newAccessToken = await refreshToken();

      if (newAccessToken) {
        // ✅ CORRECTION 7: Mettre à jour le header avec le nouveau token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } else {
        // ✅ CORRECTION 8: Si le refresh échoue, déconnecter l'utilisateur
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);
