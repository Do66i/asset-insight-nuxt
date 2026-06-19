<template>
  <div class="common-input-group"> <label v-if="label" class="input-label">{{ label }}</label>

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
// ----- Props / Emits -----
const props = defineProps({
  // 양방향 바인딩을 위한 기본 v-model 값
  modelValue: {
    type: [String, Number],
    default: '',
  },
  // 인풋 타입 (text, password 등)
  type: {
    type: String,
    default: 'text',
  },
  // 플레이스홀더 텍스트
  placeholder: {
    type: String,
    default: '',
  },
  // 인풋 상단에 띄울 라벨 명칭
  label: {
    type: String,
    default: '',
  },
  // 아래에 토글될 에러 메시지 내용 (값이 비어있으면 토글 닫힘)
  errorMessage: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);

// ----- Composables -----

// ----- State -----

// ----- Computed -----

// ----- Watchers -----

// ----- Lifecycle Hooks -----

// ----- Methods -----
// 입력값 변경 시 부모에게 v-model 변경 사항 전송
const handleInput = (event) => {
  emit('update:modelValue', event.target.value);
};
</script>

<style scoped lang="scss">
</style>
