import api from "./api";

export function getReviews() {
    return api.get("/reviews");
}

export function getProductReviews(productId) {
    return api.get(`/reviews/product/${productId}`);
}

export function createReview(review) {
    return api.post("/reviews", review);
}

export function deleteReview(id) {
    return api.delete(`/reviews/${id}`);
}
