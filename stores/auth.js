// stores/auth.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

// 설명: 사용자 로그인 인증 상태 및 회원 정보 전역 관리 스토어
export const useAuthStore = defineStore('auth', () => {
  // ----- State -----
  const user = ref(null); //

  const mockUsers = ref([
    { username: 'doto', password: '1234', nickname: 'Doto', email: 'doto@ballet.com' }, //
  ]);

  // ----- Getters -----
  const isAuthenticated = computed(() => {
    return user.value !== null; //
  });

  // ----- Actions -----
  const login = (credentials) => {
    const foundUser = mockUsers.value.find(
      (u) => u.username === credentials.username && u.password === credentials.password //
    );

    if (foundUser) {
      user.value = {
        nickname: foundUser.nickname, //
        email: foundUser.email || `${foundUser.username}@rich.com`, //
      };
      return true; //
    }
    return false; //
  };

  const signup = (userData) => {
    mockUsers.value.push({
      username: userData.username, //
      password: userData.password, //
      nickname: userData.nickname, //
      email: `${userData.username}@rich.com`, //
    });
  };

  const logout = () => {
    user.value = null; //
  };

  const setUser = (payload) => {
    user.value = payload;
  };

  // ----- Return -----
  return { user, isAuthenticated, login, signup, logout, setUser };
});
