<template>
  <header class="app-global-header"> <div class="header-container">
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
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth.js';

// ----- Props / Emits -----

// ----- Composables -----
const route = useRoute();
const authStore = useAuthStore();
const router = useRouter();

const { isAuthenticated, user } = storeToRefs(authStore);
const { logout } = authStore;

// ----- State -----

// ----- Computed -----
// 설명: 현재 페이지가 로그인(/login) 또는 회원가입(/signup) 페이지인지 판별하는 연산 프로퍼티
const isAuthPage = computed(() => {
  const authPaths = ['/login', '/signup'];
  return authPaths.includes(route.path);
});

// ----- Watchers -----

// ----- Lifecycle Hooks -----

// ----- Methods -----
const handleLogout = () => {
  logout();
  router.push('/');
};
</script>

<style scoped lang="scss">
/* 설명: 외부 공통 레이아웃 스타일 적용을 위해 빈 껍데기 스코프 유지 */
@import '@/assets/css/layout.scss';
</style>
