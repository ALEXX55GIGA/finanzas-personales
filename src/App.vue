<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { auth } from './firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const isAuthenticated = ref(false)
const router = useRouter()

onAuthStateChanged(auth, (user) => {
  isAuthenticated.value = !!user
})

const logout = async () => {
  await signOut(auth)
  isAuthenticated.value = false
  router.push('/auth')
}
</script>

<template>
  <header>
    <nav v-if="isAuthenticated" class="navbar">
      <RouterLink to="/" class="nav-link">Dashboard</RouterLink>
      <RouterLink to="/transaction" class="nav-link">Add Transaction</RouterLink>
      <button @click="logout" class="logout-btn">Logout</button>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>

.navbar {
  display: flex;
  justify-content: center;
  gap: 2rem;
  align-items: center;
  padding: 1rem;
  background: linear-gradient(135deg, #f0f5fa, #e0ebf5); 
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}


.nav-link {
  color: #1d3557; 
  text-decoration: none;
  font-size: 1.4rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: #a8dadc; 
}


.logout-btn {
  background-color: #88149f; 
  color: #1d3557;
  font-size: 1.4rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.logout-btn:hover {
  background-color: #457b9d; 
}


main {
  text-align: center;
  margin-top: 3rem;
}


@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    gap: 1rem;
  }

  .nav-link, .logout-btn {
    width: 100%;
    text-align: center;
  }
}
</style>
