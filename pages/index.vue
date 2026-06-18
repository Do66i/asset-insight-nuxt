<template>
  <div>
    <h1>📈 Asset Insight Dashboard</h1>
    <p>현재 테스트 카운트: {{ count }}</p>
    <button @click="increaseCount">카운트 증가</button>
  </div>
</template>

<script setup>
// ----- Props / Emits -----

// ----- Composables -----

// ----- State -----
const count = ref(0);

// ----- Computed -----

// ----- Watchers -----

// ----- Lifecycle Hooks -----

// ----- Methods -----
const increaseCount = () => {
  count.value++;
};
</script>
<style scoped lang="scss">
</style>
