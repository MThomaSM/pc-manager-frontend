import axios from "axios";
import store from "@/store";

const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosClient.interceptors.request.use(function (config) {
    const token = store.getState().auth.jwt.token;
    config.headers.Authorization = token ? `Bearer ${token}` : '';

    config.url += (config.url!.includes('?') ? '&' : '?') + 'XDEBUG_SESSION_START=PHPSTORM';

    return config;
});

export default axiosClient;