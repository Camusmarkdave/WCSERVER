import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import StudentForm from '../pages/StudentForm.vue';
import AdminForm from '../pages/AdminForm.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/studentForm', component: StudentForm },
  { path: '/adminForm', component: AdminForm }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
