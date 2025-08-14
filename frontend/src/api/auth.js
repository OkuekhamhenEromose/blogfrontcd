import api from "./axios";

// REGISTER
export const register = async (userData) => {
  try {
    const response = await api.post("register/", userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Registration error:", error.response?.data || error.message);
    throw error;
  }
};

// LOGIN
export const login = async (credentials) => {
  try {
    const response = await api.post(
      "login/",
      {
        email: credentials.email,
        password: credentials.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.access) {
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    // Enhanced error handling
    const errorMessage =
      error.response?.data?.detail ||
      error.response?.data?.errors ||
      "Login failed. Please try again.";
    throw new Error(errorMessage);
  }
};

// LOGOUT
export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user");
};

// GET CURRENT USER
export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

// REFRESH TOKEN
export const refreshToken = async () => {
  const refresh = localStorage.getItem("refresh_token");
  if (!refresh) return null;

  try {
    const response = await api.post("token/refresh/", { refresh });
    localStorage.setItem("access_token", response.data.access);
    return response.data.access;
  } catch (error) {
    logout();
    return null;
  }
};
