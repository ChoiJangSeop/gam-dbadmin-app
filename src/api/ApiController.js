import axios from 'axios';
import store from '../store/index.js';

const instance = axios.create({
    baseURL: "http://localhost:8080",
});

instance.interceptors.request.use(
    function(config) {
        config.headers.Authorization = "Bearer " + store.state.token;
        return config;
    },
    function(err) {
        console.log(err);
        alert("서버에 요청과정에서 예기치 못한 문제가 발생하였습니다.");
        return Promise.reject(err);
    }
);

instance.interceptors.response.use(
    function(res) {
        console.log(res);
        return res;
    },
    function(err) {
        console.log(err);
        return Promise.reject(err);
    }
);

export default instance;
