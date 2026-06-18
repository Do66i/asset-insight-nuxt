<template>
  <nav>
    <ul>
      <li>
        <NuxtLink to="/">home</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/portfolio">포트폴리오(임시)</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/board">인사이트 게시판 (임시)</NuxtLink>
      </li>
      <li class="login-menu">
        <div v-if="isLoggedIn" class="user-status">
          <span>{{ userNickname }}님 </span>
          <button @click="handleLogout">로그아웃</button>
        </div>
        <NuxtLink v-else to="/login">로그인</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';
// ----- Props / Emits -----

// ----- Composables -----
const authStore = useAuthStore();
// State와 Getters는 반응성을 지키기 위해 storeToRefs 사용
const { isLoggedIn, userNickname } = storeToRefs(authStore);
const { logout } = authStore;
// ----- State -----

// ----- Computed -----

// ----- Watchers -----

// ----- Lifecycle Hooks -----

// ----- Methods -----
const handleLogout = () => {
  logout();
}
</script>
<style scoped lang="scss">
</style>
