import axios from 'axios';

const API = axios.create({
    baseURL: 'https://api-lostark.game.onstove.com',
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_LOSTARK_API_KEY}`,
    },
});

export default API;