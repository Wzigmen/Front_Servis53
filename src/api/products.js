import api from "./api";

export function getProducts() {
    return api.get("/products");
}

export function getProduct(id) {
    return api.get(`/products/${id}`);
}

export function createProduct(product) {
    return api.post("/products", product);
}

export function updateProduct(id, product) {
    return api.put(`/products/${id}`, product);
}

export function deleteProduct(id) {
    return api.delete(`/products/${id}`);
}