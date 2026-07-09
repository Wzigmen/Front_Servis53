import api from "./api";

export function getReviews(productId) {
    return api.get(`/reviews/product/${productId}`);
}

export function createReview(review) {
    return api.post("/reviews", review);
}