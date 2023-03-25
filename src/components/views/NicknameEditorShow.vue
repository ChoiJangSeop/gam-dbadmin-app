<script>
import { BIconExclamationCircle, BIconCheckSquare, BIconArrowDownCircleFill } from 'bootstrap-icons-vue';
import ApiController from '../../api/ApiController.js';
export default {

    components: { BIconExclamationCircle, BIconCheckSquare, BIconArrowDownCircleFill },

    data() {
        return {
            inputCurrNickname: "",
            inputNewNickname: "",
            currNickname: "",
            newNickname: "",

            isValidateCurrNickname: false,
            isValidateNewNickname: false,
            currNicknameMsg: "",
            newNicknameMsg: "",

            adminName: "",
        }
    },

    methods: {

        async validateCurrNickname() {
            const res = await this.$axios.get(`/userinfo/nickname/${this.inputCurrNickname}`);
            const user = res.data;
            // const res = await ApiController.get(`/userinfo/nikcname/${this.inputCurrNickname}`);
            // const user = res.data;
            console.log(user);

            if (user.id !== undefined) {
                this.isValidateCurrNickname = true;
                this.currNickname = this.inputCurrNickname;
            } else {
                alert("존재하지 않는 유저입니다.");
                this.isValidateCurrNickname = false;
            }
        },

        async validateNewNickname() {
            const res = await this.$axios.get(`/userinfo`);
            console.log(res);
            const users = res.data._embedded.userInfoDtoList;
            console.log(users);

            const space_str = /\s/;
            const special_str = /[~!@#$%^&*()_+|<>?:{}]/;

            if (users.filter(user => user.nickname === this.inputNewNickname).length > 0) {
                alert("이미 존재하는 닉네임입니다.");
                this.isValidateNewNickname = false;
            } else if (this.inputNewNickname.length > 10) {
                alert("닉네임은 10자이하여야 합니다.");
                this.isValidateNewNickname = false;
            } else if (space_str.test(this.inputNewNickname) || special_str.test(this.inputNewNickname)) {
                alert("닉네임은 공백, 특수문자를 포함할 수 없습니다.");
                this.isValidateNewNickname = false;
            } else {
                alert("사용 가능한 닉네임입니다.");
                this.isValidateNewNickname = true;
                this.newNickname = this.inputNewNickname;
            }
        },

        async changeNickname() {
            
            if (!this.isValidateCurrNickname || !this.isValidateNewNickname) {
                alert("기존 닉네임과 새로운 닉네임을 조회하고 변경해주세요");
                return;
            }

            await this.$axios.put(`/userinfo/${this.currNickname}/${this.newNickname}`);
            alert(`닉네임을 변경하였습니다 : [${this.currNickname}] -> [${this.newNickname}]`);

            this.inputCurrNickname = "";
            this.currNickname = "";
            this.currNicknameMsg = "";
            this.isValidateCurrNickname = false;

            this.inputNewNickname = "";
            this.newNickname = "";
            this.newNicknameMsg = "";
            this.isValidateNewNickname = false;

        },

        inputCurrNicknameCancel() {
            this.currNickname = "";
            this.isValidateCurrNickname = false;
            this.currNicknameMsg = "";
        },

        inputNewNicknameCancel() {
            this.newNickname = "";
            this.isValidateNewNickname = false;
            this.newNicknameMsg = "";
        },

        goMainPage() {
            this.$router.push({ path: "/" });
        }
    },

    mounted() {
        if (!this.$store.getters.isLogin) {
            alert("로그인이 필요합니다.");
            this.$router.push({ path: "/login" });
        }

        this.adminName = this.$store.state.username;
    }
    
}
</script>

<template>
    <div id="mainPage" class="row-container">
        <div id="userInfo" class="col-container">
            <button @click="goMainPage()" id="title" style="border: 0;">GAM DB<br>관리자 페이지</button>
            <img id="profileImage" class="center-item" src="@/assets/img/huni_profile.png">
            <div id="profileName" class="center-item">
                <span id="admin">관리자</span>
                <span id="adminName">{{ this.adminName }}</span>
            </div>
            <div id="buttonGroup" class="row-container">
                <button id="editInfo" class="button-main">정보수정</button>
                <button id="logout" class="button-sub">로그아웃</button>
            </div>
        </div>
        <div id="content" class="col-container">
            <form v-if="!isValidateCurrNickname" id="userNicknameInput" class="input-group row-container" v-on:submit.prevent="validateCurrNickname">
                <BIconCheckSquare class="check-square" style="color: gray;"/>
                <input class="nickname-input" type="text" placeholder="유저 닉네임" v-model="inputCurrNickname">
                <button class="button-sub-sm" type="submit">조회</button>
            </form>
            <div v-else id="userNicknameInput" class="input-group row-container">
                <BIconCheckSquare class="check-square"/>
                <input class="nickname-input disabled" type="text" placeholder="유저 닉네임" v-model="currNickname" disabled>
                <button class="button-sub-sm" @click="inputCurrNicknameCancel">수정</button>
            </div>

            <BIconArrowDownCircleFill class="arrow-down"/>
            <form v-if="!isValidateNewNickname" class="input-group row-container" v-on:submit.prevent="validateNewNickname">
                <BIconCheckSquare class="check-square" style="color: gray;"/>
                <input class="nickname-input" type="text" placeholder="변경할 닉네임" v-model="inputNewNickname">
                <button class="button-sub-sm" type="submit">조회</button>
            </form>
            <div v-else class="input-group row-container">
                <BIconCheckSquare class="check-square"/>
                <input class="nickname-input disabled" type="text" placeholder="변경할 닉네임" v-model="newNickname" disabled>
                <button class="button-sub-sm" @click="inputNewNicknameCancel">수정</button>
            </div>

            <button id="nicknameEditButton" class="button-main-lg center-item" @click="changeNickname">닉네임 변경</button>
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
    text-align: center;
    margin-top: 10%;
    font-size: 48px;
    font-weight: bold;
    background-color: #17171b;
    text-decoration-line: none;
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