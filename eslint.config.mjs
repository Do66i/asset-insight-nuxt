// eslint.config.mjs
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt([
  {
    // 프로젝트 전체 파일에 적용할 규칙 설정
    rules: {
      // 문장 끝 세미콜론(;) 필수 선언
      'semi': ['error', 'always'],

      // 문자열은 싱글 쿼터('') 사용 권장
      'quotes': ['error', 'single'],

      // 객체나 배열 마지막 요소 뒤에 콤마(,) 필수 (README 예시 문법 에러 방지)
      'comma-dangle': ['error', 'always-multiline'],

      // Vue 3 컴포넌트 이름은 다중 단어 권장이나, pages 내부 단일 파일 예외 처리를 위해 허용
      'vue/multi-word-component-names': 'off',

      // 디버깅용 console.log는 경고(warn) 처리
      'no-console': 'warn'
    }
  }
]);
