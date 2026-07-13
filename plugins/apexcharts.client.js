// plugins/apexcharts.client.js
import { defineNuxtPlugin } from '#app';
import VueApexCharts from 'vue3-apexcharts';

// 설명: 브라우저 DOM 컨텍스트 자원을 사용하는 ApexCharts 라이브러리를 클라이언트 환경에"만" 전역 주입
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueApexCharts);
})
