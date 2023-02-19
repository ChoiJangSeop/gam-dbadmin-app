<script>
export default {
    
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
                <div id="senderInput" class="input-group row-container">
                    <input class="nickname-input" type="text" placeholder="보내는 유저">
                    <button class="button-sub-sm">조회</button>
                </div>
                <div id="receiverInput" class="input-group row-container">
                    <input class="nickname-input" type="text" placeholder="받는 유저">
                    <button class="button-sub-sm">조회</button>
                </div>
                <div id="expireDateInput" class="row-container">
                    <select class="nickname-input">
                        <option value="">만료 일</option>
                        <option value="">직접입력</option>
                        <option value="">1주후</option>
                        <option value="">2주후</option>
                        <option value="">1달후</option>
                        <option value="">1년후</option>
                    </select>
                    <button class="button-main-sm">확인</button>
                </div>
            </div>
            <div id="itemInfo" class="col-container">
                <div id="itemInput" class="input-group row-container">
                    <input id="itemSearch" class="nickname-input" type="text" placeholder="아이템 검색">
                    <button class="button-main-sm">+</button>
                </div>
                <div id="itemDispense" class="input-group row-container">
                    <div id="itemList" class="nickname-input" type="text" placeholder="보내는 유저"></div>
                    <button id="dispenseButton" class="button-sub-sm">지급</button>
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

.alert {
    width: 370px;
    height: 20px;
    margin-top: 10px;
    margin-bottom: 15px;
    padding-left: 10px;
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
}

#dispenseButton {
    background-color: red;
    border: red;
}
</style>