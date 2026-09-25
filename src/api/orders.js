import api, { jsonBody } from "./api";

export function getOrders() {
    return api.get("/orders");
}

export function getMyOrders() {
    return api.get("/orders/my");
}

export function getOrder(id) {
    return api.get(`/orders/${id}`);
}

export function checkout() {
    return api.post("/orders/checkout");
}

export function updateOrderStatus(id, status) {
    return api.patch(`/orders/${id}/status`, ...jsonBody(status));
}
