import { createRouter, createWebHistory } from 'vue-router'
import LoginShow from '@/components/views/LoginShow.vue';
import MainShow from '@/components/views/MainShow.vue';
import NicknameEditorShow from '@/components/views/NicknameEditorShow.vue';
import ItemDispenserShow from '@/components/views/ItemDispenserShow.vue';
import SignUpShow from '@/components/views/SignUpShow.vue';
import ApproveAdminShow from '@/components/views/ApproveAdminShow.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', name: "login", component: LoginShow },
    { path: '/', name:'home', component: MainShow },
    { path: '/nickname-editor', name:"nicknameEdit", component: NicknameEditorShow },
    { path: '/item-dispenser', name:"itemDispenser", component: ItemDispenserShow },
    { path: '/signup', name:"Signup", component: SignUpShow },
    { path: '/approve', name: "ApproveAdmin", component: ApproveAdminShow },
  ]
})

export default router
