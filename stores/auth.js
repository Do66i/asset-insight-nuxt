// stores/auth.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

// 설명: 사용자 로그인 인증 상태 및 회원 정보 전역 관리 스토어
export const useAuthStore = defineStore('auth', () => {
  // ----- State -----
  // 로그인한 유저의 정보 (null이면 비로그인 상태)
  const user = ref(null);

  // ----- Getters -----
  // 유저가 로그인 상태인지 여부를 반환하는 가이드 연산
  const isAuthenticated = computed(() => {
    return user.value !== null;
  });

  // ----- Actions -----
  // 가짜 로그인 처리 액션 (결합도를 위해 객체 바인딩 형식 준수)
  const login = (credentials) => {
    // 실제 백엔드 연동 전까지 가짜 인증 처리
    if (credentials.username === 'doto' && credentials.password === '1234') {
      user.value = {
        nickname: 'Doto',
        email: 'doto@ballet.com',
      };
      return true;
    }
    return false;
  };

  // 로그아웃 처리 액션
  const logout = () => {
    user.value = null;
  };

  // ----- Return -----
  return {
    user,
    isAuthenticated,
    login,
    logout,
  };
});
