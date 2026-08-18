import axios from "axios";

let rawBaseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

// Normalize baseURL: strip trailing slashes and redundant /auth suffix
rawBaseURL = rawBaseURL.trim().replace(/\/+$/, "");
if (rawBaseURL.endsWith("/auth")) {
  rawBaseURL = rawBaseURL.slice(0, -5);
}
if (!rawBaseURL.endsWith("/api")) {
  rawBaseURL += "/api";
}

const axiosInstance = axios.create({
  baseURL: rawBaseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear persistent auth storage on token expiration if running in browser
      if (typeof window !== "undefined") {
        localStorage.removeItem("findnearjob-auth-storage");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;