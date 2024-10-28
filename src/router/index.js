import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '../views/AuthViews.vue'
import Dashboard from '@/views/DashboardViews.vue'
import { auth } from '../firebase.js'
import { onAuthStateChanged } from 'firebase/auth'



const requireAuth = (to, from, next) => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    unsubscribe()
    if (user) {
      next()
    } else {
      next('/auth')
    }

  })
}


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      beforeEnter: requireAuth
    },
    {
      path: '/auth',
      name: 'Auth',
      component: AuthView,
      //beforeEnter: requireAuth
    },
    {
      path: '/transaction',
      name: 'AddTransaction',
      component:  () => import('../views/AddTransactionView.vue'),
      beforeEnter: requireAuth
    }
  ]
})

export default router
