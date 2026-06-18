<template>
  <div>
    <h2>인사이트 상세 페이지</h2>
    <p>현재 조회 중인 게시글 번호: {{boardId}}</p>

    <hr>
    <NuxtLink to="/board">목록으로 돌아가기</NuxtLink>
  </div>
</template>

<script setup>
// ----- Props / Emits -----

// ----- Composables -----
const route = useRoute();

// ----- State -----
const boardId = route.params.id;

// ----- Computed -----

// ----- Watchers -----

// ----- Lifecycle Hooks -----

// ----- Methods -----
</script>
<style scoped lang="scss">
</style>
