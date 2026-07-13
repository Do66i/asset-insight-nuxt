// utils/boardDummy.js

// 설명: 주식 및 ISA 인사이트 게시판용 15개 정석 마스터 더미 데이터셋
export const dummyArticles = [
  { id: '1', title: '국내 계좌로 미국 주식 거래 시 양도소득세 절세 팁', category: '미국주식', summary: '해외주식 매매차익 양도소득세 공제 한도와 가족 간 증여를 활용한 절세 메커니즘 분석', writer: '도토', userTier: '고인물', postCount: 142, likeCount: 3200, date: '2026-06-20' },
  { id: '2', title: 'ISA 계좌 배당금 비과세 한도 200% 활용하기', category: 'ISA', summary: '정부 고도화 세제 개편안에 따른 ISA 비과세 혜택 극대화 전략 및 추천 고배당주 리스트', writer: '운영자', userTier: '고인물', postCount: 89, likeCount: 1500, date: '2026-06-19' },
  { id: '3', title: '테슬라 vs 엔비디아, 하반기 포트폴리오 비중 고민', category: '포트폴리오', summary: '빅테크 대장주 간의 밸류에이션 비교 및 리스크 분산을 위한 적정 투자 비중 조율 가이드', writer: 'Doto', userTier: '왕관', postCount: 54, likeCount: 920, date: '2026-06-18' },
  { id: '4', title: '초보자를 위한 미국 주식 소수점 투자 시작하기', category: '미국주식', summary: '커피 한 잔 값으로 우량 빅테크 주식을 모아가는 소수점 매매의 장단점과 수수료 비교', writer: '주린이성장기', userTier: '병아리', postCount: 3, likeCount: 12, date: '2026-06-17' },
  { id: '5', title: '고배당 ETF 투자의 함정: 배당락과 원금 갉아먹기 경계령', category: '포트폴리오', summary: '연 10% 이상 고배당을 고지하는 커버드콜 ETF의 분배금 함정과 장기 플랜 대응법', writer: '자산가', userTier: '왕관', postCount: 210, likeCount: 4500, date: '2026-06-16' },
  { id: '6', title: '2026년 하반기 연방공개시장위원회(FOMC) 금리 전망 시나리오', category: '미국주식', summary: '미국 인플레이션 지표 추이에 따른 연준의 추가 금리 인하 타이밍과 증시 영향 권역 분석', writer: '매크로마스터', userTier: '고인물', postCount: 75, likeCount: 880, date: '2026-06-15' },
  { id: '7', title: 'ISA 의무 가입 기간 3년 채운 후 일반 계좌 이전 시 주의점', category: 'ISA', summary: '만기 도래한 ISA 자산을 연금저축펀드로 전환하여 추가 세액공제 혜택을 받는 연계 루트', writer: '세금박사', userTier: '고인물', postCount: 94, likeCount: 1200, date: '2026-06-14' },
  { id: '8', title: '엔화 약세 마감 국면, 일본 반도체 주식 투자 기회인가', category: '포트폴리오', summary: '엔화 반등 시나리오와 글로벌 반도체 공급망 재편 속에서 수혜를 입을 일본 핵심 기업 리서치', writer: '글로벌개미', userTier: '병아리', postCount: 12, likeCount: 45, date: '2026-06-13' },
  { id: '9', title: '애플의 AI 인프라 온디바이스 탑재와 교체 주기 도래 모멘텀', category: '미국주식', summary: '자체 인공지능 탑재 하드웨어 출시 주기에 맞춘 실적 턴어라운드 및 장기 밸류에이션 상향 추이', writer: '테크홀릭', userTier: '왕관', postCount: 62, likeCount: 710, date: '2026-06-12' },
  { id: '10', title: '해외 주식 소득세 분리과세 적용 범위와 금융소득종합과세 회피', category: '미국주식', summary: '연간 금융소득 2천만 원 초과 시 발생하는 세무 리스크와 부부 분산 명의를 통한 방어 요령', writer: '도토', userTier: '고인물', postCount: 142, likeCount: 3200, date: '2026-06-11' },
  { id: '11', title: '배당성장주의 매력: 분기 배당으로 월세 만드는 포트폴리오 짜기', category: '포트폴리오', summary: 'SCHD, O 등 안정적인 배당 성장을 보여주는 미국 핵심 자산 기반의 패시브 인컴 구조대', writer: '리치대디', userTier: '왕관', postCount: 118, likeCount: 2300, date: '2026-06-10' },
  { id: '12', title: '주식 양도세 신고 대행 서비스 이용 시 필수 증빙 서류 정리', category: '미국주식', summary: '5월 해외주식 확정신고 기간을 앞두고 증권사 홈택스 원천징수 영수증 발급 가이드라인', writer: '김대리', userTier: '병아리', postCount: 5, likeCount: 8, date: '2026-06-09' },
  { id: '13', title: '빅테크 버블 논쟁 진단: 2000년 닷컴버블과 지금이 다른 이유', category: '미국주식', summary: '실적 없이 주가만 올랐던 과거와 달리 견고한 현금흐름과 인프라 장악력을 가진 빅테크 재평가', writer: '운영자', userTier: '고인물', postCount: 89, likeCount: 1500, date: '2026-06-08' },
  { id: '14', title: '국내 상장 미국 S&P500 ETF 투자, 어떤 증권사 상품이 유리할까', category: 'ISA', summary: '총보수 수수료, 기타 비용, 그리고 추적오차율을 비교하여 선택하는 최적의 지수 추종 상품', writer: '재테크요정', userTier: '병아리', postCount: 22, likeCount: 190, date: '2026-06-07' },
  { id: '15', title: '미국 경기 침체 우려 R의 공포를 이겨내는 자산 배분 전략', category: '포트폴리오', summary: '주식 일변도 투자에서 벗어나 미국 장기채(TLT) 및 금(GLD) 자산을 혼합하는 올웨더 포트폴리오', writer: 'Doto', userTier: '왕관', postCount: 54, likeCount: 920, date: '2026-06-06' }
];
