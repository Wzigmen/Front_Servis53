import api from "./api";

export function getOrders() {
    return api.get("/orders");
}

export function createOrder(order) {
    return api.post("/orders", order);
}

export function getOrder(id) {
    return api.get(`/orders/${id}`);
}