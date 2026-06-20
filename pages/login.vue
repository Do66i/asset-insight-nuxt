<template>
  <div class="login-page">
    <div class="login-box">
      <h2>📈 Asset Insight</h2>
      <p>서비스 이용을 위해 로그인해 주세요.</p>

      <form @submit.prevent="handleLogin" novalidate>
        <div class="form-fields-wrapper">
          <common-base-input
            v-model="form.username"
            type="text"
            placeholder="아이디를 입력해줘 (doto)"
            :error-message="errors.username"
            @input="errors.username = ''"
          />
          <common-base-input
            v-model="form.password"
            type="password"
            placeholder="비밀번호를 입력해줘 (1234)"
            :error-message="errors.password"
            @input="errors.password = ''"
          />
        </div>

        <p v-if="globalError" class="global-error-msg">{{ globalError }}</p>

        <button type="submit">로그인</button>
      </form>

      <div class="back-link">
        <NuxtLink to="/">메인으로 돌아가기</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useAuthStore } from '@/stores/auth.js';

// ----- Props / Emits -----

// ----- Composables -----
const authStore = useAuthStore();
const router = useRouter();

// ----- State -----
const form = reactive({
  username: '',
  password: '',
});

const errors = reactive({
  username: '',
  password: '',
});

const globalError = ref('');

// ----- Computed -----

// ----- Watchers -----

// ----- Lifecycle Hooks -----

// ----- Methods -----
const validateForm = () => {
  let isValid = true;
  if (!form.username.trim()) {
    errors.username = '아이디를 입력해 주세요.';
    isValid = false;
  }
  if (!form.password.trim()) {
    errors.password = '비밀번호를 입력해 주세요.';
    isValid = false;
  }
  return isValid;
};

const handleLogin = () => {
  if (!validateForm()) {
    return;
  }

  const success = authStore.login({
    username: form.username,
    password: form.password,
  });

  if (success) {
    globalError.value = '';
    router.push('/');
  } else {
    globalError.value = '아이디 또는 비밀번호가 일치하지 않아!';
  }
};

// ----- Page Meta -----
definePageMeta({
  layout: false,
});
</script>

<style scoped lang="scss">
</style>
