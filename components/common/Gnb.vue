<template>
  <header class="app-global-header"> <div class="header-container">
    <NuxtLink to="/" class="header-logo">
      📈 여왕개미를 향하여 ...
    </NuxtLink>

    <nav class="header-nav">
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
          v-else
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
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth.js';

// ----- Props / Emits -----

// ----- Composables -----
const route = useRoute();
const authStore = useAuthStore();
const router = useRouter();

// 설명: Pinia auth 스토어에 실제 등록된 상태 및 게터 매핑 매칭
const { isAuthenticated, user } = storeToRefs(authStore);
const { logout } = authStore;

// ----- State -----

// ----- Computed -----

// ----- Watchers -----

// ----- Lifecycle Hooks -----

// ----- Methods -----
// 설명: 로그아웃 처리 후 안전하게 게스트 홈 페이지로 강제 다이렉팅
const handleLogout = () => {
  logout();
  router.push('/');
};
</script>

<style scoped lang="scss">
</style>
