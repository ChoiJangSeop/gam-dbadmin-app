import store from '../store/index.js';
import axios from 'axios';

export function setInterceptors(instance) {
    instance.intersceptors.request.use(
        config => {
            config.headers.Authorization = store.state.token;
            return config;
        },
        err => {
            return Promise.reject(err);
        }
    );
}