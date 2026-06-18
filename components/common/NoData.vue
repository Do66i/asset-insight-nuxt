<template>
  <div class="common-no-data">
    <p class="message-text">{{ message }}</p>
    <nuxt-link v-if="redirectUrl" :to="redirectUrl" class="back-btn">
      {{ btnText }}
    </nuxt-link>
  </div>
</template>

<script setup>
// ----- Props / Emits -----
defineProps({
  message: { // 안내 메세지 내용
    type: String,
    default: '데이터가 존재하지 않습니다.',
  },
  redirectUrl: { // 이동할 라우터 주소 (값이 없다면 버튼 미표시)
    type: String,
    default: '',
  },
  btnText: { // 버튼 내부에 들어갈 텍스트
    type: String,
    default: '돌아가기'
  }
})

// ----- Composables -----

// ----- State -----

// ----- Computed -----

// ----- Watchers -----

// ----- Lifecycle Hooks -----

// ----- Methods -----
</script>
<style scoped lang="scss">
</style>
