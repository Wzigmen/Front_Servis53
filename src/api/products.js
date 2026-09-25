import api from "./api";

export function getProducts(params) {
    return api.get("/products", { params });
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

export function uploadProductImages(id, files) {

    const form = new FormData();

    files.forEach(file => form.append("files", file));

    return api.post(`/products/${id}/images`, form);
}

export function savePhoneSpec(id, spec) {
    return api.post(`/products/${id}/phone`, spec);
}

export function getCategories() {
    return api.get("/categories");
}

export function getBrands() {
    return api.get("/brands");
}
