<template>
  <div class="portfolio-page">
    <h2>📊 자산 포트폴리오 관리</h2>

    <section class="summary-card">
      <div class="summary-item">
        <span class="label">총 매수 금액</span>
        <span class="value">${{ totalPurchaseAmount.toFixed(2) }}</span>
      </div>
      <div class="summary-item">
        <span class="label">총 평가 금액</span>
        <span class="value">${{ totalEvaluationAmount.toFixed(2) }}</span>
      </div>
      <div class="summary-item">
        <span class="label">총 수익률</span>
        <span class="value" :class="{ 'plus': totalReturnRate > 0, 'minus': totalReturnRate < 0 }">
          {{ totalReturnRate.toFixed(2) }}%
        </span>
      </div>
    </section>

    <section class="asset-form">
      <h3>➕ 새로운 자산 추가</h3>
      <form @submit.prevent="handleSubmit" novalidate>
        <common-base-input
          v-model="form.name"
          type="text"
          placeholder="종목명 (예: 엔비디아)"
          :error-message="errors.name"
          @input="handleInputName"
        />
        <common-base-input
          v-model="form.quantity"
          type="text"
          placeholder="수량"
          :error-message="errors.quantity"
          @input="handleInputQuantity"
        />
        <common-base-input
          v-model="form.avgPrice"
          type="text"
          placeholder="평균 단가 ($)"
          :error-message="errors.avgPrice"
          @input="handleInputAvgPrice"
        />
        <div class="btn-wrap">
          <button type="submit">추가하기</button>
        </div>
      </form>
    </section>

    <section class="asset-list-section">
      <h3>📋 보유 자산 현황</h3>

      <common-no-data
        v-if="assetList.length === 0"
        message="등록된 자산 포트폴리오가 없습니다. 새로운 자산을 추가해 주세요."
      />

      <table v-else class="asset-table">
        <thead>
        <tr>
          <th>종목명</th>
          <th>보유 수량</th>
          <th>평균 단가</th>
          <th>현재가</th>
          <th>평가 손익</th>
          <th>관리</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="asset in assetList" :key="asset.id">
          <td>{{ asset.name }}</td>
          <td>{{ asset.quantity }}</td>
          <td>${{ asset.avgPrice.toFixed(2) }}</td>
          <td>${{ asset.currentPrice.toFixed(2) }}</td>
          <td :class="{ 'plus': asset.currentPrice > asset.avgPrice, 'minus': asset.currentPrice < asset.avgPrice }">
            ${{ ((asset.currentPrice - asset.avgPrice) * asset.quantity).toFixed(2) }}
          </td>
          <td>
            <button @click="handleDelete(asset.id)" class="delete-btn">삭제</button>
          </td>
        </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { usePortfolioStore } from '@/stores/portfolio.js';

// ----- Props / Emits -----

// ----- Composables -----
const portfolioStore = usePortfolioStore();
const { assetList, totalPurchaseAmount, totalEvaluationAmount, totalReturnRate } = storeToRefs(portfolioStore);
const { addAsset, deleteAsset } = portfolioStore;

// ----- State -----
const form = reactive({
  name: '',
  quantity: '',
  avgPrice: '',
});

const errors = reactive({
  name: '',
  quantity: '',
  avgPrice: '',
});

// ----- Computed -----

// ----- Watchers -----

// ----- Lifecycle Hooks -----

// ----- Methods -----
// 전체 폼 유효성 검사
const validateForm = () => {
  let isValid = true;

  if (!form.name.trim()) {
    errors.name = '종목명을 입력해 주세요.';
    isValid = false;
  } else {
    errors.name = '';
  }

  if (!form.quantity.trim()) {
    errors.quantity = '보유 수량을 입력해 주세요.';
    isValid = false;
  } else {
    errors.quantity = '';
  }

  if (!form.avgPrice.trim()) {
    errors.avgPrice = '평균 매수 단가를 입력해 주세요.';
    isValid = false;
  } else {
    errors.avgPrice = '';
  }

  return isValid;
};

// 설명: 종목명 입력 시 실시간 유효성 검사 및 경고 노출 제어
const handleInputName = () => {
  if (form.name.trim()) {
    errors.name = '';
  } else {
    errors.name = '종목명을 입력해 주세요.';
  }
};

// 설명: 수량 입력 시 숫자 필터링 및 실시간 경고 제어
const handleInputQuantity = () => {
  form.quantity = allowOnlyNumberAndDot(form.quantity);
  if (form.quantity.trim()) {
    errors.quantity = '';
  } else {
    errors.quantity = '보유 수량을 입력해 주세요.';
  }
};

// 설명: 평균 단가 입력 시 숫자 필터링 및 실시간 경고 제어
const handleInputAvgPrice = () => {
  form.avgPrice = allowOnlyNumberAndDot(form.avgPrice);
  if (form.avgPrice.trim()) {
    errors.avgPrice = '';
  } else {
    errors.avgPrice = '평균 매수 단가를 입력해 주세요.';
  }
};

// 자산 등록 처리
const handleSubmit = () => {
  if (!validateForm()) {
    return;
  }

  addAsset({ ...form });

  form.name = '';
  form.quantity = '';
  form.avgPrice = '';
  errors.name = '';
  errors.quantity = '';
  errors.avgPrice = '';
};

// 자산 삭제 처리
const handleDelete = (id) => {
  deleteAsset(id);
};
</script>

<style scoped lang="scss">
/* 반응형 스타일 유지 */
.portfolio-page {
  padding: 1rem 0;

  .summary-card {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: #F4F6F8;
    padding: 1.25rem;
    border-radius: 8px;
    margin-bottom: 2rem;

    .summary-item {
      display: flex;
      flex-direction: column;

      .label { font-size: 0.8rem; color: #747D87; margin-bottom: 0.25rem; }
      .value {
        font-size: 1.2rem; font-weight: bold; color: #16191C;
        &.plus { color: #D14D4D; }
        &.minus { color: #4D7BD1; }
      }
    }

    @media (min-width: 768px) {
      flex-direction: row;
      gap: 1.5rem;
      padding: 1.5rem;

      .summary-item {
        flex: 1;
        .label { font-size: 0.85rem; margin-bottom: 0.5rem; }
        .value { font-size: 1.3rem; }
      }
    }
  }

  .asset-form {
    margin-bottom: 2rem;

    form {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-top: 0.75rem;

      .btn-wrap {
        width: 100%;
        button {
          width: 100%; padding: 0.625rem 1rem; background-color: #16191C; color: #fff;
          border: none; border-radius: 4px; font-size: 0.95rem; cursor: pointer;
          transition: background-color 0.2s ease;
          &:hover { background-color: #2D3135; }
        }
      }
    }

    @media (min-width: 768px) {
      form {
        flex-direction: row;
        align-items: flex-start;
        gap: 0.75rem;

        .btn-wrap {
          width: auto;
          button { width: auto; padding: 0.625rem 1.25rem; }
        }
      }
    }
  }

  .asset-list-section {
    width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch;

    .asset-table {
      width: 100%; min-width: 600px; border-collapse: collapse; margin-top: 0.5rem;

      th, td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #E9ECEF; white-space: nowrap; }
      th { background-color: #F8F9FA; color: #454B52; font-size: 0.85rem; }
      td {
        font-size: 0.9rem;
        .delete-btn {
          padding: 0.35rem 0.625rem; background-color: #E2E8F0; border: none; border-radius: 4px;
          color: #4A5568; font-size: 0.85rem; cursor: pointer;
          &:hover { background-color: #CBD5E1; }
        }
        &.plus { color: #D14D4D; }
        &.minus { color: #4D7BD1; }
      }
    }
  }
}
</style>
