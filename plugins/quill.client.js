import { defineNuxtPlugin } from '#app';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

// 설명: 브라우저 환경 전용 에디터 라이브러리를 안전하게 주입하기 위한 클라이언트 전용 플러그인
export default defineNuxtPlugin((nuxtApp) => {
    // 설명: 글로벌 컴포넌트로 등록하여 전역 템플릿 어디서나 사용할 수 있도록 아키텍처 매핑
    nuxtApp.vueApp.component('QuillEditor', QuillEditor);
});