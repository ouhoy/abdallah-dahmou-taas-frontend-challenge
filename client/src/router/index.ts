import {createRouter, createWebHistory} from 'vue-router'
import UserAuth from "@/views/UserAuthView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'UserAuth',
            component: UserAuth
        },

    ]
})

export default router
