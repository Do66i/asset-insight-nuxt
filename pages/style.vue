<template>
  <div class="style-guide-container">
    <h1 class="guide-main-title">🎨 Asset Insight 디자인 시스템 가이드</h1>
    <p class="guide-sub-title">소프트 여름뮤트 시그니처 테마 및 CRUD 공통 규격 스펙 명세</p>

    <section class="guide-section">
      <h2 class="section-title">🔹 Brand Color Palette</h2>
      <div class="color-grid">
        <div class="color-card">
          <div class="color-swatch visual-primary"></div>
          <div class="color-info">
            <span class="color-name">Primary Blue</span>
            <span class="color-hex">#527AA4</span>
          </div>
        </div>
        <div class="color-card">
          <div class="color-swatch visual-secondary"></div>
          <div class="color-info">
            <span class="color-name">Secondary Navy</span>
            <span class="color-hex">#3b5d82</span>
          </div>
        </div>
        <div class="color-card">
          <div class="color-swatch visual-bg"></div>
          <div class="color-info">
            <span class="color-name">Background Soft</span>
            <span class="color-hex">#f4f6f8</span>
          </div>
        </div>
        <div class="color-card">
          <div class="color-swatch visual-text"></div>
          <div class="color-info">
            <span class="color-name">Text Slate</span>
            <span class="color-hex">#334155</span>
          </div>
        </div>
      </div>
    </section>

    <section class="guide-section">
      <h2 class="section-title">📝 Input Size System</h2>
      <div class="component-preview-box row-gap">
        <div class="size-example-row">
          <span class="size-badge">Small (input-sm)</span>
          <CommonBaseInput v-model="guideState.inputSm" placeholder="소형 규격 인풋창" size="sm" />
        </div>

        <div class="size-example-row">
          <span class="size-badge">Medium (input-md)</span>
          <CommonBaseInput v-model="guideState.inputMd" placeholder="중형 규격 인풋창 (기본값)" size="md" />
        </div>

        <div class="size-example-row">
          <span class="size-badge">Large (input-lg)</span>
          <CommonBaseInput v-model="guideState.inputLg" placeholder="대형 규격 인풋창" size="lg" />
        </div>
      </div>
    </section>

    <section class="guide-section">
      <h2 class="section-title">💬 Textarea Size System</h2>
      <div class="component-preview-box row-gap">
        <div class="size-example-row">
          <span class="size-badge">Small (textarea-sm)</span>
          <CommonBaseTextarea v-model="guideState.textareaSm" placeholder="소형 규격 텍스트에리어" size="sm" :rows="3" />
        </div>

        <div class="size-example-row">
          <span class="size-badge">Medium (textarea-md)</span>
          <CommonBaseTextarea v-model="guideState.textareaMd" placeholder="중형 규격 텍스트에리어 (기본값)" size="md" :rows="4" />
        </div>

        <div class="size-example-row">
          <span class="size-badge">Large (textarea-lg)</span>
          <CommonBaseTextarea v-model="guideState.textareaLg" placeholder="대형 규격 텍스트에리어" size="lg" :rows="6" />
        </div>
      </div>
    </section>

    <section class="guide-section">
      <h2 class="section-title">⚡ Button Control System (Variant & Size)</h2>
      <div class="component-preview-box row-gap">
        <div class="flex-wrap-layout">
          <button type="button" class="design-btn-ctrl btn-primary btn-md">등록 (Primary)</button>
          <button type="button" class="design-btn-ctrl btn-secondary btn-md">목록 (Secondary)</button>
          <button type="button" class="design-btn-ctrl btn-danger btn-md">삭제 (Danger)</button>
          <button type="button" class="design-btn-ctrl btn-outline btn-md">취소 (Outline)</button>
        </div>

        <div class="flex-wrap-layout align-center">
          <button type="button" class="design-btn-ctrl btn-outline btn-sm">Small (btn-sm)</button>
          <button type="button" class="design-btn-ctrl btn-outline btn-md">Medium (btn-md)</button>
          <button type="button" class="design-btn-ctrl btn-outline btn-lg">Large (btn-lg)</button>
        </div>
      </div>
    </section>

    <section class="guide-section">
      <h2 class="section-title">🔍 Complex Control System (Search & Pagination)</h2>
      <div class="component-preview-box row-gap">
        <CommonBaseSearch
          v-model:searchType="guideState.searchType"
          v-model:keyword="guideState.searchKeyword"
          @search="handleMockAlert"
        />
        <CommonBasePagination
          :current-page="guideState.currentPage"
          :total-pages="5"
          @change="handlePageChange"
        />
      </div>
    </section>

    <section class="guide-section">
      <h2 class="section-title">⚠️ Status Feedback (Loading & NoData)</h2>
      <div class="component-preview-grid">
        <div class="status-box">
          <h4 class="status-label">[ Loading ]</h4>
          <CommonLoading />
        </div>
        <div class="status-box">
          <h4 class="status-label">[ NoData ]</h4>
          <CommonNoData />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

// ----- Props / Emits -----

// ----- Composables -----

// ----- state -----
// 설명: 스타일 쇼케이스의 실시간 바인딩 검전용 반응형 오브젝트 선언
const guideState = reactive({
  inputSm: '',
  inputMd: '',
  inputLg: '',
  textareaSm: '',
  textareaMd: '',
  textareaLg: '',
  searchType: 'all',
  searchKeyword: '',
  currentPage: 1
});

// ----- computed -----

// ----- watch -----

// ----- lifecycle -----

// ----- methods -----
const handleMockAlert = () => {
  alert(`[디자인시스템 검색] 타입: ${guideState.searchType} | 키워드: ${guideState.searchKeyword}`);
};

const handlePageChange = (page) => {
  guideState.currentPage = page;
};
</script>

<style scoped lang="scss">
// 설명: 컴포넌트 스코프 캡슐화를 수호하며 스타일 명세는 dashboard.scss 파일 통합본으로 마감 관리함
</style>
