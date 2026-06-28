<template>
  <div class="base-text-editor-wrapper">
    <ClientOnly>
      <QuillEditor
          ref="quillRef"
          :content="modelValue"
          content-type="html"
          theme="snow"
          :toolbar="toolbarOptions"
          :placeholder="placeholder"
          @update:content="onUpdateContent"
      />
      <template #fallback>
        <div class="editor-fallback-placeholder">
          <p>에디터를 불러오는 중입니다...</p>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

// ----- Props / Emits -----
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '내용을 입력해 주세요.'
  }
});

const emit = defineEmits(['update:modelValue']);

// ----- Composables -----

// ----- State -----
// 설명: Quill 인스턴스 엘리먼트를 직접 제어하기 위한 반응형 템플릿 참조 변수
const quillRef = ref(null);

// 설명: Quill 에디터가 지원하는 전체 툴바 기능 명세 매핑 배열
const toolbarOptions = [
  [{ font: [] }, { size: ['small', false, 'large', 'huge'] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ color: [] }, { background: [] }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
  [{ direction: 'rtl' }, { align: [] }],
  ['blockquote', 'code-block'],
  ['link', 'image', 'video'],
  ['clean']
];

// ----- Computed -----

// ----- Watchers -----
// 설명: 비동기 데이터 로드로 부모의 modelValue가 뒤늦게 변경될 때 에디터 내부 텍스트를 강제 동기화하는 반응형 감시자

watch(() => props.modelValue, (newContent) => {
  if (quillRef.value && newContent) {
    const quillInstance = quillRef.value.getQuill();

    if (quillInstance) {
      const isEmpty = quillInstance.getText().trim().length === 0;

      if (!quillInstance.hasFocus() || isEmpty) {
        quillRef.value.setHTML(newContent);
      }
    }
  }
});

// ----- Lifecycle Hooks -----

// ----- Methods -----
// 설명: Quill 에디터의 변경 내용을 부모 컴포넌트의 v-model로 상향 바인딩 전송하는 함수
const onUpdateContent = (value) => {
  emit('update:modelValue', value);
};
</script>

<style scoped lang="scss">
/* 설명: 프로젝트의 스타일 정체성 통합을 위한 에디터 스타일 오버라이딩 */
.base-text-editor-wrapper {
  width: 100%;

  :deep(.ql-toolbar.ql-snow) {
    border: 1px solid #e2e8f0;
    border-radius: 8px 8px 0 0;
    background-color: #f8fafc;
  }

  :deep(.ql-container.ql-snow) {
    border: 1px solid #e2e8f0;
    border-top: none;
    border-radius: 0 0 8px 8px;
    min-height: 300px;
    font-size: 1rem;
    font-family: inherit;
  }

  :deep(.ql-editor) {
    min-height: 300px;
    color: #334155;
    line-height: 1.6;

    &.ql-blank::before {
      color: #94a3b8;
      font-style: normal;
    }
  }
}

/* 설명: SSR 하이드레이션 완료 전 노출될 대체 UI 영역 스타일 */
.editor-fallback-placeholder {
  width: 100%;
  height: 342px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background-color: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  font-size: 0.9rem;
}
</style>