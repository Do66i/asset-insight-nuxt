<template>
  <div class="board-container">
    <div class="board-header-row">
      <h2 class="board-main-title">📈 인사이트 메인 게시판</h2>
      <NuxtLink v-if="isAuthenticated" to="/board/write" class="write-action-btn">
        ✏️ 인사이트 작성
      </NuxtLink>
    </div>

    <CommonBaseSearch
        v-model:searchType="searchParam.searchType"
        v-model:keyword="searchParam.keyword"
        @search="triggerSearch"
    />

    <CommonLoading v-if="pending" />

    <div v-else-if="!boardResponse?.list || boardResponse.list.length === 0" class="no-data-zone">
      <p>😅 검색 결과와 일치하는 주식 인사이트 리포트가 없습니다.</p>
    </div>

    <div v-else class="board-grid-wrapper">
      <div
          v-for="item in boardResponse.list"
          :key="item.id"
          class="board-card-item"
      >
        <NuxtLink :to="`/board/${item.id}`" class="card-link">
          <div class="card-header-zone">
            <span class="category-badge">🔹 {{ item.category }}</span>
            <div class="user-tier-badge" :class="getTierClass(item.userTier)">
              {{ getTierEmoji(item.userTier) }} {{ item.userTier }}
            </div>
          </div>

          <div class="card-content-zone">
            <h3 class="card-title">{{ item.title }}</h3>
            <p class="card-summary">{{ item.summary }}</p>
          </div>

          <div class="card-footer-zone">
            <div class="writer-profile">
              <span class="writer-name">👤 {{ item.writer }}</span>
            </div>

            <div class="user-stats-metrics">
              <span class="stat-item" title="작성 글 수">📝 {{ item.postCount }}</span>
              <span class="stat-item" title="누적 좋아요 수">❤️ {{ formatLikes(item.likeCount) }}</span>
              <span class="stat-item date-text">📅 {{ item.date }}</span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>

    <CommonBasePagination
        v-if="boardResponse?.totalPages > 1"
        :current-page="searchParam.page"
        :total-pages="boardResponse.totalPages"
        @change="changePage"
    />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth.js';

// ----- Props / Emits -----

// ----- Composables -----
const authStore = useAuthStore();
const { isAuthenticated } = storeToRefs(authStore);

const searchParam = reactive({
  searchType: 'all',
  keyword: '',
  page: 1,
  limit: 6
});

const { data: boardResponse, pending } = useFetch('/api/board', {
  query: searchParam
});

// ----- state -----

// ----- computed -----

// ----- watch -----

// ----- lifecycle -----

// ----- methods -----
const getTierEmoji = (tier) => {
  if (tier === '왕관') return '👑';
  if (tier === '고인물') return '🔥';
  if (tier === '병아리') return '🐣';
  return '⭐';
};

const getTierClass = (tier) => {
  if (tier === '왕관') return 'tier-crown';
  if (tier === '고인물') return 'tier-oldbie';
  if (tier === '병아리') return 'tier-chick';
  return 'tier-normal';
};

const formatLikes = (count) => {
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'k';
  }
  return count;
};

const triggerSearch = () => {
  searchParam.page = 1;
};

const changePage = (newPage) => {
  searchParam.page = newPage;
};
</script>

<style scoped lang="scss">
/* 설명: 상단 타이틀과 글쓰기 버튼 정렬을 위한 헤더 로우 플렉스 레이아웃 추가 */
.board-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.board-main-title {
  margin-bottom: 0;
}

/* 설명: 다른 폼 버튼과 톤앤매너를 맞춘 글쓰기 액션 버튼 스타일 정의 */
.write-action-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.6rem 1.2rem;
  background-color: #3b82f6;
  color: #ffffff;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #2563eb;
  }
}
</style>