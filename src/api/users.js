import api, { jsonBody } from "./api";

export function getUsers() {
    return api.get("/users");
}

export function deleteUser(id) {
    return api.delete(`/users/${id}`);
}

export function updateUserRole(id, roleId) {
    return api.put(`/users/${id}/role`, ...jsonBody(roleId));
}

export function updateProfile(profile) {
    return api.put("/users/me", profile);
}

export function uploadAvatar(file) {

    const form = new FormData();

    form.append("file", file);

    return api.post("/users/avatar", form);
}

export function getRoles() {
    return api.get("/roles");
}
