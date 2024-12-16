const API_BASE_URL = 'http://localhost:8080/api';

const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem('accessToken');
    const headers = {
        'Authorization': `Bearer ${token}`,
        ...(options.headers || {}),
    };

    try {
        const response = await fetch(`${API_BASE_URL}${url}`, {
            ...options,
            headers,
        });

        // Ha az accessToken érvénytelen, próbáljuk meg frissíteni
        if (response.status === 401 || response.status === 403) {
            const refreshed = await refreshAccessToken();
            if (refreshed) {
                // Új accessToken-nel újrapróbálkozás
                const newToken = localStorage.getItem('accessToken');
                return fetch(`${API_BASE_URL}${url}`, {
                    ...options,
                    headers: {
                        ...headers,
                        'Authorization': `Bearer ${newToken}`,
                    },
                });
            } else {
                // Ha nem sikerült frissíteni a tokent, dobjuk a felhasználót a bejelentkezési oldalra
                redirectToLogin();
            }
        }

        return response;
    } catch (err) {
        console.error('Hiba történt a fetchWithAuth során:', err);
        throw err;
    }
};

const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
        console.warn('Nincs refresh token, irány a bejelentkezés.');
        redirectToLogin();
        return false;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('accessToken', data.accessToken);
            return true;
        } else {
            console.error('Nem sikerült frissíteni a tokent.');
            redirectToLogin();
            return false;
        }
    } catch (err) {
        console.error('Hiba történt a refresh token kérés során:', err);
        redirectToLogin();
        return false;
    }
};

const redirectToLogin = () => {
    window.location.href = '/login';
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
};

export default fetchWithAuth;
