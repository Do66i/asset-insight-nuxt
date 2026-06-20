// app/middleware/auth.global.js
// ✅ import 제거 — Nuxt 4 auto-import가 처리함
import { useAuthStore } from "@/stores/auth.js";

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();

  if (!authStore.isAuthenticated && to.path.startsWith('/portfolio')) {
    return navigateTo('/login');
  }

  if (authStore.isAuthenticated && (to.path === '/login' || to.path === '/signup')) {
    return navigateTo('/');
  }
});
