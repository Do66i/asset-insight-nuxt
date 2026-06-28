<template>
  <div class="board-write-page">
    <h2>{{ isEditMode ? '📝 인사이트 수정' : '📝 인사이트 작성' }}</h2>

    <form @submit.prevent="handleSubmit" class="write-form">
      <div class="form-group">
        <label for="title" class="form-label">제목</label>
        <input
            id="title"
            v-model="form.title"
            type="text"
            placeholder="인사이트 제목을 입력해 주세요."
            class="form-input"
            required
        />
      </div>

      <div class="form-group">
        <label class="form-label">내용</label>
        <CommonBaseTextEditor
            v-model="form.content"
            placeholder="주식 시장 분석 및 자산 인사이트 내용을 자유롭게 작성해 주세요."
        />
      </div>

      <div class="form-actions">
        <button
            type="button"
            class="btn-secondary"
            @click="handleCancel"
        >
          취소
        </button>
        <button
            type="submit"
            :disabled="isSubmitting"
            class="btn-primary"
        >
          {{ isSubmitting ? '저장 중...' : (isEditMode ? '수정하기' : '등록하기') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// ----- Props / Emits -----

// ----- Composables -----
const route = useRoute();
const router = useRouter();

// ----- State -----
// 설명: 글 작성/수정 폼 통합 스토리지 오브젝트 상태 관리
const form = ref({
  title: '',
  content: ''
});

// 설명: 중복 제출 방지를 위한 로딩 상태 가드 변수
const isSubmitting = ref(false);

// ----- Computed -----
// 설명: URL 쿼리에 고유 ID가 존재하는지 판별하여 수정 모드를 활성화하는 연산 프로퍼티
const isEditMode = computed(() => {
  return !!route.query.id;
});

// ----- Watchers -----

// ----- Lifecycle Hooks -----
// 설명: 컴포넌트가 마운트될 때 수정 모드라면 기존 백엔드 리포트 데이터를 불러와 폼에 채워넣음
// pages/board/write.vue 내부의 onMounted 섹션 수정
onMounted(async () => {
  if (isEditMode.value) {
    try {
      const response = await $fetch(`/api/board/${route.query.id}`);

      if (response) {
        form.value.title = response.title;
        form.value.content = response.content;
      }
    } catch (error) {
      console.error('[Parent] API 조회 에러 발생:', error);
      alert('기존 글 정보를 불러오는 데 실패했습니다.');
      router.push('/board');
    }
  }
});

// ----- Methods -----
// 설명: 모드별 조건에 따라 POST(등록) 또는 PUT(수정) API 전송을 분기 처리하는 핸들러 함수
const handleSubmit = async () => {
  if (isSubmitting.value) {
    return;
  }

  if (!form.value.title.trim() || !form.value.content.trim()) {
    alert('제목과 내용을 모두 입력해 주세요.');
    return;
  }

  try {
    isSubmitting.value = true;

    // 설명: 모드에 따라 엔드포인트 URL과 HTTP Method를 동적으로 매핑
    const apiUrl = isEditMode.value ? `/api/board/${route.query.id}` : '/api/board';
    const apiMethod = isEditMode.value ? 'PUT' : 'POST';

    const response = await $fetch(apiUrl, {
      method: apiMethod,
      body: {
        title: form.value.title,
        content: form.value.content
      }
    });

    if (response) {
      alert(isEditMode.value ? '인사이트가 성공적으로 수정되었습니다.' : '인사이트가 성공적으로 등록되었습니다.');
      router.push(isEditMode.value ? `/board/${route.query.id}` : '/board');
    }
  } catch (error) {
    alert(isEditMode.value ? '글 수정 중 오류가 발생했습니다.' : '글 등록 중 오류가 발생했습니다.');
  } finally {
    isSubmitting.value = false;
  }
};

// 설명: 작성 취소 시 기존 레이어로 안전하게 이탈시키는 함수
const handleCancel = () => {
  if (confirm('작성 중인 내용이 저장되지 않습니다. 취소하시겠습니까?')) {
    if (isEditMode.value) {
      router.push(`/board/${route.query.id}`);
    } else {
      router.push('/board');
    }
  }
};
</script>

<style scoped lang="scss">
/* 설명: 글로벌 스타일 시트 규칙을 위배하지 않는 범위 내의 레이아웃 세부 튜닝 */
.board-write-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;

  h2 {
    font-size: 1.5rem;
    color: #1e293b;
    margin-bottom: 2rem;
    font-weight: 700;
  }
}

.write-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .form-label {
    font-size: 0.95rem;
    font-weight: 600;
    color: #475569;
  }

  .form-input {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    font-size: 1rem;
    color: #334155;
    outline: none;
    transition: border-color 0.2s ease;

    &:focus {
      border-color: #3b82f6;
    }
  }
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;

  button {
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .btn-secondary {
    background-color: #f1f5f9;
    border: 1px solid #e2e8f0;
    color: #475569;

    &:hover {
      background-color: #e2e8f0;
    }
  }

  .btn-primary {
    background-color: #3b82f6;
    border: 1px solid #3b82f6;
    color: #ffffff;

    &:hover {
      background-color: #2563eb;
    }

    &:disabled {
      background-color: #93c5fd;
      border-color: #93c5fd;
      cursor: not-allowed;
    }
  }
}
</style>