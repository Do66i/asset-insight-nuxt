<template>
  <div class="board-search-bar">
    <select
      :value="searchType"
      class="search-select"
      @change="$emit('update:searchType', $event.target.value)"
    >
      <option value="all">📝 제목 + 본문</option>
      <option value="writer">👤 닉네임</option>
    </select>
    <input
      :value="keyword"
      type="text"
      class="search-input"
      placeholder="검색어를 입력하고 엔터를 치세요..."
      @input="$emit('update:keyword', $event.target.value)"
      @keyup.enter="$emit('search')"
    />
    <button class="search-button" @click="$emit('search')">🔍 검색</button>
  </div>
</template>

<script setup>
// ----- Props / Emits -----
defineProps({
  searchType: { type: String, default: 'all' },
  keyword: { type: String, default: '' }
});

defineEmits(['update:searchType', 'update:keyword', 'search']);
// ----- Composables -----

// ----- State -----

// ----- Computed -----

// ----- Watchers -----

// ----- Lifecycle Hooks -----

// ----- Methods -----
</script>
<style scoped lang="scss">
</style>
