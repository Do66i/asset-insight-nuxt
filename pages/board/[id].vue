<template>
  <div class="board-detail-page">
    <CommonLoading v-if="pending" />

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
        <div class="content-text" v-html="article.content"></div>
      </div>

      <div class="detail-footer">
        <NuxtLink to="/board" class="back-list-btn">← 목록으로 돌아가기</NuxtLink>

        <div v-if="isOwner" class="action-btn-group">
          <button class="btn-edit" @click="goToEdit">수정</button>
          <button class="btn-delete" :disabled="isDeleting" @click="handleDelete">
            {{ isDeleting ? '삭제 중...' : '삭제' }}
          </button>
        </div>
      </div>
    </div>

    <div v-else class="no-data-wrapper">
      <CommonNoData />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth.js';

// ----- Props / Emits -----

// ----- Composables -----
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

// 설명: 유저 정보를 추출하여 내가 쓴 글인지 식별할 전역 닉네임 상태 바인딩
const { user, isAuthenticated } = storeToRefs(authStore);

// 설명: 파라미터 ID가 'write' 문자열일 경우 API 페칭을 원천 가드하여 충돌을 방지하는 계산된 옵션 매핑
const { data: article, pending } = useFetch(() => `/api/board/${route.params.id}`, {
  immediate: route.params.id !== 'write'
});

// ----- State -----
// 설명: 삭제 API 중복 호출 방지를 위한 인터셉트 상태 변수
const isDeleting = ref(false);

// ----- Computed -----
// 설명: 현재 로그인한 사용자와 게시글의 작성자가 일치하는지 검증하는 객체 계산 프로퍼티
const isOwner = computed(() => {
  if (!isAuthenticated.value || !user.value || !article.value) {
    return false;
  }
  // 유저 스토어의 식별 가능한 고유 속성 이름(예: name 또는 username)과 결합도 매치
  return article.value.writer === user.value.nickname;
});

// ----- Watchers -----

// ----- Lifecycle Hooks -----

// ----- Methods -----
// 설명: 수정 페이지로 해당 게시글의 ID를 들고 안전하게 이동시키는 네비게이션 함수
const goToEdit = () => {
  router.push(`/board/write?id=${route.params.id}`);
};
// 설명: DELETE 메서드로 Nitro 서버 API 엔드포인트에 삭제를 요청하는 비동기 핸들러 함수
const handleDelete = async () => {
  if (isDeleting.value) {
    return;
  }

  if (confirm('정말로 이 인사이트 리포트를 삭제하시겠습니까?')) {
    try {
      isDeleting.value = true;

      // 설명: Nuxt $fetch 호출을 통해 특정 ID 리소스를 원격 파괴 요청
      await $fetch(`/api/board/${route.params.id}`, {
        method: 'DELETE'
      });

      alert('성공적으로 삭제되었습니다.');
      router.push('/board');
    } catch (error) {
      alert('글 삭제 중 오류가 발생했습니다.');
    } finally {
      isDeleting.value = false;
    }
  }
};
</script>

<style scoped lang="scss">
/* 설명: 외부 스타일 레이어 로드 및 상세 화면 전용 여름뮤트 톤앤매너 컴포지션 정의 */
.detail-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e2e8f0;
}

.action-btn-group {
  display: flex;
  gap: 0.5rem;

  button {
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .btn-edit {
    background-color: #ffffff;
    border: 1px solid #cbd5e1;
    color: #475569;

    &:hover {
      background-color: #f8fafc;
      border-color: #94a3b8;
    }
  }

  .btn-delete {
    background-color: #ef4444;
    border: 1px solid #ef4444;
    color: #ffffff;

    &:hover {
      background-color: #dc2626;
    }

    &:disabled {
      background-color: #fca5a5;
      border-color: #fca5a5;
      cursor: not-allowed;
    }
  }
}
</style>