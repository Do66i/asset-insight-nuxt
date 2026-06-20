<template>
  <div class="board-detail-page"> <common-loading v-if="pending" />

    <div v-else-if="article" class="detail-container">
      <div class="detail-header">
        <span class="category-tag">미국주식 & ISA</span>
        <h2>{{ article.title }}</h2>
        <div class="meta-info">
          <span class="writer">✍️ {{ article.writer }}</span>
          <span class="divider">|</span>
          <span class="date">📅 {{ article.date }}</span>
        </div>
      </div>

      <div class="detail-body">
        <p class="content-text">{{ article.content }}</p>
      </div>

      <div class="detail-footer">
        <NuxtLink to="/board" class="back-list-btn">← 목록으로 돌아가기</NuxtLink>
      </div>
    </div>

    <div v-else class="no-data-wrapper">
      <common-no-data />
    </div>

  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

// ----- Props / Emits -----

// ----- Composables -----
const route = useRoute();

// 파라미터 ID를 기반으로 단독 글 상세조회 비동기 API fetch 트리거
const { data: article, pending } = useFetch(`/api/board/${route.params.id}`);

// ----- State -----

// ----- Computed -----

// ----- Watchers -----

// ----- Lifecycle Hooks -----

// ----- Methods -----
</script>

<style scoped lang="scss">
/* 설명: 외부 스타일 레이어 로드 및 상세 화면 전용 여름뮤트 톤앤매너 컴포지션 정의 */
</style>
