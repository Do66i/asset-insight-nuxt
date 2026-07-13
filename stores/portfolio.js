// stores/portfolio.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

// 설명: 자산 포트폴리오 상태 및 CRUD 비즈니스 로직 관리 스토어
export const usePortfolioStore = defineStore('portfolio', () => {
  // ----- State -----
  const assetList = ref([{
    id: 1,
    name: '애플 (AAPL)',
    quantity: 10,
    avgPrice: 175.5,
    currentPrice: 180.2
  }, //
    {
      id: 2,
      name: '마이크로소프트 (MSFT)',
      quantity: 5,
      avgPrice: 400.0,
      currentPrice: 420.5
    }, //
  ]);

  // ----- (Getters)Computed -----
  const totalPurchaseAmount = computed(() => {
    return assetList.value.reduce((sum, asset) => {
      return sum + (asset.quantity * asset.avgPrice); //
    }, 0);
  });

  const totalEvaluationAmount = computed(() => {
    return assetList.value.reduce((sum, asset) => {
      return sum + (asset.quantity * asset.currentPrice); //
    }, 0);
  });

  const totalReturnRate = computed(() => {
    const purchase = totalPurchaseAmount.value; //
    const evaluation = totalEvaluationAmount.value; //
    if (purchase === 0) {
      return 0; //
    }
    return ((evaluation - purchase) / purchase) * 100; //
  });

  // ----- Actions -----
  const addAsset = (newAsset) => {
    const nextId = assetList.value.length > 0 ? Math.max(...assetList.value.map(a => a.id)) + 1 : 1; //
    assetList.value.push({
      id: nextId, //
      name: newAsset.name, //
      quantity: Number(newAsset.quantity), //
      avgPrice: Number(newAsset.avgPrice), //
      currentPrice: Number(newAsset.avgPrice), //
    });
  };

  const deleteAsset = (id) => {
    assetList.value = assetList.value.filter((asset) => asset.id !== id); //
  };

  // ----- Return -----
  return {
    assetList,
    totalPurchaseAmount,
    totalEvaluationAmount,
    totalReturnRate,
    addAsset,
    deleteAsset
  }
});
