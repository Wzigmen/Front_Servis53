import api from "./api";

export function getNews() {
    return api.get("/news");
}