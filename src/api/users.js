import api from "./axios";

export const getUsers = () => api.get("/users");

export const getUser = (id) => api.get(`/users/${id}`);

export const register = (user) => api.post("/users/register", user);

export const login = (user) => api.post("/users/login", user);