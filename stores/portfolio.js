import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

// 설명: 자산 포트폴리오 상태 및 CRUD 비즈니스 로직 관리 스토어
export const usePortfolioStore = defineStore('portfolio', () => {
  // ----- State -----
  // 초기 더미 자산 데이터 리스트
  const assetList = ref([
    { id: 1, name: '애플 (AAPL)', quantity: 10, avgPrice: 175.5, currentPrice: 180.2 },
    { id: 2, name: '마이크로소프트 (MSFT)', quantity: 5, avgPrice: 400.0, currentPrice: 420.5 },
  ]);

  // ----- (Getters)Computed -----
  // 총 매수 금액 계산 (원래의 파싱/연산 절차 축약 없이 온전히 유지)
  const totalPurchaseAmount = computed(() => {
    return assetList.value.reduce((sum, asset) => {
      return sum + (asset.quantity * asset.avgPrice);
    }, 0);
  });

  // 총 평가 금액 계산
  const totalEvaluationAmount = computed(() => {
    return assetList.value.reduce((sum, asset) => {
      return sum + (asset.quantity * asset.currentPrice);
    }, 0);
  });

  // 총 수익률 계산
  const totalReturnRate = computed(() => {
    const purchase = totalPurchaseAmount.value;
    const evaluation = totalEvaluationAmount.value;
    if (purchase === 0) {
      return 0;
    }
    return ((evaluation - purchase) / purchase) * 100;
  });

  // ----- Actions -----
  // 새로운 자산 추가 (결합도를 위해 단일 객체 파라미터 구조 준수)
  const addAsset = (newAsset) => {
    const nextId = assetList.value.length > 0 ? Math.max(...assetList.value.map(a => a.id)) + 1 : 1;
    assetList.value.push({
      id: nextId,
      name: newAsset.name,
      quantity: Number(newAsset.quantity),
      avgPrice: Number(newAsset.avgPrice),
      currentPrice: Number(newAsset.avgPrice), // 초기 현재가는 매수 단가와 동일하게 설정
    });
  };

  // 특정 자산 삭제
  const deleteAsset = (id) => {
    assetList.value = assetList.value.filter((asset) => asset.id !== id);
  };

  // ----- Return -----
  //
  return {
    assetList,
    totalPurchaseAmount,
    totalEvaluationAmount,
    totalReturnRate,
    addAsset,
    deleteAsset,
  };
});
