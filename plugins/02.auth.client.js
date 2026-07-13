// app/plugins/02.auth.client.js
import { useAuthStore } from '@/stores/auth.js';

export default defineNuxtPlugin({
  name: 'auth-client',
  dependsOn: ['pinia'], // ← pinia 초기화 이후에 실행 보장
  setup() {
    const authStore = useAuthStore();

    if (authStore.isAuthenticated) return;

    const authCookie = useCookie('auth-user', {
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

    if (authCookie.value) {
      authStore.setUser(authCookie.value);
    }
  },
});
