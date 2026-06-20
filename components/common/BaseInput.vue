<template>
  <div class="common-input-group">
    <label v-if="label" class="input-label">{{ label }}</label>

    <input
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      :class="{ 'has-error': errorMessage }"
      class="base-input"
      @input="handleInput"
    />

    <transition name="slide-fade">
      <p v-if="errorMessage" class="error-message-text">{{ errorMessage }}</p>
    </transition>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: [String, Number], default: '' },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  label: { type: String, default: '' },
  errorMessage: { type: String, default: '' },
});

const emit = defineEmits(['update:modelValue']);

const handleInput = (event) => {
  emit('update:modelValue', event.target.value);
};
</script>

<style scoped lang="scss">
/* 설명: 컴포넌트 고유의 정렬성과 유연한 폭을 보장하기 위해 고유 스코프 스타일 강제 주입 */
</style>
