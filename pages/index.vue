<template>
  <div class="dashboard-page"> <h2>🏠 대시보드 홈</h2>

    <div class="dashboard-grid">
      <section class="widget-card asset-widget">
        <h3>📊 나의 자산 요약</h3>
        <div class="asset-info">
          <div class="info-row">
            <span class="label">총 평가 자산</span>
            <span class="value">${{ totalEvaluationAmount.toFixed(2) }}</span>
          </div>
          <div class="info-row">
            <span class="label">총 누적 수익률</span>
            <span :class="['value', { 'plus': totalReturnRate > 0, 'minus': totalReturnRate < 0 }]">
              {{ totalReturnRate.toFixed(2) }}%
            </span>
          </div>
        </div>
        <div class="widget-action">
          <NuxtLink to="/portfolio" class="link-btn">자산 관리하러 가기 →</NuxtLink>
        </div>
      </section>

      <section class="widget-card board-widget">
        <h3>📝 최근 업데이트 인사이트</h3>

        <common-loading v-if="pending" />

        <ul v-else class="recent-list">
          <li v-for="item in recentBoardList" :key="item.id">
            <NuxtLink :to="`/board/${item.id}`">
              <span class="post-title">{{ item.title }}</span>
              <span class="post-date">{{ item.date }}</span>
            </NuxtLink>
          </li>
        </ul>

        <div class="widget-action">
          <NuxtLink to="/board" class="link-btn">게시판 바로가기 →</NuxtLink>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { usePortfolioStore } from '@/stores/portfolio.js';

// ----- Props / Emits -----

// ----- Composables -----
const portfolioStore = usePortfolioStore();
// 메인 화면에서 실시간으로 감시할 전역 자산 상태 추출
const { totalEvaluationAmount, totalReturnRate } = storeToRefs(portfolioStore);

// 인사이트 게시판 목록 조회 API 호출
const { data: boardList, pending } = useFetch('/api/board');

// ----- State -----

// ----- Computed -----
// 설명: 메인 위젯용으로 최신 글 2개만 조각내어 반환하는 연산 프로미스
const recentBoardList = computed(() => {
  if (!boardList.value) {
    return [];
  }
  return boardList.value.slice(0, 2);
});

// ----- Watchers -----

// ----- Lifecycle Hooks -----

// ----- Methods -----
</script>

<style scoped lang="scss">
</style>
