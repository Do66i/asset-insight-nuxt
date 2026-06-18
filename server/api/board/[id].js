// 게시글 상세 정보 조회 Mock Data API
export default defineEventHandler( async(event) => {
  // 주소창이나 요청 경로에서 id 파라미터 추출 (예: /api/board/1 -> '1')
  const id = getRouterParam(event, 'id');

  // 임시 데이터 저장소 (추후 Nest.js DB 데이터와 매핑될 구조)
  const mockPosts = {
    '1': { title: '미국 주식 ISA 계좌에서 굴려야 하는 이유', writer: '도토', date: '2026-06-18', content: '국내 계좌로 미국 주식을 직접 투자하면 양도소득세 22%가 부과되지만, ISA 계좌를 활용하면 비과세 및 분리과세 혜택을 극대화할 수 있습니다. 장기 자산 배분에 필수적입니다.' },
    '2': { title: '빅테크 분기 실적 발표 일정 및 관전 포인트', writer: 'Jini', date: '2026-06-17', content: '다음 주부터 주요 빅테크 기업들의 실적 발표가 시작됩니다. 특히 AI 관련 인프라 지출(CAPEX) 규모와 가이드라인 상향 여부가 시장의 방향성을 결정할 핵심 관전 포인트입니다.' },
    '3': { title: '포트폴리오 리밸런싱 주기는 어떻게 가져가시나요?', writer: '자산가', date: '2026-06-15', content: '자산 비중이 붕괴했을 때 기계적으로 매매하는 밴드 리밸런싱과 매 분기/반기마다 정기적으로 진행하는 기간 리밸런싱 중 본인의 투자 성향에 맞는 주기적 접근이 중요합니다.' }
  };

  // 요청된 id에 해당하는 글 데이터 반환 (없으면 null)
  return mockPosts[id] || null;
});
