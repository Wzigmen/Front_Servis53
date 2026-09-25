import axios from "axios";

// Все запросы идут на относительный /api:
// в dev их проксирует Vite, в Docker — nginx (см. vite.config.js и nginx.conf)
const api = axios.create({
    baseURL: "/api"
});

api.interceptors.request.use(config => {

    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export function productImageUrl(productId, imageName) {
    return imageName ? `/images/products/${productId}/${imageName}` : null;
}

export function avatarUrl(fileName) {
    return fileName ? `/images/avatars/${fileName}` : null;
}

// Текст ошибки из ответа сервера (строка или ошибки валидации ASP.NET)
export function errorMessage(error, fallback = "Произошла ошибка") {

    const data = error?.response?.data;

    if (typeof data === "string" && data)
        return data;

    if (data?.errors)
        return Object.values(data.errors).flat().join("\n");

    return fallback;
}

// Тело для [FromBody] string / int на бэкенде
export function jsonBody(value) {
    return [JSON.stringify(value), { headers: { "Content-Type": "application/json" } }];
}

export default api;
