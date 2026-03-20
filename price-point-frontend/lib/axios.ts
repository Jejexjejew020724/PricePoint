import axios from "axios";

const api = axios.create({
  // Sesuaikan port ini dengan port Golang kamu (biasanya 8080)
  baseURL: "http://localhost:8080/api",
});

// Otomatis menyisipkan token di setiap request jika sudah login
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token"); // Atau ambil dari cookies jika kamu pakai cookies
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
