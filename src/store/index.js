import { createStore} from 'vuex';

const store = createStore({
    state() {
        return {
            username: '',
            token: '',
            status: '',
        }
    },
    getters: {
        isLogin(state) {
            return state.username !== '';
        },

        isAllowed(state) {
            return state.status === "MASTER" || state.status === "ALLOWED";
        },
    },
    mutations: {
        setUsername(state, username) {
            state.username = username;
        },
        setToken(state, token) {
            state.token = token;
        },

        setStatus(state, status) {
            state.status = status;
        },

        clearUsername(state) {
            state.username = '';
        },
    },
});

export default store