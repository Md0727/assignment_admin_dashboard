import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const BASE_URL = "https://fakestoreapi.com"
// const apiBaseUrl = `${BASEURL}/api/`;

export const ApiUrl = {
    login: `${BASE_URL}/auth/login`,
    users: `${BASE_URL}/users`,
};

interface Config {
    method: string;
    url: string;
    body?: any;
}

const getAuthHeaders = (token: string | null) => {
    return token ? { Authorization: `Bearer ${token}` } : {};
};

const handleResponse = (res: AxiosResponse, onSuccess: (data: any) => void, onError: (error: any) => void) => {
    if (!res.data.error) {
        onSuccess(res.data);
    } else {
        onError(res.data);
    }
};

const handleError = (err: any, onError: (error: any) => void) => {
    onError(err.response?.data || err.response);
};

export const APIRequest = async (
    config: Config,
    onSuccess: (data: any) => void,
    onError: (error: any) => void,
    noAuth: boolean | null = null
) => {
    const token = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data') as string) : null;

    const data: AxiosRequestConfig = {
        method: config.method,
        url: config.url,
        data: config.body,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...getAuthHeaders(token && noAuth == null ? token : null),
        },
    };

    try {
        axios(data)
            .then(res => handleResponse(res, onSuccess, onError))
            .catch(err => handleError(err, onError));
    } catch (error) {
        console.log('error', error);
    }
};

export const APIRequestWithFile = async (
    config: Config,
    onSuccess: (data: any) => void,
    onError: (error: any) => void
) => {
    const token = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data') as string) : null;

    const data: AxiosRequestConfig = {
        method: config.method,
        url: config.url,
        data: config.body,
        headers: {
            Accept: 'multipart/form-data',
            'Content-Type': 'multipart/form-data',
            ...getAuthHeaders(token),
        },
    };

    try {
        axios(data)
            .then(res => {
                if (res.status === 200 || res.status === 201) {
                    onSuccess(res.data);
                }
            })
            .catch(err => onError(err.response));
    } catch (error) {
        console.log(error);
    }
};