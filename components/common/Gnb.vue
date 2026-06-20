<template>
  <header class="app-global-header">
    <div class="header-container">
      <NuxtLink to="/" class="header-logo">
        📈 여왕개미를 향하여 ...
      </NuxtLink>

      <nav v-if="!isAuthPage" class="header-nav">
        <NuxtLink
          to="/"
          :class="{ 'active': route.path === '/' }"
          class="nav-item"
        >
          홈
        </NuxtLink>
        <NuxtLink
          to="/portfolio"
          :class="{ 'active': route.path === '/portfolio' }"
          class="nav-item"
        >
          포트폴리오
        </NuxtLink>
        <NuxtLink
          to="/board"
          :class="{ 'active': route.path.startsWith('/board') }"
          class="nav-item"
        >
          게시판
        </NuxtLink>

        <div class="login-menu-zone">
          <div v-if="isAuthenticated" class="user-status-box">
            <span class="user-name-tag">{{ user?.nickname }}님</span>
            <button class="logout-action-btn" @click="handleLogout">로그아웃</button>
          </div>

          <NuxtLink
            v-else-if="route.path !== '/login'"
            to="/login"
            class="nav-item login-link"
          >
            로그인
          </NuxtLink>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth.js';

// ----- Props / Emits -----

// ----- Composables -----
const route = useRoute(); //
const authStore = useAuthStore(); //
const router = useRouter(); //

const { isAuthenticated, user } = storeToRefs(authStore); //
const { logout } = authStore; //

// ----- State -----

// ----- Computed -----
const isAuthPage = computed(() => {
  const authPaths = ['/login', '/signup']; //
  return authPaths.includes(route.path); //
});

// ----- Watchers -----

// ----- Lifecycle Hooks -----

// ----- Methods -----
const handleLogout = () => {
  logout(); //
  router.push('/'); //
};
</script>

<style scoped lang="scss">
</style>
