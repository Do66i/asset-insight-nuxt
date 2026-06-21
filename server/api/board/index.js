// server/api/board/index.js
import { dummyArticles } from '@/utils/boardDummy.js';

// 설명: 프론트엔드의 검색 및 페이지네이션 조건에 응답하는 서버 라우터 서브시스템
export default defineEventHandler((event) => {
  const query = getQuery(event);

  // 파라미터 수급 및 기본값 예외 가드 처리
  const searchType = query.searchType || 'all'; // all: 제목+본문, writer: 닉네임
  const keyword = query.keyword ? String(query.keyword).trim().toLowerCase() : '';
  const page = Math.max(1, parseInt(query.page || '1', 10));
  const limit = Math.max(1, parseInt(query.limit || '6', 10)); // 한 페이지당 6개 카드 배치

  let filtered = [...dummyArticles];

  // 1. 하이브리드 검색 조건 필터링 엔진 가동
  if (keyword) {
    if (searchType === 'writer') {
      // 닉네임 검색
      filtered = filtered.filter(item =>
        item.writer.toLowerCase().includes(keyword)
      );
    } else {
      // 제목 + 본문(summary) 종합 검색
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(keyword) ||
        item.summary.toLowerCase().includes(keyword)
      );
    }
  }

  // 전체 카운트 계산
  const totalCount = filtered.length;

  // 2. 정석 페이지네이션 슬라이싱 연산
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedList = filtered.slice(startIndex, endIndex);

  // 결과 구조 원자적 반환 (프론트가 읽기 편하게 가공 오브젝트 리턴)
  return {
    list: paginatedList,
    totalCount,
    totalPages: Math.ceil(totalCount / limit),
    currentPage: page
  };
});
