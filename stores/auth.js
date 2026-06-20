// stores/auth.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

// 설명: 사용자 로그인 인증 상태 및 회원 정보 전역 관리 스토어
export const useAuthStore = defineStore('auth', () => {
  // ----- State -----
  // 로그인한 유저의 정보 (null이면 비로그인 상태)
  const user = ref(null);

  // 설명: 회원가입한 사용자 데이터를 임시 적재할 가짜 인메모리 DB 배열 (doto 계정 기본 내장)
  const mockUsers = ref([
    { username: 'doto', password: '1234', nickname: 'Doto', email: 'doto@ballet.com' },
  ]);

  // ----- Getters -----
  // 유저가 로그인 상태인지 여부를 반환하는 가이드 연산
  const isAuthenticated = computed(() => {
    return user.value !== null;
  });

  // ----- Actions -----
  // 가짜 로그인 처리 액션 (결합도를 위해 객체 바인딩 형식 준수)
  const login = (credentials) => {
    // 설명: 가입된 유저 리스트에서 아이디와 비밀번호가 정확히 일치하는 계정 조회
    const foundUser = mockUsers.value.find(
      (u) => u.username === credentials.username && u.password === credentials.password
    );

    if (foundUser) {
      user.value = {
        nickname: foundUser.nickname,
        email: foundUser.email || `${foundUser.username}@rich.com`,
      };
      return true;
    }
    return false;
  };

  // 설명: 회원가입 폼에서 넘어온 유저 객체를 가짜 DB에 적재하는 액션
  const signup = (userData) => {
    mockUsers.value.push({
      username: userData.username,
      password: userData.password,
      nickname: userData.nickname,
      email: `${userData.username}@rich.com`,
    });
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
    signup, // 설명: 신설된 회원가입 액션 외부 반환 명시
    logout,
  };
});
