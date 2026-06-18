<template>
  <div>
    <h2>인사이트 메인 게시판</h2>

    <ul>
      <li v-for="post in posts" :key="post.id">
        <NuxtLink :to="`/board/${post.id}`">
          {{ post.title }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
// ----- Props / Emits -----

// ----- Composables -----

// ----- State -----
const posts = ref([
  { id: '1', title: '국내 계좌로 미국 주식 거래 시 양도소득세 절세 팁' },
  { id: '2', title: 'ISA 계좌 배당금 비과세 한도 200% 활용하기' },
  { id: '3', title: '테슬라 vs 엔비디아, 하반기 포트폴리오 비중 고민' },
]);

// ----- Computed -----

// ----- Watchers -----

// ----- Lifecycle Hooks -----

// ----- Methods -----
</script>
<style scoped lang="scss">
</style>
