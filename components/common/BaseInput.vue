<template>
  <div class="base-input-group">
    <label v-if="label" class="input-label">{{ label }}</label>

    <input
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      class="design-input-ctrl"
      :class="[sizeClass, { 'has-error': errorMessage }]"
      @input="$emit('update:modelValue', $event.target.value)"
    />

    <p v-if="errorMessage" class="input-error-msg">⚠️ {{ errorMessage }}</p>
  </div>
</template>

<script setup>
// ----- Props / Emits -----
import { computed } from "vue";

const props = defineProps({
  modelValue: { type: String, default: '' },
  type: { type: String, default: 'text' },
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  errorMessage: { type: String, default: '' },
  // 설명: 다른 곳에서 호출 시 깨지지 않도록 기본값 'md'로 설정하여 하위 호환성 유지
  size: { type: String, default: 'md' }
});

defineEmits(['update:modelValue']);

// ----- Composables -----

// ----- State -----

// ----- Computed -----
const sizeClass = computed(() => {
  return `input-${props.size}`;
});

// ----- Watchers -----

// ----- Lifecycle Hooks -----

// ----- Methods -----
</script>
<style scoped lang="scss">
</style>
