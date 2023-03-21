<script>
import { BIconExclamationCircle } from 'bootstrap-icons-vue';
export default {

    components: { BIconExclamationCircle },

    data() {
        return {
            users: [
                {
                    id: "huni",
                    pwd: "huni",
                    name: "기여운명후니",
                },
            ],

            inputId: "",
            inputPwd: "",
            msg : "",
        }
    },

    methods: {
        async validateAccount() {

            let currUser = this.users.filter(user => user.id === this.inputId);

            try { 
                const res = await this.$axios.post(`/login`, {
                    account: this.inputId,
                    password: this.inputPwd,
                });

                this.$store.commit('setUsername', res.data.name);
                this.$store.commit('setToken', res.data.token);
                this.$router.push('/');
                


            } catch (ex) {
                if (ex.response && ex.response.status === 401) {
                    alert("로그인에 실패하였습니다");
                } else {
                    console.log(ex);
                    alert("로그인 인증 중 예상치 못한 문제가 발생하였습니다.\n같은 문제가 반복시 개발자에게 문의하세요");
                }
            }
        }
    }
    
}
</script>

<template>
    <div id="loginPage" class="col-container">
        <div id="title" class="main-text">GAM DB 관리자 페이지</div>
        <div id="versionInfo" class="main-text">버전 1.0.0</div>
        <div id="input-admin-info" class="col-container">
            <input id="idInput" class="input-block main-text" type="text" v-model="inputId" placeholder="아이디">
            <input id="pwInput" class="input-block main-text" type="password" v-model="inputPwd" placeholder="패스워드">
        </div>
        <div id="message" class="main-text"><BIconExclamationCircle v-if="msg !== ''"/> {{ msg }}</div>
        <button id="loginButton" class="main-text" @click="validateAccount()">로그인</button>
    </div>
</template>

<style scoped>
.col-container {
    display: flex;
    flex-direction: column;
}

.row-container {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
}

.main-text {
    margin-left: auto;
    margin-right: auto;
}

.input-block {
    width: 300px;
    height: 40px;
}

#loginPage {
    /* height: 300px; */
    /* 수직정렬 */
}

#title {
    font-size: 56px;
    font-weight: bold;
}

#versionInfo {
    font-size: 20px;
    font-weight: bold;;
    margin-top: 20px;
}

#idInput {
    margin-top: 100px;
    background-color: #f7f7f7;
    border: 1px solid #f7f7f7;
    border-radius: 5px;
    padding: 2px;
    padding-left: 10px;
}

#pwInput {
    margin-top: 20px;
    background-color: #f7f7f7;
    border: 1px solid #f7f7f7;
    border-radius: 5px;
    padding-left: 10px;
}

#loginButton {
    width: 200px;
    height: 30px;
    color: white;
    background-color: #0067a3;
    border: 1px solid #0067a3;
    border-radius: 5px;
    margin-top: 20px;
    
}

#message {
    width: 300px;
    margin-top: 20px;
    color: red;
}

</style>