import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useAuthStore = defineStore('auth', () => {

  // ----- State -----
  const isLoggedIn = ref(false); // 로그인 여부 상태값
  const userProfile = ref(null); // 로그인한 유저 정보 객체

  // ----- (Getter)Computed -----
  const userNickname = computed(() => {
    if (!userProfile.value) {
      return '게스트';
    }
    return userProfile.value.nickname || '이름 없음';
  });

  // ----- Actions -----
  // 가짜 로그인 처리 함수
  const login = (userInfo) => {
    isLoggedIn.value = true;
    userProfile.value = {
      id: userInfo.id,
      nickname: '궉춘뫼',
    };
  };

  // 로그아웃 처리 함수
  const logout = () => {
    isLoggedIn.value = false;
    userProfile.value = null;
  };
  // ----- Return -----
  //
  return {
    isLoggedIn,
    userProfile,
    userNickname,
    login,
    logout,
  };
});
