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
/* 설명: 모바일 우선(Mobile-First) 구조의 2단 그리드 대시보드 레이아웃 정의 */
.dashboard-page {
  padding: 1rem 0;

  .dashboard-grid {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-top: 1rem;
  }

  .widget-card {
    background-color: #fff;
    border: 1px solid #E9ECEF;
    border-radius: 8px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 180px;

    h3 {
      font-size: 1.1rem;
      color: #16191C;
      margin-bottom: 1rem;
      border-bottom: 1px solid #F1F3F5;
      padding-bottom: 0.5rem;
    }

    .widget-action {
      margin-top: 1.5rem;
      text-align: right;

      .link-btn {
        font-size: 0.85rem;
        color: #527AA4;
        text-decoration: none;
        font-weight: 500;

        &:hover {
          color: #355A82;
        }
      }
    }
  }

  /* 자산 위젯 내부 서체 구조 */
  .asset-widget {
    .asset-info {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;

      .info-row {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .label {
          font-size: 0.9rem;
          color: #747D87;
        }
        .value {
          font-size: 1.2rem;
          font-weight: bold;
          color: #16191C;

          &.plus { color: #D14D4D; }
          &.minus { color: #4D7BD1; }
        }
      }
    }
  }

  /* 게시판 위젯 내부 리스트 구조 */
  .board-widget {
    .recent-list {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        margin-bottom: 0.75rem;

        a {
          display: flex;
          justify-content: space-between;
          align-items: center;
          text-decoration: none;
          color: #454B52;
          font-size: 0.9rem;

          &:hover {
            color: #527AA4;
            .post-title { text-decoration: underline; }
          }

          .post-title {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            max-width: 70%;
          }
          .post-date {
            font-size: 0.8rem;
            color: #9098A1;
          }
        }
      }
    }
  }

  /* 태블릿 및 데스크톱 스크린 반응형 (2단 카드 배치) */
  @media (min-width: 768px) {
    .dashboard-grid {
      flex-direction: row;
    }
    .widget-card {
      flex: 1;
    }
  }
}
</style>
