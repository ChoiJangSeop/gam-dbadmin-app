<script>
import { BIconExclamationCircle, BIconCheckSquare, BIconArrowDownCircleFill } from 'bootstrap-icons-vue';
import ApiController from '../../api/ApiController.js';
export default {

    components: { BIconExclamationCircle, BIconCheckSquare, BIconArrowDownCircleFill },

    data() {
        return {

            newAdmin: {
                account: "",
                password: "",
                name: "",
            },

            inputAccount: "",
            inputPwd: "",
            inputRePwd: "",
            inputName: "",

            isValidateAccount: false,
            isValidatePwd: false,
            isValidateRePwd: false,
            
        }
    },

    methods: {

        async validateAccountDupliate() {

            if (this.inputAccount.length < 6) {
                alert("아이디는 6자 이상이야 합니다.");
                return;
            }

            const res = await this.$axios.get(`/admin/${this.inputAccount}`);
            console.log(res.data.id);
            if (res.data.id === null) {
                alert("사용 가능한 아이디입니다.");
                this.isValidateAccount = true;
            } else {
                alert("이미 사용 중인 아이디입니다");
                this.isValidateAccount = false;
            }
        },

        editInputAccount() {
            this.isValidateAccount = false;
        },

        async signup() {
            this.newAdmin = {
                account: this.inputAccount,
                password: this.inputPwd,
                name: this.inputName,
            };

            if (this.isValidateAccount && this.isValidatePwd && this.isValidateRePwd) {
                await this.$axios.post(`/register`, this.newAdmin);
                alert("가입을 축하합니다!, 다시 로그인해주세요");
                this.$router.push({ path: "/login" });

            } else {
                alert("회원 정보를 모두 올바르게 입력해야 회원가입이 가능합니다.");
            }
        }
        
    },

    watch: {
        inputPwd() {

            if (this.inputPwd.length > 7) {
                this.isValidatePwd = true;
            } else {
                this.isValidatePwd = false;
            }

        },

        inputRePwd() {
            if (this.isValidatePwd && this.inputPwd === this.inputRePwd) {
                this.isValidateRePwd = true;
            } else {
                this.isValidateRePwd = false;
            }
        }
    }
    
}
</script>

<template>
    <div id="mainPage" class="row-container">
        <div id="content" class="col-container">

        <div id="title" class="main-text">회원가입</div>
            <form v-if="!isValidateAccount" id="userNicknameInput" class="input-group row-container" v-on:submit.prevent="validateAccountDupliate">
                <BIconCheckSquare class="check-square" style="color: gray;"/>
                <input class="nickname-input" type="text" placeholder="새로운 아이디 (6자이상)" v-model="inputAccount">
                <button class="button-sub-sm" type="submit">조회</button>
            </form>
            <div v-else id="userNicknameInput" class="input-group row-container">
                <BIconCheckSquare class="check-square"/>
                <input class="nickname-input disabled" type="text" v-model="inputAccount" disabled>
                <button class="button-sub-sm" @click="editInputAccount">수정</button>
            </div>

            <form class="input-group row-container">
                <BIconCheckSquare v-if="!isValidatePwd" class="check-square" style="color: gray;"/>
                <BIconCheckSquare v-else class="check-square" />
                <input class="nickname-input" type="password" placeholder="비밀번호 (8자이상)" v-model="inputPwd">
                <div class="button-sub-sm-empty"></div>
            </form>
            <div class="input-group row-container">
                <BIconCheckSquare v-if="!isValidateRePwd" class="check-square" style="color: gray;"/>
                <BIconCheckSquare v-else class="check-square"/>
                <input class="nickname-input" type="password" placeholder="비밀번호 재입력" v-model="inputRePwd">
                <div class="button-sub-sm-empty"></div>
            </div>

            <div class="input-group row-container">
                <div class="check-square"></div>
                <input class="nickname-input" type="text" placeholder="이름(별명, 2자이상 한글가능)" v-model="inputName">
                <div class="button-sub-sm-empty"></div>
            </div>

            <button id="nicknameEditButton" class="button-main-lg center-item" @click="signup">회원가입</button>
        </div>
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

.center-item {
    margin-left: auto;
    margin-right: auto;
}

.button-main {
    width: 150px;
    height: 40px;
    color: white;
    background-color: #0067a3;
    border: 1px solid #0067a3;
    border-radius: 5px;
}

.button-sub {
    width: 150px;
    height: 40px;
    color: white;
    background-color: gray;
    border: 1px solid gray;
    border-radius: 5px;
}

.button-main-sm {
    width: 50px;
    height: 40px;
    color: white;
    background-color: #0067a3;
    border: 1px solid #0067a3;
    border-radius: 5px;
}

.button-main-lg {
    width: 300px;
    height: 40px;
    color: white;
    background-color: #0067a3;
    border: 1px solid #0067a3;
    border-radius: 5px;
}

.button-sub-sm {
    width: 50px;
    height: 40px;
    color: white;
    background-color: gray;
    border: 1px solid gray;
    border-radius: 5px;
}

.button-sub-sm-empty {
    width: 50px;
    height: 40px;
}

.nickname-input {
    width: 300px;
    height: 40px;
    margin-right: 20px;
    background-color: #f7f7f7;
    border: 1px solid #f7f7f7;
    border-radius: 5px;
    padding: 2px;
    padding-left: 10px;
}

.check-square {
    width: 40px;
    height: 40px;
    margin-top: auto;
    margin-bottom: auto;
    color: green;
    margin-right: 10px;
}

.alert {
    width: 370px;
    height: 20px;
    margin-top: 10px;
    margin-bottom: 15px;
    padding-left: 10px;
}

.alert-err {
    width: 370px;
    height: 20px;
    margin-top: 10px;
    margin-bottom: 15px;
    padding-left: 10px;

    color: red;
}

.disabled {
    font-weight: bolder;
}

.input-group {
    margin-bottom: 10px;
}

.arrow-down {
    margin-left: auto;
    margin-right: auto;

    color: #0067a3;
    width: 40px;
    height: 40px;
    margin-top: 30px;
    margin-bottom: 40px;
}

#mainPage {
    width: 100%;
    height: 100vh;
    margin: 0;
    margin-top: 0;
}
#userInfo {
    height: 100%;
    width: 30%;
    background-color: #202026;
}

#content {
    width: 70%;

    margin-top: auto;
    margin-bottom: auto;
}

#title {
    width: 100%;
    margin-bottom: 30px;
    text-align: center;
    font-size: 48px;
    font-weight: bold;
    color: white;
}

#profileImage {
    width: 70%;
    margin-top: 10%;
    border-radius: 70%;
    object-fit: cover;
    overflow: hidden;   
}

#profileName {
    margin-top: 5%;
}

#adminName {
    font-size: 38px;
    font-weight: bolder;
    margin-left: 7px;
}

#buttonGroup {
    margin-top: 10%;
}

#editInfo {
    margin-right: 7px;
}
#downArrow {
    height: 40px;
    width: 60px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 15px;
}


#nicknameEditButton {
    margin-top: 30px;
}
</style>