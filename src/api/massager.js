import api from "./api";

export function sendMessage(message) {
    return api.post("/messages", message);
}