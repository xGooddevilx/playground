
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: ()=>import('@/views/HomeView.vue'),
    },
    {
      path:'/projects',
      name:"Projects",
      component: ()=>import('@/views/ProjectsView.vue')
    },
    {
      path:'/projects/:id',
      name:"Project Page",
      component: ()=>import('@/views/ProjectDetailsView.vue')
    }
  ],
})

export default router
