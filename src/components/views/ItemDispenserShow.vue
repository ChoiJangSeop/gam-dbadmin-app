<script>
import { BIconArrowRightSquare } from 'bootstrap-icons-vue';
export default {

    components: { BIconArrowRightSquare },
    
    data() {
        return {
            sendUser: null,
            receiveUser: null,

            inputSendUser: "",
            inputReceiveUser: "",

            isConfirmSendUser: false,
            isConfirmReceiveUser: false,

            keepingDay: -1,      // 유지기간
            expireDate: new Date(),   // 만료일
            isDirectInput: false,   // 직접입력여부
            isConfirmExpireDate: false,

            searchItemKeyword: "", // 검색어
            resultItems : [],   // 검색된 아이템들  

            itemList: [],   // 지급할 아이템

        }
    },

    methods: {
        async getSendUser() {

            if (this.inputSendUser === "" || this.inputSendUser === "system") {
                this.sendUser = {
                    nickname: "system",
                };
                this.isConfirmSendUser = true;
                this.inputSendUser = "보내는 유저 : system";
                return;
            }


            const res = await this.$axios.get(`/userinfo/nickname/${this.inputSendUser}`);
            const findUser = res.data;

            if (findUser.id !== undefined) {
                this.sendUser = findUser;
                this.inputSendUser = `보내는 유저 : ${this.sendUser.nickname}`;
                this.isConfirmSendUser = true;
            } else {
                alert("존재하지 않는 유저입니다.");
            }
        },

        async getReceiveUser() {
            const res = await this.$axios.get(`/userinfo/nickname/${this.inputReceiveUser}`);
            const findUser = res.data;

            if (findUser.id !== undefined) {
                this.receiveUser = findUser; 
                this.inputReceiveUser = `받는 유저 : ${this.receiveUser.nickname}`;  
                this.isConfirmReceiveUser = true; 
            } else {
                alert("존재하지 않는 유저입니다.");
            }
        },

        sendUserCancel() {
            this.inputSendUser = this.sendUser.nickname;
            this.sendUser = null;
            this.isConfirmSendUser = false;
        },

        receiveUserCancel() {
            this.inputReceiveUser = this.receiveUser.nickname;
            this.receiveUser = null;
            this.isConfirmReceiveUser = false;
        },

        confirmExpireDate() {
            this.isConfirmExpireDate = true;
        },

        cancelExpireDate() {
            this.isConfirmExpireDate = false;
        },

        async searchItem() {

            if (this.searchItemKeyword.length < 2) {
                alert("두글자이상 입력해주세요.");
                return;
            }

            const res = await this.$axios.get(`/items/search/${this.searchItemKeyword}`);

            if (res.data._embedded === undefined) {
                this.resultItems = [];
            } else {
                this.resultItems = res.data._embedded.itemDtoList;
            }
        },
        
        addGift(item) {

            if (!this.isConfirmSendUser || !this.isConfirmReceiveUser || !this.isConfirmExpireDate) {
                alert("보내는 유저, 받는 유저, 만료일을 모두 입력해야 지급이 가능합니다.");
                return;
            }

            const gift = {
                sendUser: this.sendUser,
                receiveUser: this.receiveUser,
                expireDate: this.expireDate,
                item: null,
            }
            gift.item = item;

            this.itemList.push(gift);
        },

        initGiftList() {
            this.itemList = [];
        }
    },

    watch: {
        keepingDay() {
            if (this.keepingDay === "direct") {
                this.isDirectInput = true;
                return;
            }

            this.isDirectInput = false;
            this.keepingDay = parseInt(this.keepingDay);
            if (this.keepingDay === -1) { this.expireDate = ""; }
            else {
                this.expireDate = new Date();
                this.expireDate.setDate(this.expireDate.getDate() + this.keepingDay);
            }
        }
    }

    
}
</script>

<template>
    <div id="mainPage" class="row-container">
        <div id="userInfo" class="col-container">
            <div id="title">GAM DB<br>관리자 페이지</div>
            <img id="profileImage" class="center-item" src="@/assets/img/huni_profile.png">
            <div id="profileName" class="center-item">
                <span id="admin">관리자</span>
                <span id="adminName">관리자이름</span>
            </div>
            <div id="buttonGroup" class="row-container">
                <button id="editInfo" class="button-main">정보수정</button>
                <button id="logout" class="button-sub">로그아웃</button>
            </div>
        </div>
        <div id="content" class="row-container">
            <div class="col-container">
                <form v-if="!isConfirmSendUser" id="senderInput" class="input-group row-container" v-on:submit.prevent="getSendUser">
                    <input class="nickname-input" type="text" placeholder="보내는 유저" v-model="inputSendUser">
                    <button class="button-sub-sm" type="submit">조회</button>
                </form>
                <div v-else id="senderInput" class="input-group row-container">
                    <input class="nickname-input confirm" type="text" placeholder="보내는 유저" v-model="inputSendUser" disabled>
                    <button class="button-sub-sm" @click="sendUserCancel">수정</button>
                </div>
                <form v-if="!isConfirmReceiveUser" id="receiverInput" class="input-group row-container" v-on:submit.prevent="getReceiveUser">
                    <input class="nickname-input" type="text" placeholder="받는 유저" v-model="inputReceiveUser">
                    <button class="button-sub-sm" type="submit">조회</button>
                </form>
                <div v-else id="receiverInput" class="input-group row-container">
                    <input class="nickname-input confirm" type="text" placeholder="받는 유저" v-model="inputReceiveUser" disabled>
                    <button class="button-sub-sm" @click="receiveUserCancel">수정</button>
                </div>
                <form v-if="!isConfirmExpireDate" id="expireDateInput" class="row-container" v-on:submit.prevent="confirmExpireDate">
                    <select class="nickname-input" v-model="keepingDay">
                        <option value="">만료 일</option>
                        <option value="direct">직접입력</option>
                        <option value="7">1주후(7일)</option>
                        <option value="14">2주후(14일)</option>
                        <option value="30">1달후(30일)</option>
                        <option value="365">1년후(365일)</option>
                    </select>
                    <button class="button-main-sm" type="submit">확인</button>
                </form>
                <div v-else id="expireDateInput" class="row-container">
                    <select class="nickname-input" v-model="keepingDay" disabled>
                        <option value="">만료 일</option>
                        <option value="direct">직접입력</option>
                        <option value="7">1주후(7일)</option>
                        <option value="14">2주후(14일)</option>
                        <option value="30">1달후(30일)</option>
                        <option value="365">1년후(365일)</option>
                    </select>
                    <button class="button-main-sm" @click="cancelExpireDate">수정</button>
                </div>
                <div v-if="isDirectInput && !isConfirmExpireDate">
                    <input class="nickname-input" type="date" style="margin-top: 10px; height: 20px;" v-model="expireDate">
                </div>
                <div v-if="!isConfirmExpireDate" id="expireDate">
                    예상 만료일 : {{ expireDate.getFullYear() }}년 {{ expireDate.getMonth()+1 }}월 {{ expireDate.getDate() }}일
                </div>
                <div v-else id="expireDate" class="confirm" style="color: white;">
                    만료일 : {{ expireDate.getFullYear() }}년 {{ expireDate.getMonth()+1 }}월 {{ expireDate.getDate() }}일
                </div>
                
            </div>
            <div id="itemInfo" class="col-container">
                <form id="itemInput" class="input-group row-container" v-on:submit.prevent="searchItem">
                    <input id="itemSearch" class="nickname-input" type="text" placeholder="아이템 검색" v-model="searchItemKeyword">
                    <button type="submit" class="button-sub-sm">검색</button>
                </form>
                <div id="itemDispense" class="input-group row-container">
                    <div id="itemList" class="nickname-input">
                        <button v-for="item in resultItems" :key="item.id" class="item-button" @click="addGift(item)">
                            {{ item.name }}
                        </button>
                    </div>
                    <button class="button-main-sm" style="visibility: hidden;"></button>
                </div>
                <div id="itemDispense" class="input-group row-container" style="margin-top: 100px;">
                    <div id="itemList" class="nickname-input" style="background-color:#202026; padding: 10px;">
                        <div v-for="item in itemList" :key="item.id" id="giftList">
                            [{{ item.sendUser.nickname }}] -> [{{ item.receiveUser.nickname }}] : {{ item.item.name }}
                        </div>
                    </div>
                    <div class="col-container">
                        <button id="dispenseButton" class="button-sub-sm">지급</button>
                        <button class="button-sub-sm" @click="initGiftList">초기화</button>

                    </div>
                </div>
            </div>
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
    width: 200px;
    height: 40px;
    margin-right: 20px;
    background-color: #f7f7f7;
    border: 1px solid #f7f7f7;
    border-radius: 5px;
    padding: 2px;
    padding-left: 10px;
}

.confirm {
    font-weight: bold;
    color: #17171b;
}
.alert {
    width: 370px;
    height: 20px;
    margin-top: 10px;
    margin-bottom: 15px;
    padding-left: 10px;
}

.item-button {
    width: 390px;
    height: 30px;

    text-align: left;
    font-size: 15px;
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

#senderInput {
    margin-bottom: 50px;
}

#expireDateInput {
    margin-top: 150px;
}

#itemInfo {
    margin-left: 50px;
}

#itemInput {
    margin-bottom: 50px;
}

#itemSearch {
    width: 400px;
}

#itemList {
    width: 390px;
    height: 230px;
    padding: 0;
    color: black;
    overflow-y: scroll;
}

#dispenseButton {
    background-color: red;
    border: red;
    margin-bottom: 10px;
}

#expireDate {
    margin-top: 10px;
    margin-right: 20px;
    margin-left: 10px;
}

#giftList {
    color: white;
    overflow-y: scroll;
}
</style>