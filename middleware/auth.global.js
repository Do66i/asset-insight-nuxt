import { useAuthStore } from '@/stores/auth.js';

// 설명: 페이지 이동 시마다 로그인 인증 여부를 가로채서 검증하는 글로벌 라우터 가드
export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();

  const publicPage = ['/login', '/'];

  // 로그인하지 않은 상태에서 '공개 페이지 목록'에 없는 보호된 주소(포트폴리오, 게시판 등)로 가려고 할 때
  if (!authStore.isAuthenticated && !publicPage.includes(to.path)) {
    // 플레이스 홀더 경고 및 로그인 페이지로 리다이렉트 유도
    return navigateTo('/login');
  }

  // 이미 로그인한 상태인데 로그인 페이지(`/login`)로 가려고 하면 메인 홈으로 돌려보내기
  if (authStore.isAuthenticated && to.path === '/login') {
    return navigateTo('/');
  }
});
