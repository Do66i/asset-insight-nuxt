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
// ----- Props / Emits -----

// ----- Composables -----

// ----- State -----

// ----- Computed -----

// ----- Watchers -----

// ----- Lifecycle Hooks -----

// ----- Methods -----
const handleLogin = () => {
  console.log('로그인 시도');
  // 추후 여기에 Nest.js API 연동이나 상태 변경 로직 추가
};

// ----- Page Meta -----
// 이 페이지는 layouts/default.vue를 적용하지 않고 레이아웃 없이 단독으로 렌더링합니다.
definePageMeta({
  layout: false,
});
</script>

<style lang="scss" scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f1f3f5;

  .login-box {
    background: #ffffff;
    padding: 2.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    text-align: center;

    h2 {
      color: #41b883;
      margin-bottom: 0.5rem;
    }

    p {
      color: #666666;
      font-size: 0.9rem;
      margin-bottom: 2rem;
    }

    .input-group {
      margin-bottom: 1rem;

      input {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #dee2e6;
        border-radius: 4px;
        box-sizing: border-box;

        &:focus {
          border-color: #41b883;
          outline: none;
        }
      }
    }

    button {
      width: 100%;
      padding: 0.75rem;
      background-color: #41b883;
      color: white;
      border: none;
      border-radius: 4px;
      font-weight: bold;
      cursor: pointer;

      &:hover {
        background-color: #35495e;
      }
    }

    .back-link {
      margin-top: 1.5rem;

      a {
        color: #868e96;
        font-size: 0.85rem;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
