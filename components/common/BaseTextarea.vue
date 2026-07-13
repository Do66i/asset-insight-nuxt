<template>
  <div class="base-textarea-group">
    <label v-if="label" class="textarea-label">{{ label }}</label>

    <textarea
      :value="modelValue"
      :placeholder="placeholder"
      :rows="rows"
      :disabled="disabled"
      class="design-textarea-ctrl"
      :class="[sizeClass, { 'has-error': errorMessage }]"
      @input="$emit('update:modelValue', $event.target.value)"
    ></textarea>

    <p v-if="errorMessage" class="textarea-error-msg">⚠️ {{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue';

// ----- Props / Emits -----
const props = defineProps({
  modelValue: { type: String, default: '' },
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  rows: { type: Number, default: 6 },
  disabled: { type: Boolean, default: false },
  errorMessage: { type: String, default: '' },
  // 설명: 대/중/소 크기 매핑을 위한 디자인 시스템 옵션 정의 (sm, md, lg)
  size: { type: String, default: 'md' }
});

defineEmits(['update:modelValue']);

// ----- state, computed, watch, lifecycle, methods -----
// 설명: 전달받은 size 설정을 기반으로 CSS 결합용 클래스명 자동 연산
const sizeClass = computed(() => {
  return `textarea-${props.size}`;
});
</script>

<style scoped lang="scss">
// 설명: 디자인 시스템 스펙은 전역 파일인 assets/css/dashboard.scss 통합본으로 매핑 관리함
</style>
