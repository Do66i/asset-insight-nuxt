<template>
  <div class="board-pagination-bar">
    <button
      class="page-nav-btn"
      :disabled="currentPage === 1"
      @click="$emit('change', currentPage - 1)"
    >
      ◀ 이전
    </button>

    <button
      v-for="p in totalPages"
      :key="p"
      class="page-num-btn"
      :class="{ active: p === currentPage }"
      @click="$emit('change', p)"
    >
      {{ p }}
    </button>

    <button
      class="page-nav-btn"
      :disabled="currentPage === totalPages"
      @click="$emit('change', currentPage + 1)"
    >
      다음 ▶
    </button>
  </div>
</template>

<script setup>
// ----- Props / Emits -----
defineProps({
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true }
});

defineEmits(['change']);

// ----- Composables -----

// ----- State -----

// ----- Computed -----

// ----- Watchers -----

// ----- Lifecycle Hooks -----

// ----- Methods -----
</script>
<style scoped lang="scss">
</style>
