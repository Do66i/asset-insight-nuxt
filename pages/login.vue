<template>
  <div class="login-page">
    <div class="login-box">
      <h2>📈 Asset Insight</h2>
      <p>서비스 이용을 위해 로그인해 주세요.</p>

      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <input type="text" placeholder="아이디" required />
        </div>
        <div class="input-group">
          <input type="password" placeholder="비밀번호" required />
        </div>
        <button type="submit">로그인</button>
      </form>

      <div class="back-link">
        <NuxtLink to="/">메인으로 돌아가기</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
// ----- Props / Emits -----

// ----- Composables -----
const authStore = useAuthStore();
const router = useRouter(); // 로그인 성공 후 페이지 이동을 위한 라우터
const { login } = authStore;

// ----- State -----
const userId = ref('');

// ----- Computed -----

// ----- Watchers -----

// ----- Lifecycle Hooks -----

// ----- Methods -----
const handleLogin = () => {
  console.log('로그인 시도');
  login({ id: userId.value })

  // 로그인 완료 후 대시보드 메인으로 이동
  router.push('/'); //
};

// ----- Page Meta -----
// 이 페이지는 layouts/default.vue를 적용하지 않고 레이아웃 없이 단독으로 렌더링합니다.
definePageMeta({
  layout: false,
});
</script>

<style scoped lang="scss">

</style>
