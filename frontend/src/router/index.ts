import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import AdminForm from "../pages/AdminForm.vue";
import StudentForm from "../pages/StudentForm.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/admin", component: AdminForm },
  { path: "/student", component: StudentForm },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
