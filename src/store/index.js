import { createStore} from 'vuex';

const store = createStore({
    state() {
        return {
            username: '',
            token: '',
        }
    },
    getters: {
        isLogin(state) {
            return state.username !== '';
        },
    },
    mutations: {
        setUsername(state, username) {
            state.username = username;
        },
        setToken(state, token) {
            state.token = token;
        },
        clearUsername(state) {
            state.username = '';
        },
    },
});

export default store