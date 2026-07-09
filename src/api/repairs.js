import api from "./api";

export function getRepairs() {
    return api.get("/repairs");
}

export function createRepair(repair) {
    return api.post("/repairs", repair);
}

export function updateRepair(id, repair) {
    return api.put(`/repairs/${id}`, repair);
}