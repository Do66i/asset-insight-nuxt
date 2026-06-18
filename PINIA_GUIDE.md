# 🍍 Pinia 상태 관리 가이드 (Pinia State Management Guide)

Vue 3 Composition API 스펙에 맞추어 프로젝트의 전역 상태를 명확하고 일관되게 관리하기 위한 가이드라인입니다.

---

## 🎯 1. 왜 Pinia인가? (Core Philosophy)

* **Mutations 제거**: 데이터 흐름을 복잡하게 만들던 Mutation이 삭제되어 Actions에서 직접 State를 변경합니다.
* **Composition API와의 완벽한 조화**: 컴포넌트 개발 시 사용하는 `ref()`, `computed()`, `function` 구조를 전역 스토어에 그대로 이식합니다.

---

## 🚦 2. 스토어 작성 핵심 규칙

1. **Setup 스토어 방식 준수**: Options 방식(`state`, `getters`, `actions` 객체 분리형) 대신, Composition API 형태의 Setup 스토어 방식을 사용합니다.
2. **세미콜론(;) 필수**: 스토어 내부의 모든 JavaScript / TypeScript 문장 끝에 세미콜론을 작성합니다.
3. **명시적 return**: 스토어 내부에서 정의한 State, Getters, Actions 중 외부 컴포넌트에서 가져다 쓸 모든 요소는 반드시 최종 return 객체에 명시해야 합니다.
---

---

## 🏗 3. 표준 스토어 템플릿 (Store Template - JS Version)

`stores/` 폴더 내에 새로운 전역 상태를 만들 때 준수해야 하는 표준 구조입니다. 기능별 주석 섹션으로 구분하여 순서대로 배치합니다.

```javascript
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useSampleStore = defineStore('sample', () => {
  // ----- State (ref) -----
  const rawItems = ref([]);
  const selectedId = ref(null);

  // ----- Getters (computed) -----
  // 특정 조건문이나 파싱 절차를 생략/축약하지 않고 원래 로직을 온전히 유지합니다.
  const activeItem = computed(() => {
    if (!selectedId.value) {
      return null;
    }
    return rawItems.value.find((item) => item.id === selectedId.value) || null;
  });

  // ----- Actions (function) -----
  // 외부 컴포넌트나 상태(store.state.params.year 등)에서 호출하던 형식과 결합도를 맞추어 파라미터를 설계합니다.
  const fetchItems = async (year) => {
    try {
      // 데이터 바인딩 시 임의 가공 금지 규칙을 준수합니다.
      console.log(year + '년도 데이터 페칭 시작');
    } catch (error) {
      console.error(error);
    }
  };

  const setSelectItem = (id) => {
    selectedId.value = id;
  };

  // ----- Return 명시 -----
  return {
    rawItems,
    selectedId,
    activeItem,
    fetchItems,
    setSelectItem;
  };
});
```

### ✅ 올바른 예시 (Good)
State와 Getters를 구조분해할 때는 반드시 `storeToRefs`를 사용하고, Actions는 메서드이므로 그냥 구조분해합니다. import 시에는 반드시 `.js` 확장자를 명시합니다.

```vue
<script setup>
  import { storeToRefs } from 'pinia';
  // 스토어 파일 import 시 확장자 명시 필수
  import { useSampleStore } from '~/stores/sampleStore.js';

  // ----- Props / Emits -----

  // ----- Composables -----
  const sampleStore = useSampleStore();

  // State와 Getters는 storeToRefs를 통해 반응성을 유지하며 구조분해
  const { rawItems, activeItem } = storeToRefs(sampleStore);

  // Actions는 일반 함수이므로 바로 구조분해 가능
  const { fetchItems } = sampleStore;

  // ----- State -----

  // ----- Computed -----

  // ----- Watchers -----

  // ----- Lifecycle Hooks -----

  // ----- Methods -----
</script>
```

### ❌ 잘못된 예시 (Bad)
일반 객체처럼 구조분해를 해버리면 Vue의 반응성 시스템이 끊어져 화면이 갱신되지 않습니다.
```vue
// 반응성이 깨지는 잘못된 접근
const { rawItems, activeItem } = useSampleStore();
```
