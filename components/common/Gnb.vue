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
        <NuxtLink to="/login">로그인</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>
// ----- Props / Emits -----

// ----- Composables -----

// ----- State -----

// ----- Computed -----

// ----- Watchers -----

// ----- Lifecycle Hooks -----

// ----- Methods -----
</script>
<style scoped lang="scss">
/* 간단하게 가로 정렬 스타일링 */
nav {
  padding: 1rem;
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
}
ul {
  display: flex;
  gap: 20px;
  list-style: none;
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
  color: #333333;
  font-weight: bold;
}
/* 현재 활성화된 페이지의 링크에 자동으로 붙는 Nuxt 클래스 */
.router-link-active {
  color: #41b883;
}
</style>
