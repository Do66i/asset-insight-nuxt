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
