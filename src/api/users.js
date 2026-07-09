import api from "./api";

export function getUsers() {
    return api.get("/users");
}

export function getUser(id) {
    return api.get(`/users/${id}`);
}

export function deleteUser(id) {
    return api.delete(`/users/${id}`);
}

export function updateUser(id, user) {
    return api.put(`/users/${id}`, user);
}