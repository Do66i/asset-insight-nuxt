<template>
  <div class="board-detail-page">
    <common-loading v-if="pending"/>

    <div v-else-if="post" class="post-content">
      <h3 class="post-title">{{ post.title }}</h3>
      <div class="post-meta">
        <span>작성자: {{ post.writer }}</span>
        <span class="divider">|</span>
        <span>날짜: {{ post.date }}</span>
      </div>
      <hr />
      <p class="post-body">{{ post.content }}</p>
      <div class="action-area">
        <nuxt-link to="/board">목록으로 돌아가기</nuxt-link>
      </div>
    </div>

    <common-no-data
      v-else
      message="존재하지 않거나 삭제된 게시글입니다."
      redirect-url="/board"
      btn-text="목록으로"
    />
  </div>
</template>

<script setup>
// ----- Props / Emits -----

// ----- Composables -----
const route = useRoute();
// 주소창의 id 값 (route.params.id)을 동적으로 매핑하여 useFetch 호출
const { data: post, pending } = useFetch(`/api/board/${route.params.id}`);

// ----- State -----

// ----- Computed -----

// ----- Watchers -----

// ----- Lifecycle Hooks -----

// ----- Methods -----
</script>
<style scoped lang="scss">
/* 설명: 게시글 상세 내용 영역 서체 및 버튼 스타일 구조화 */
</style>
