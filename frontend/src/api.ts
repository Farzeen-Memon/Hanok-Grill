import type { UserPreferences, RecommendationResponse } from './types';

const API_BASE_URL = 'http://localhost:8000';
const BACKEND_URL = 'http://localhost:4000';

export async function getRecommendations(preferences: UserPreferences): Promise<RecommendationResponse> {
    const response = await fetch(`${API_BASE_URL}/api/recommend`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferences),
    });

    if (!response.ok) {
        throw new Error('Failed to get recommendations');
    }

    return response.json();
}

export async function createOrder(orderData: any) {
    const response = await fetch(`${BACKEND_URL}/api/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
    });

    if (!response.ok) {
        throw new Error('Failed to create order');
    }

    return response.json();
}

export async function createReservation(reservationData: any) {
    const response = await fetch(`${BACKEND_URL}/api/reservations`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
    });

    if (!response.ok) {
        throw new Error('Failed to create reservation');
    }

    return response.json();
}
