export const API_ROOT_URL = 'http://localhost:8081/api';
export const API_URLS = {
    checkConnection: `${API_ROOT_URL}/test/hello`,
    products: `${API_ROOT_URL}/products`,
    purchases: `${API_ROOT_URL}/purchases`,
    allpurchases: `${API_ROOT_URL}/purchases/all`,
    achievements: `${API_ROOT_URL}/achievements`,
    leaderboard: `${API_ROOT_URL}/leaderboard`,
    settings: `${API_ROOT_URL}/user-profile`,
    label: `${API_ROOT_URL}/services/label-analysis`,
    testproducts: `${API_ROOT_URL}/test/products`,
    testproduct: `${API_ROOT_URL}/test/product`,
    testpurchases: `${API_ROOT_URL}/test/purchases`,
    historyAnalysis: `${API_ROOT_URL}/services/history-analysis`,
    recommendation: `${API_ROOT_URL}/services/recommendation`,
};

export const APP_ROOT_URL = 'http://localhost:3000';
export const APP_URLS = {
    home: `${APP_ROOT_URL}/`,
};

export const KEYCLOAK_ROOT_URL = 'http://localhost:8080/';