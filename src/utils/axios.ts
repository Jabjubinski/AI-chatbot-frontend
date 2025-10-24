import axios from "axios";

const createAxiosInstance = (version: string) => {
    const instance = axios.create({
        baseURL: `${import.meta.env.VITE_BACKEND_APP_URL}/api/${version}`,
        withCredentials: true,
    });

    return instance;
};

export const apiV1 = createAxiosInstance("v1");
export const apiV2 = createAxiosInstance("v2");