<template>
  <div class="signup-page"> <div class="signup-box">
    <h2>✨ 회원가입</h2>

    <p class="step-guide-text">
      Rich-Asset 시작까지 총 <strong>{{ totalSteps }}개</strong>의 입력이 필요합니다.
    </p>

    <form @submit.prevent="handleSignup" novalidate>

      <div class="step-field-block">
        <common-base-input
          v-model="form.username"
          type="text"
          label="아이디 (필수)"
          placeholder="4~12자 영문, 숫자 조합"
          :error-message="errors.username"
          @input="handleInputUsername"
          @keydown="handleKeydownAlphaNumeric"
          @paste.prevent
        />
      </div>

      <transition name="slide-in">
        <div v-if="isUsernameFilled" class="step-field-block">
          <common-base-input
            v-model="form.password"
            type="password"
            label="비밀번호 (필수)"
            placeholder="8자 이상 영문, 숫자, 특수문자 조합"
            :error-message="errors.password"
          />
        </div>
      </transition>

      <transition name="slide-in">
        <div v-if="isPasswordFilled" class="step-field-block">
          <common-base-input
            v-model="form.nickname"
            type="text"
            label="닉네임 (선택)"
            placeholder="미입력 시 아이디로 설정됩니다"
            :error-message="errors.nickname"
          />
        </div>
      </transition>

      <transition name="fade-in">
        <div v-if="isPasswordFilled" class="btn-wrap">
          <button type="submit">가입 완료하고 자산 키우기</button>
        </div>
      </transition>

      <div class="back-link">
        <NuxtLink to="/login">이미 계정이 있으신가요? 로그인하기</NuxtLink>
      </div>
    </form>
  </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue';
import { useAuthStore } from '@/stores/auth.js';
import { isValidId, isValidPasswordTemp, allowOnlyAlphaNumeric } from '@/utils/regex.js';

// ----- Props / Emits -----

// ----- Composables -----
const authStore = useAuthStore();
const router = useRouter();

// ----- State -----
const totalSteps = 3;

const form = reactive({
  username: '',
  password: '',
  nickname: '',
});

const errors = reactive({
  username: '',
  password: '',
  nickname: '',
});

// ----- Computed -----
const isUsernameFilled = computed(() => {
  return form.username.trim().length > 0;
});

const isPasswordFilled = computed(() => {
  return isUsernameFilled.value && form.password.trim().length > 0;
});

// ----- Watchers -----

// ----- Lifecycle Hooks -----

// ----- Methods -----
// 설명: 아이디 입력 시 영문/숫자 외 가공 및 에러 초기화
const handleInputUsername = () => {
  form.username = allowOnlyAlphaNumeric(form.username);
  errors.username = '';
};

// 설명: 키보드가 눌리는 최초의 물리적 시점에 영문 대소문자, 숫자, 제어키 외의 입력을 완전 차단
const handleKeydownAlphaNumeric = (event) => {
  // 백스페이스, 딜리트, 방향키, 탭키 등 필수 제어 키들은 허용 목록에 등록
  const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
  // 입력된 키 값이 순수 영문 대소문자 및 숫자 범위인지 정규식 검전
  const isAlphaNumeric = /^[a-zA-Z0-9]$/.test(event.key);

  // 허용된 키도 아니고, 영문/숫자도 아니라면 브라우저의 렌더링 동작을 전면 취소
  if (!isAlphaNumeric && !allowedKeys.includes(event.key)) {
    event.preventDefault();
  }
};

// 설명: 회원가입 시점에 모든 필드를 한꺼번에 검증하는 일괄 유효성 가드
const validateAllFields = () => {
  let isValid = true;

  if (!form.username.trim()) {
    errors.username = '아이디를 필수 입력해 주세요.';
    isValid = false;
  } else if (!isValidId(form.username)) {
    errors.username = '아이디는 4~12자의 영문 또는 숫자여야 합니다.';
    isValid = false;
  } else {
    errors.username = '';
  }

  if (!form.password.trim()) {
    errors.password = '비밀번호를 필수 입력해 주세요.';
    isValid = false;
  } else if (!isValidPasswordTemp(form.password)) {
    errors.password = '비밀번호는 4자 이상이면 돼요 !';
    isValid = false;
  } else {
    errors.password = '';
  }

  return isValid;
};

// 회원가입 최종 서브밋 핸들러
const handleSignup = () => {
  if (!validateAllFields()) {
    return;
  }

  const finalNickname = form.nickname.trim() ? form.nickname : form.username;

  authStore.signup({
    username: form.username,
    password: form.password,
    nickname: finalNickname,
  });

  router.push('/login');
};
</script>
