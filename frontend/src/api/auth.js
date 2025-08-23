import api from "./axios";

export const register = async (userData) => {
  const response = await api.post("register/", userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await api.post("login/", {
    username: credentials.username || credentials.email,
    password: credentials.password,
  });

  const { access, refresh, user } = response.data;
  if (access) {
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
    localStorage.setItem("user", JSON.stringify(user || {}));
  }
  return { access, refresh, user };
};

export const logout = () => {
  localStorage.clear();
};

export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};
