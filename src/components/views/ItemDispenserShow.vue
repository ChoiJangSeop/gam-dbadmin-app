<script>
import { BIconArrowRightSquare, BIconCheckSquare, BIconArrowLeftSquareFill } from 'bootstrap-icons-vue';
export default {

    components: { BIconArrowRightSquare, BIconCheckSquare, BIconArrowLeftSquareFill },
    
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
            giftNum: 0,     // 입력한 선물개수
            memo: "",   // 메모

            adminName: "",
        }
    },

    methods: {
        async getSendUser() {

            if (this.inputSendUser === "" || this.inputSendUser === "system") {
                this.sendUser = {
                    nickname: "삐에로",
                };
                this.isConfirmSendUser = true;
                this.inputSendUser = "보내는 유저 : 삐에로";
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
                idx: this.giftNum++,
                sendUser: this.sendUser,
                receiveUser: this.receiveUser,
                expireDate: this.expireDate,
                item: null,
            }
            gift.item = item;

            this.itemList.push(gift);
        },

        removeGift(idx) {
            this.itemList = this.itemList.filter(item => item.idx !== idx);
        },

        initGiftList() {
            this.itemList = [];
        },

        itemDispense() {

            this.itemList.forEach(gift => {
                const dto = {
                    sendUserNickname: gift.sendUser.nickname,
                    receiveUserNickname: gift.receiveUser.nickname,
                    giftItemName: gift.item.name,
                    memo: this.memo,
                    sendDate: new Date(),
                    expireDate: gift.expireDate
                };

                this.$axios.post(`/gifts`, dto);
            });

            alert("아이템이 모두 지급되었습니다!");

            this.itemList = [];
            this.giftNum = 0;
        },

        goMainPage() {
            this.$router.push({ path: "/" });
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
    },

    mounted() {

        if (!this.$store.getters.isLogin) {
            alert("로그인이 필요합니다");
            this.$router.push({ path: "/login"});
        }

        if (!this.$store.getters.isAllowed) {
            alert("해당 페이지에 접근 권한이 없습니다.\n 권한을 허용하려면 책임자에게 요청하세요.");
            this.$router.push({ path: "/" });
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
        <div id="content" class="row-container">
            <div class="col-container">
                <form v-if="!isConfirmSendUser" id="senderInput" class="input-group row-container" v-on:submit.prevent="getSendUser">
                    <BIconCheckSquare class="check-square" style="color: gray;"/>
                    <input class="nickname-input" type="text" placeholder="보내는 유저" v-model="inputSendUser">
                    <button class="button-sub-sm" type="submit">조회</button>
                </form>
                <div v-else id="senderInput" class="input-group row-container">
                    <BIconCheckSquare class="check-square"/>
                    <input class="nickname-input confirm" type="text" placeholder="보내는 유저" v-model="inputSendUser" disabled>
                    <button class="button-sub-sm" @click="sendUserCancel">수정</button>
                </div>
                <form v-if="!isConfirmReceiveUser" id="receiverInput" class="input-group row-container" v-on:submit.prevent="getReceiveUser">
                    <BIconCheckSquare class="check-square" style="color: gray;"/>
                    <input class="nickname-input" type="text" placeholder="받는 유저" v-model="inputReceiveUser">
                    <button class="button-sub-sm" type="submit">조회</button>
                </form>
                <div v-else id="receiverInput" class="input-group row-container">
                    <BIconCheckSquare class="check-square"/>
                    <input class="nickname-input confirm" type="text" placeholder="받는 유저" v-model="inputReceiveUser" disabled>
                    <button class="button-sub-sm" @click="receiveUserCancel">수정</button>
                </div>
                <form v-if="!isConfirmExpireDate" id="expireDateInput" class="row-container" v-on:submit.prevent="confirmExpireDate">
                    <BIconCheckSquare class="check-square" style="color: gray;"/>
                    <select class="nickname-input" v-model="keepingDay">
                        <option value="">만료 일</option>
                        <option value="direct">직접입력</option>
                        <option value="7">1주후(7일)</option>
                        <option value="14" selected>2주후(14일)</option>
                        <option value="30">1달후(30일)</option>
                        <option value="365">1년후(365일)</option>
                    </select>
                    <button class="button-main-sm" type="submit">확인</button>
                </form>
                <div v-else id="expireDateInput" class="row-container">
                    <BIconCheckSquare class="check-square"/>
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
                <div v-if="!isConfirmExpireDate" id="expireDate">
                    예상 만료일 : {{ expireDate.getFullYear() }}년 {{ expireDate.getMonth()+1 }}월 {{ expireDate.getDate() }}일
                </div>
                <div v-else id="expireDate" class="confirm" style="color: white;">
                    만료일 : {{ expireDate.getFullYear() }}년 {{ expireDate.getMonth()+1 }}월 {{ expireDate.getDate() }}일
                </div>
                <textarea id="memo" v-model="memo" placeholder="메모를 작성하세요."></textarea>
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
                        <div v-for="item in itemList" :key="item.idx" id="giftList">
                            <button class="giftCancelButton" @click="removeGift(item.idx)">-</button>[{{ item.sendUser.nickname }}] -> [{{ item.receiveUser.nickname }}] : {{ item.item.name }}
                        </div>
                    </div>
                    <div class="col-container">
                        <button id="dispenseButton" class="button-sub-sm" @click="itemDispense">지급</button>
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
    width: 410px;
    height: 30px;

    text-align: left;
    font-size: 15px;
}

.check-square {
    width: 40px;
    height: 40px;
    margin-top: auto;
    margin-bottom: auto;
    margin-right: 10px;
    color: green;
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
    color:white;
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
    width: 410px;
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
    margin-left: 60px;
}

#giftList {
    color: white;
    overflow-y: scroll;
    margin-bottom: 3px;
}

#memo {
    margin-top: 70px;
    height: 230px;
    font-size: 16px;
    padding: 10px;
    background-color: #202026;
    color: white;
}

.giftCancelButton {
    margin-right:5px;
}
</style>