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
        validateAccount() {

            let currUser = this.users.filter(user => user.id === this.inputId);

            if (currUser.length === 0) {
                this.msg = "존재 하지 않는 아이디 입니다.";
                this.inputId = "";
                this.inputPwd =  "";
            }

            else if (currUser[0].pwd !== this.inputPwd) {
                this.msg = "비밀번호를 잘못 입력했습니다.";
                this.inputPwd = "";
            }

            else {

            }
        }
    }
    
}
</script>

<template>
    <div id="loginPage" class="col-container">
        <div id="title" class="main-text">GAM DB 관리자 페이지</div>
        <div id="versionInfo" class="main-text">버전 1.0.0</div>
        <div id="input-admin-info" class="row-container">
            <input id="idInput" class="input-block" type="text" v-model="inputId" placeholder="아이디">
            <input id="pwInput" class="input-block" type="password" v-model="inputPwd" placeholder="패스워드">
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
    margin-right: 20px;
    margin-top: 100px;
    background-color: #f7f7f7;
    border: 1px solid #f7f7f7;
    border-radius: 5px;
    padding: 2px;
    padding-left: 10px;
}

#pwInput {
    margin-top: 100px;
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
    width: 630px;
    margin-top: 20px;
    color: red;
}

</style>