import axios from "axios";
import api, { jsonBody } from "./api";

export function getRepairs() {
    return api.get("/repairs");
}

export function createRepair(repair) {
    return api.post("/repairs", repair);
}

export function updateRepairStatus(id, status) {
    return api.patch(`/repairs/${id}/status`, ...jsonBody(status));
}

// Уведомление в Telegram. Отдельный axios — токен пользователя боту не нужен.
export function notifyTelegram(request) {
    return axios.post("/bot/send", request);
}
