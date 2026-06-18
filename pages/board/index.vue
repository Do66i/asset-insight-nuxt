<template>
  <div>
    <h2>인사이트 메인 게시판</h2>

    <CommonLoading v-if="pending" />

    <ul v-else class="board-list">
      <li v-for="item in boardList" :key="item.id">
        <NuxtLink :to="`/board/${item.id}`">
          <span class="title">{{ item.title }}</span>
          <span class="info">{{ item.writer }} | {{ item.date }}</span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
// ----- Props / Emits -----

// ----- Composables -----
// useFetch를 통해 내장 임시 API 데이터 호출
const { data: boardList, pending } = useFetch('/api/board');

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
.board-page {
  .loading {
    color: #999;
  }
  .board-list {
    list-style: none;
    padding: 0;
    li {
      margin-bottom: 1rem;
      a {
        display: flex;
        justify-content: space-between;
        text-decoration: none;
        color: #333;
        &:hover {
          color: #527AA4;
        }
      }
    }
  }
}
</style>
