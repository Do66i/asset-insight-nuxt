// app/composables/useAuth.js
import { useAuthStore } from '@/stores/auth.js'; // ← 이거 추가

export const useAuth = () => {
  const authStore = useAuthStore();

  const authCookie = useCookie('auth-user', {
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax',
    default: () => null,
    encode: (val) => JSON.stringify(val),
    decode: (val) => {
      try {
        return typeof val === 'string' ? JSON.parse(val) : val;
      } catch {
        return null;
      }
    },
  });

  const login = (credentials) => {
    const success = authStore.login(credentials);
    if (success) {
      // 스토어 로그인 후 user 값을 쿠키에 동기화
      authCookie.value = authStore.user;
    }
    return success;
  };

  const logout = () => {
    authStore.logout();
    authCookie.value = null;
  };

  return { login, logout };
};
