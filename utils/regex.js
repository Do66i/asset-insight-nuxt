// utils/regex.js

// ----- 숫자 및 소수점만 허용 (포트폴리오 입력용) -----
export const allowOnlyNumberAndDot = (val) => {
  if (typeof val !== 'string') {
    return '';
  }
  return val.replace(/[^0-9.]/g, '');
};

// ----- 순수 숫자만 허용 (정수형 입력용) -----
export const allowOnlyDigits = (val) => {
  if (typeof val !== 'string') {
    return '';
  }
  return val.replace(/[^0-9]/g, '');
};

// ----- 이메일 형식 검증 -----
export const isValidEmail = (val) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(val);
};

// ----- 한글만 허용 -----
export const allowOnlyKorean = (val) => {
  if (typeof val !== 'string') {
    return '';
  }
  return val.replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, '');
};

// 설명: 아이디 규칙 검증 (4~12자 영문/숫자)
export const isValidId = (val) => {
  const idRegex = /^[a-zA-Z0-9]{4,12}$/;
  return idRegex.test(val);
};

// 설명: 비밀번호 임시 가이드 규칙 검증
export const isValidPasswordTemp = (val) => {
  return val.length >= 4;
};

// 설명: 입력 이벤트 시점에 영문 대소문자와 숫자만 남기고 한글/특수문자를 전량 강제 삭제하는 필터
export const allowOnlyAlphaNumeric = (val) => {
  if (!val) {
    return '';
  }
  return val.replace(/[^a-zA-Z0-9]/g, '');
};
