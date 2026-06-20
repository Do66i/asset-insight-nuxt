// 인사이트 게시판 목록 Mock Data API
export default defineEventHandler ( async () => {
  // 추후 Nest.js 완성 시 이 형식 그대로 받아올 예정임

  return [
    { id: 1, title: '미국 주식 ISA 계좌에서 굴려야 하는 이유', writer: '도토', date: '2026-06-18' },
    { id: 2, title: '빅테크 분기 실적 발표 일정 및 관전 포인트', writer: 'Jini', date: '2026-06-17' },
    { id: 3, title: '포트폴리오 리밸런싱 주기는 어떻게 가져가시나요?', writer: '자산가', date: '2026-06-15' },
  ];
});
