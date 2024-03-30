import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },
    {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("../views/DashboardView.vue"),
    },
    {
        path: "/users",
        name: "users",
        component: () => import("../views/UsersView.vue"),
    },
    {
        path: "/admin-chat/:user",
        name: "admin-user-chat",
        component: () => import("../views/UserChatView.vue"),
    },
    {
        path: "/admin-chat",
        name: "admin-chat",
        component: () => import("../views/AdminView.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
