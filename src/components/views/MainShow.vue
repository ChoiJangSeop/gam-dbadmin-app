<script>
export default {

    data() {
        return {
            adminName: "",
        }
    },

    methods: {
        logout() {
            alert("로그아웃 되었습니다");
            this.$store.commit("clearUsername");
            this.$router.push({ path: "/login" });
        },

        goNicknameEditor() {
            this.$router.push({ path: "/nickname-editor" });
        },

        goItemDispensor() {
            this.$router.push({ path: "/item-dispenser" });
        },
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
            <div id="title">GAM DB<br>관리자 페이지</div>
            <img id="profileImage" class="center-item" src="@/assets/img/huni_profile.png">
            <div id="profileName" class="center-item">
                <span id="admin">관리자</span>
                <span id="adminName">{{ this.adminName }}</span>
            </div>
            <div id="buttonGroup" class="row-container">
                <button id="editInfo" class="button-main">정보수정</button>
                <button id="logout" class="button-sub" @click="logout">로그아웃</button>
            </div>
        </div>
        <div id="content" class="col-container">
            <div id="contentTitle"><h2>관리자 기능</h2></div>
            <div class="method-container row-container">
                <div class="method-content">
                    <button class="method-url" @click="goNicknameEditor">유저 닉네임 변경</button>
                    <p>현재의 닉네임과 변경할 닉네임을 입력해 유저의 닉네임을 변경합니다.</p>
                </div>
            </div>

            <div class="method-container row-container">
                <div class="method-content">
                    <button class="method-url" @click="goItemDispensor">아이템 지급</button>
                    <p>아이템을 주고 받을 유저의 닉네임과 아이템을 입력하여 선물함에 아이템을 지급합니다.<br>
                    주는 유저를 입력하지 않을 경우, 관리자의 이름으로 아이템이 지급됩니다.</p>
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

.method-container {
    width: 80%;
    height: 150px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 5%;

    border: 1.5px solid #202026;
    border-radius: 15px;
    
    padding: 15px;

    justify-content: flex-start;
    align-items: center;
}

.method-url {
    font-size: 24px;
    font-weight: bolder;
    color: #0067a3;
    background-color: rgba(0,0,0,0);
    border: 0;
    text-decoration: none;
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

#contentTitle {
    width: 82%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 3%;
}
</style>
