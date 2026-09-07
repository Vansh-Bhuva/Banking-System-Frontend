import api from "../../services/api/axios";

const login = async (credentials) => {
  const response = await api.post("/auth/login", credentials);

  if (response.data) {
    localStorage.setItem("auth", JSON.stringify(response.data));
  }

  return response.data;
};

const register = async (userData) => {
  const response = await api.post("/auth/register", userData);

  return response.data;
};

const authService = {
  login,
  register,
};

export default authService;