<script>
export default {

    data() {
        return {
            adminName: "",
            waitAdmins: [],
        }
    },

    methods: {
        logout() {
            alert("로그아웃 되었습니다");
            this.$store.commit("clearUsername");
            this.$router.push({ path: "/login" });
        },

        goMainPage() {
            this.$router.push({ path: "/" });
        },

        async approveAdmin(admin) {
            const res = await this.$axios.put(`/admin/${admin.account}/allow`);
            alert(`${admin.name}의 권한이 승인되었습니다`);
            this.waitAdmins = this.waitAdmins.filter(a => a.account !== admin.account);
        }

    },

    async mounted() {
        
        if (!this.$store.getters.isLogin) {
            alert("로그인이 필요합니다.");
            this.$router.push({ path: "/login" });
        }

        if (this.$store.state.status !== "MASTER") {
            alert("해당 페이지에 접근 권한이 없습니다.");
            this.$router.push({ paht: "/" });
        }

        this.adminName = this.$store.state.username;

        const res = await this.$axios.get(`/admin`);
        this.waitAdmins = res.data._embedded.signResponseList;
        this.waitAdmins = this.waitAdmins.filter(admin => admin.status === "NOT_ALLOWED");       
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
            <div class="row-container">
                <button id="backButton" @click="goMainPage()">뒤로가기</button>
            </div>
        </div>
        <div id="content" class="col-container">
            <div v-for="admin in waitAdmins" :key="admin.account" class="method-container row-container">
                <div class="method-content row-container">
                    <div class="method-url" @click="goItemDispensor">{{ admin.name }}</div>
                    <p style="width: 650px;">{{ admin.account }}</p>
                    <button id="approveButton" class="button-main" @click="approveAdmin(admin)">승인</button>
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
    height: 50px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 2%;

    border: 1.5px solid white;
    border-radius: 15px;
    
    padding: 15px;

    justify-content: flex-start;
    align-items: center;
}

.method-url {
    width: 150px;
    font-size: 24px;
    margin-top: auto;
    margin-bottom: auto;
    font-weight: bolder;
    color: white;
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

#backButton {
    width: 307px;
    height: 40px;
    color: white;
    background-color: gray;
    border: 1px solid gray;
    border-radius: 5px;
    margin-top: 10px;
}

#approveButton {
    width: 60px;
    margin-top: auto;
    margin-bottom: auto;
}
</style>
