
import { Category, SubCategory, Question, DetailedFeedback } from './types';

export const QUESTIONS: Question[] = [
  // 1. 자기조절능력 (1-18)
  { id: 1, text: "나는 어려운 일이 닥쳤을 때 감정을 통제 할 수 있다.", category: Category.SELF_REGULATION, subCategory: SubCategory.EMOTION_CONTROL, isReverse: false },
  { id: 2, text: "내가 무슨 생각을 하면, 그 생각이 내 기분에 어떤 영향을 미칠지 잘 알아챈다.", category: Category.SELF_REGULATION, subCategory: SubCategory.EMOTION_CONTROL, isReverse: false },
  { id: 3, text: "논쟁거리가 되는 문제를 가족이나 친구들과 토론할 때 내 감정을 잘 통제할 수 있다.", category: Category.SELF_REGULATION, subCategory: SubCategory.EMOTION_CONTROL, isReverse: false },
  { id: 4, text: "집중해야 할 중요한 일이 생기면 신바람이 나기보다는 더 스트레스를 받는 편이다.", category: Category.SELF_REGULATION, subCategory: SubCategory.EMOTION_CONTROL, isReverse: true },
  { id: 5, text: "나는 내 감정에 잘 휘말린다.", category: Category.SELF_REGULATION, subCategory: SubCategory.EMOTION_CONTROL, isReverse: true },
  { id: 6, text: "때때로 내 감정적인 문제 때문에 학교나 직장에서 공부하거나 일할 때 집중하기 힘들다.", category: Category.SELF_REGULATION, subCategory: SubCategory.EMOTION_CONTROL, isReverse: true },

  { id: 7, text: "당장 해야 할 일이 있으면 나는 어떠한 유혹이나 방해도 잘 이겨내고 할 일을 한다.", category: Category.SELF_REGULATION, subCategory: SubCategory.IMPULSE_CONTROL, isReverse: false },
  { id: 8, text: "아무리 당황스럽고 어려운 상황이 닥쳐도, 나는 내가 어떤 생각을 하고 있는지 스스로 잘 안다.", category: Category.SELF_REGULATION, subCategory: SubCategory.IMPULSE_CONTROL, isReverse: false },
  { id: 9, text: "누군가가 나에게 화를 낼 경우 나는 우선 그 사람의 의견을 잘 듣는다.", category: Category.SELF_REGULATION, subCategory: SubCategory.IMPULSE_CONTROL, isReverse: false },
  { id: 10, text: "일이 생각대로 잘 안 풀리면 쉽게 포기하는 편이다.", category: Category.SELF_REGULATION, subCategory: SubCategory.IMPULSE_CONTROL, isReverse: true },
  { id: 11, text: "평소 경제적인 소비나 지출 규모에 대해 별다른 계획 없이 지낸다.", category: Category.SELF_REGULATION, subCategory: SubCategory.IMPULSE_CONTROL, isReverse: true },
  { id: 12, text: "미리 계획을 세우기 보다는 즉흥적으로 일을 처리하는 편이다.", category: Category.SELF_REGULATION, subCategory: SubCategory.IMPULSE_CONTROL, isReverse: true },

  { id: 13, text: "문제가 생기면 여러 가지 가능한 해결 방안에 대해 먼저 생각한 후에 해결하려고 노력한다.", category: Category.SELF_REGULATION, subCategory: SubCategory.CAUSAL_ANALYSIS, isReverse: false },
  { id: 14, text: "어려운 일이 생기면 그 원인이 무엇인지 신중하게 생각한 후에 그 문제를 해결하려고 노력한다.", category: Category.SELF_REGULATION, subCategory: SubCategory.CAUSAL_ANALYSIS, isReverse: false },
  { id: 15, text: "나는 대부분의 상황에서 문제의 원인을 잘 알고 있다고 믿는다.", category: Category.SELF_REGULATION, subCategory: SubCategory.CAUSAL_ANALYSIS, isReverse: false },
  { id: 16, text: "나는 사건이나 상황을 잘 파악하지 못한다는 이야기를 종종 듣는다.", category: Category.SELF_REGULATION, subCategory: SubCategory.CAUSAL_ANALYSIS, isReverse: true },
  { id: 17, text: "문제가 생기면 나는 성급하게 결론을 내린다는 이야기를 종종 듣는다.", category: Category.SELF_REGULATION, subCategory: SubCategory.CAUSAL_ANALYSIS, isReverse: true },
  { id: 18, text: "어려운 일이 생기면 그 원인을 완전히 이해하지 못했다 하더라도 일단 빨리 해결하는 것이 좋다고 생각한다.", category: Category.SELF_REGULATION, subCategory: SubCategory.CAUSAL_ANALYSIS, isReverse: true },

  // 2. 대인관계능력 (19-36)
  { id: 19, text: "나는 분위기나 대화 상대에 따라 대화를 잘 이끌어 갈 수 있다.", category: Category.INTERPERSONAL, subCategory: SubCategory.COMMUNICATION, isReverse: false },
  { id: 20, text: "나는 재치 있는 농담을 잘한다.", category: Category.INTERPERSONAL, subCategory: SubCategory.COMMUNICATION, isReverse: false },
  { id: 21, text: "나는 내가 표현하고자 하는 바에 대한 적절한 문구나 단어를 잘 찾아낸다.", category: Category.INTERPERSONAL, subCategory: SubCategory.COMMUNICATION, isReverse: false },
  { id: 22, text: "나는 윗사람과 대화하는 것이 부담스럽다.", category: Category.INTERPERSONAL, subCategory: SubCategory.COMMUNICATION, isReverse: true },
  { id: 23, text: "나는 대화 중에 다른 생각을 하느라 대화 내용을 놓칠 때가 종종 있다.", category: Category.INTERPERSONAL, subCategory: SubCategory.COMMUNICATION, isReverse: true },
  { id: 24, text: "대화를 할 때 하고 싶은 말을 다 하지 못하고 주저할 때가 종종 있다.", category: Category.INTERPERSONAL, subCategory: SubCategory.COMMUNICATION, isReverse: true },

  { id: 25, text: "사람들의 얼굴 표정을 보면 어떤 감정인지 알 수 있다.", category: Category.INTERPERSONAL, subCategory: SubCategory.EMPATHY, isReverse: false },
  { id: 26, text: "슬퍼하거나 화를 내거나 당황하는 사람을 보면 그들이 어떤 생각을 하는지 잘 알 수 있다.", category: Category.INTERPERSONAL, subCategory: SubCategory.EMPATHY, isReverse: false },
  { id: 27, text: "동료가 화를 낼 경우 나는 그 이유를 꽤 잘 아는 편이다.", category: Category.INTERPERSONAL, subCategory: SubCategory.EMPATHY, isReverse: false },
  { id: 28, text: "나는 사람들의 행동 방식을 때로 이해하기 힘들다.", category: Category.INTERPERSONAL, subCategory: SubCategory.EMPATHY, isReverse: true },
  { id: 29, text: "친한 친구나 애인 혹은 배우자로부터 '당신은 나를 이해 못해'라는 말을 종종 듣는다.", category: Category.INTERPERSONAL, subCategory: SubCategory.EMPATHY, isReverse: true },
  { id: 30, text: "동료와 친구들은 내가 자기 말을 잘 듣지 않는다고 한다.", category: Category.INTERPERSONAL, subCategory: SubCategory.EMPATHY, isReverse: true },

  { id: 31, text: "나는 내 주변 사람들로부터 사랑과 관심을 받고 있다.", category: Category.INTERPERSONAL, subCategory: SubCategory.EGO_EXPANSION, isReverse: false },
  { id: 32, text: "나는 내 친구들을 정말로 좋아한다.", category: Category.INTERPERSONAL, subCategory: SubCategory.EGO_EXPANSION, isReverse: false },
  { id: 33, text: "내 주변 사람들은 내 기분을 잘 이해한다.", category: Category.INTERPERSONAL, subCategory: SubCategory.EGO_EXPANSION, isReverse: false },
  { id: 34, text: "서로 도움을 주고받는 친구가 별로 없는 편이다.", category: Category.INTERPERSONAL, subCategory: SubCategory.EGO_EXPANSION, isReverse: true },
  { id: 35, text: "나와 정기적으로 만나는 사람들은 대부분 나를 싫어하게 된다.", category: Category.INTERPERSONAL, subCategory: SubCategory.EGO_EXPANSION, isReverse: true },
  { id: 36, text: "서로 마음을 터놓고 얘기할 수 있는 친구가 거의 없다.", category: Category.INTERPERSONAL, subCategory: SubCategory.EGO_EXPANSION, isReverse: true },

  // 3. 긍정성 (37-53)
  { id: 37, text: "열심히 일하면 언제나 보답이 있으리라고 생각한다.", category: Category.POSITIVITY, subCategory: SubCategory.SELF_OPTIMISM, isReverse: false },
  { id: 38, text: "맞든 아니든 '아무리 어려운 문제라도 나는 해결할 수 있다'고 일단 믿는 것이 좋다고 생각한다.", category: Category.POSITIVITY, subCategory: SubCategory.SELF_OPTIMISM, isReverse: false },
  { id: 39, text: "어려운 상황이 닥쳐도 나는 모든 일이 다 잘 해결될 거라고 확신한다.", category: Category.POSITIVITY, subCategory: SubCategory.SELF_OPTIMISM, isReverse: false },
  { id: 40, text: "내가 어떤 일을 마치고 나면, 주변 사람들이 부정적인 평가를 할까 봐 걱정한다.", category: Category.POSITIVITY, subCategory: SubCategory.SELF_OPTIMISM, isReverse: true },
  { id: 41, text: "나에게 일어나는 대부분의 문제들은 나로서는 어쩔 수 없는 상황에 의해 발생한다고 믿는다.", category: Category.POSITIVITY, subCategory: SubCategory.SELF_OPTIMISM, isReverse: true },
  { id: 42, text: "누가 나의 미래에 대해 물어보면 성공한 나의 모습을 상상하기 힘들다.", category: Category.POSITIVITY, subCategory: SubCategory.SELF_OPTIMISM, isReverse: true },

  { id: 43, text: "내 삶은 내가 생각하는 이상적인 삶에 가깝다.", category: Category.POSITIVITY, subCategory: SubCategory.LIFE_SATISFACTION, isReverse: false },
  { id: 44, text: "내 인생의 여러 가지 조건들은 만족스럽다.", category: Category.POSITIVITY, subCategory: SubCategory.LIFE_SATISFACTION, isReverse: false },
  { id: 45, text: "나는 내 삶에 만족한다.", category: Category.POSITIVITY, subCategory: SubCategory.LIFE_SATISFACTION, isReverse: false },
  { id: 46, text: "나는 내 삶에서 중요하다고 생각한 것들은 다 갖고 있다.", category: Category.POSITIVITY, subCategory: SubCategory.LIFE_SATISFACTION, isReverse: false },
  { id: 47, text: "나는 다시 태어나도 나의 현재 삶을 다시 살고 싶다.", category: Category.POSITIVITY, subCategory: SubCategory.LIFE_SATISFACTION, isReverse: false },

  { id: 48, text: "나는 다양한 종류의 많은 사람들에게 고마움을 느낀다.", category: Category.POSITIVITY, subCategory: SubCategory.GRATITUDE, isReverse: false },
  { id: 49, text: "내가 고맙게 여기는 것들을 모두 적는다면 아주 긴 목록이 될 것이다.", category: Category.POSITIVITY, subCategory: SubCategory.GRATITUDE, isReverse: false },
  { id: 50, text: "나이가 들어갈수록 내 삶의 일부가 된 사람, 사건, 생활에 대해 감사하는 마음이 더 커져간다.", category: Category.POSITIVITY, subCategory: SubCategory.GRATITUDE, isReverse: false },
  { id: 51, text: "나는 감사해야 할 것이 별로 없다.", category: Category.POSITIVITY, subCategory: SubCategory.GRATITUDE, isReverse: true },
  { id: 52, text: "세상을 둘러볼 때, 내가 고마워 할 것은 별로 없다.", category: Category.POSITIVITY, subCategory: SubCategory.GRATITUDE, isReverse: true },
  { id: 53, text: "사람이나 일에 대한 고마움을 한참 시간이 지난 후에야 겨우 느낀다.", category: Category.POSITIVITY, subCategory: SubCategory.GRATITUDE, isReverse: true }
];

export const PERSONA_RULES = [
  { min: 201, name: "슈퍼 고무공", emoji: "🏀", color: "#A3E635", desc: "어떤 바닥에 부딪혀도 더 높이 튀어 오르는 무적의 탄성! 당신은 어떤 역경도 성장의 발판으로 만듭니다." },
  { min: 181, name: "테니스공", emoji: "🎾", color: "#FFDE03", desc: "적당한 탄력을 가졌지만, 가끔 바람을 채워줄 관리(노력)가 필요합니다. 꾸준한 훈련으로 더 높이 튀어오를 수 있어요!" },
  { min: 0, name: "마시멜로우", emoji: "🍡", color: "#FF5C00", desc: "말랑말랑하고 부드럽지만, 충격을 받으면 모양이 쉽게 변해 보살핌이 필요합니다. 천천히 마음 근육을 키워봐요!" }
];

// 간단한 회복탄력성 설명
export const RESILIENCE_INTRO = {
  title: "회복탄력성이란?",
  subtitle: "마음의 근육 측정하기",
  description: "회복탄력성은 '마음의 근육'이에요! 넘어져도 다시 일어나는 힘, 힘든 일이 있어도 다시 웃을 수 있는 힘이죠.",
  benefits: [
    { icon: "💪", text: "스트레스를 건강하게 관리할 수 있어요" },
    { icon: "🔥", text: "어려운 상황에서도 포기하지 않아요" },
    { icon: "🚀", text: "실패해도 다시 도전하는 용기가 생겨요" },
    { icon: "😊", text: "더 행복하고 건강한 삶을 살 수 있어요" }
  ],
  howItWorks: "53개의 간단한 질문에 솔직하게 답하면, 당신의 마음 근육 상태를 알려드려요!",
  duration: "약 10-15분 소요"
};

// 하위 요인별 상세 피드백 데이터
export const DETAILED_FEEDBACK_DATA: Record<SubCategory, { high: DetailedFeedback; medium: DetailedFeedback; low: DetailedFeedback }> = {
  [SubCategory.EMOTION_CONTROL]: {
    high: {
      title: "뛰어난 감정 조절력",
      description: "당신은 어려운 상황에서도 감정을 잘 다스리는 능력이 있습니다. 스트레스 상황에서도 침착함을 유지하며, 감정에 휩쓸리지 않고 합리적인 판단을 내릴 수 있습니다.",
      currentState: "감정의 파도가 밀려와도 그 위에서 서핑하듯 유연하게 대처합니다. 이 능력은 리더십과 위기관리에서 큰 강점이 됩니다.",
      actionPlan: ["현재 수준 유지를 위해 명상이나 마음챙김 연습 지속", "주변 사람들의 감정 조절을 도와주는 멘토 역할 시도", "감정 조절 기술을 다른 사람과 공유하기"],
      weeklyMission: "이번 주 3번, 스트레스 상황에서 '3초 호흡법'을 실천하고 그 경험을 기록해보세요.",
      recommendedBooks: ["마음 챙김의 기술 - 존 카밧진", "감정은 선택이다 - 리사 펠드먼 배럿"],
      affirmation: "나는 어떤 상황에서도 내 감정의 주인입니다."
    },
    medium: {
      title: "발전 가능한 감정 조절력",
      description: "대체로 감정을 조절할 수 있지만, 특정 상황에서는 감정에 휩쓸릴 때가 있습니다. 꾸준한 연습으로 더 안정적인 감정 관리가 가능합니다.",
      currentState: "평소에는 감정 조절이 잘 되지만, 예상치 못한 상황이나 피곤할 때 감정 기복이 나타날 수 있습니다.",
      actionPlan: ["감정 일기 쓰기 - 매일 자신의 감정 변화 기록", "트리거 파악하기 - 어떤 상황에서 감정 조절이 어려운지 분석", "STOP 기법 연습 - 멈추고(Stop), 호흡하고(Take a breath), 관찰하고(Observe), 진행하기(Proceed)"],
      weeklyMission: "매일 밤 '오늘의 감정 일기'를 작성하세요. 가장 강렬했던 감정과 그 원인을 적어보세요.",
      recommendedBooks: ["감정 조절력 - 대니얼 골먼", "화가 날 때 읽는 책 - 틱낫한"],
      affirmation: "나는 매일 조금씩 더 나은 감정 조절 능력을 갖춰가고 있습니다."
    },
    low: {
      title: "감정 조절력 강화 필요",
      description: "감정에 휩쓸려 후회하는 행동을 할 때가 많습니다. 하지만 걱정하지 마세요 - 감정 조절력은 훈련으로 충분히 향상될 수 있습니다!",
      currentState: "작은 자극에도 감정이 크게 요동치고, 이로 인해 대인관계나 업무에 영향을 받을 수 있습니다.",
      actionPlan: ["6초 규칙 - 화가 날 때 6초간 아무것도 하지 않기 (뇌가 진정되는 시간)", "신체 활동으로 감정 해소 - 운동, 산책, 스트레칭", "감정 온도계 만들기 - 1-10점으로 현재 감정 상태 수시로 체크", "전문 상담 고려 - 필요시 심리상담 받기"],
      weeklyMission: "하루에 3번, 알람을 맞춰놓고 '지금 내 감정은 몇 점인가?'를 체크해보세요. 1주일간 기록하면 패턴이 보입니다.",
      recommendedBooks: ["분노 다스리기 - 틱낫한", "감정의 발견 - 마크 브래킷"],
      affirmation: "나는 내 감정을 알아차리고, 한 발 물러서서 바라볼 수 있습니다."
    }
  },
  [SubCategory.IMPULSE_CONTROL]: {
    high: {
      title: "뛰어난 충동 통제력",
      description: "당신은 즉각적인 욕구를 잘 참고 장기적인 목표를 위해 행동할 수 있는 자기통제력을 가지고 있습니다.",
      currentState: "유혹 앞에서도 흔들리지 않고, 계획한 대로 행동합니다. 이는 성공적인 목표 달성의 핵심 능력입니다.",
      actionPlan: ["도전적인 목표 설정으로 능력 확장", "다른 사람의 자기통제력 향상 돕기", "충동 통제가 어려운 영역 찾아 보완하기"],
      weeklyMission: "이번 주, 평소 하기 싫었던 일 하나를 선택해 매일 10분씩 실천해보세요.",
      recommendedBooks: ["마시멜로 이야기 - 호아킴 데 포사다", "습관의 힘 - 찰스 두히그"],
      affirmation: "나는 순간의 유혹보다 나의 목표를 선택합니다."
    },
    medium: {
      title: "보통 수준의 충동 통제력",
      description: "대체로 충동을 조절하지만, 피곤하거나 스트레스를 받을 때 즉흥적인 결정을 할 때가 있습니다.",
      currentState: "평소에는 계획적이지만, 특정 상황에서 '에이, 오늘만'이라는 생각이 들 수 있습니다.",
      actionPlan: ["'10분 규칙' 적용 - 충동적 행동 전 10분 기다리기", "환경 설계 - 유혹을 줄이는 환경 만들기", "작은 성공 경험 쌓기 - 작은 충동 참기부터 시작"],
      weeklyMission: "이번 주 충동적으로 하고 싶은 것이 생길 때마다 '10분 후에 다시 생각하자'를 실천하세요.",
      recommendedBooks: ["의지력의 재발견 - 켈리 맥고니걸", "아주 작은 습관의 힘 - 제임스 클리어"],
      affirmation: "나는 잠시 멈추고 더 나은 선택을 할 수 있습니다."
    },
    low: {
      title: "충동 통제력 개발 필요",
      description: "즉흥적인 결정으로 후회하는 경우가 많습니다. 하지만 충동 통제력은 근육처럼 훈련으로 강화할 수 있습니다!",
      currentState: "하고 싶은 것을 참기 어렵고, '지금 당장'의 만족을 추구하는 경향이 있습니다.",
      actionPlan: ["HALT 체크 - 배고픔(Hungry), 화남(Angry), 외로움(Lonely), 피곤함(Tired) 상태 확인", "충동 일지 작성 - 충동적 행동과 그 결과 기록", "대체 행동 준비 - 충동이 올 때 할 수 있는 건강한 대안 목록", "보상 시스템 - 충동을 참았을 때 자신에게 작은 보상"],
      weeklyMission: "충동이 올 때마다 '내가 지금 HALT 상태인가?' 체크하세요. 기본 욕구를 먼저 해결하면 충동이 줄어듭니다.",
      recommendedBooks: ["나는 왜 충동에 끌리는가 - 조엘 도미시안", "도파민네이션 - 애나 렘키"],
      affirmation: "나는 충동을 느끼더라도 행동을 선택할 수 있습니다."
    }
  },
  [SubCategory.CAUSAL_ANALYSIS]: {
    high: {
      title: "뛰어난 원인 분석력",
      description: "문제의 본질을 정확히 파악하고 효과적인 해결책을 찾아내는 능력이 탁월합니다.",
      currentState: "복잡한 상황에서도 핵심 원인을 빠르게 파악하고, 논리적인 해결 방안을 도출합니다.",
      actionPlan: ["시스템적 사고 능력 더욱 발전시키기", "복잡한 문제 해결에 도전하기", "분석력을 활용해 팀이나 조직에 기여하기"],
      weeklyMission: "이번 주 겪는 문제 하나를 선택해 '5 WHY' 기법으로 근본 원인을 분석해보세요.",
      recommendedBooks: ["생각의 도구들 - 리처드 니스벳", "시스템 사고 - 데니스 셰릭"],
      affirmation: "나는 문제 속에서 해결의 실마리를 찾아냅니다."
    },
    medium: {
      title: "발전 가능한 원인 분석력",
      description: "문제를 분석하려 노력하지만, 때로 표면적인 원인에 머무르거나 성급한 결론을 내릴 때가 있습니다.",
      currentState: "분석적 사고를 하려 하지만, 시간이나 여유가 없을 때 직관에 의존하는 경향이 있습니다.",
      actionPlan: ["'왜?'라고 5번 묻는 습관 기르기", "문제 해결 전 충분한 시간 갖기", "다양한 관점에서 상황 바라보기"],
      weeklyMission: "이번 주 결정을 내리기 전에 '혹시 내가 놓친 것은 없을까?'라고 스스로에게 물어보세요.",
      recommendedBooks: ["논리의 기술 - 조엘 루디노우", "크리티컬 씽킹 - 조 키어스"],
      affirmation: "나는 한 걸음 물러서서 상황을 더 넓게 볼 수 있습니다."
    },
    low: {
      title: "원인 분석력 강화 필요",
      description: "문제가 생기면 당장의 해결에 급급하거나, 원인을 정확히 파악하지 못해 같은 문제가 반복될 수 있습니다.",
      currentState: "상황을 충분히 분석하기 전에 행동하거나, 문제의 원인을 외부로 돌리는 경향이 있을 수 있습니다.",
      actionPlan: ["문제 발생 시 바로 행동하지 않고 '10분 분석 시간' 갖기", "'5 WHY' 기법 배우고 적용하기", "일기로 상황과 결과 기록하며 패턴 파악하기", "신뢰할 수 있는 사람과 상황 논의하기"],
      weeklyMission: "이번 주 불편한 상황이 생기면, 종이에 '상황 → 내 생각 → 감정 → 행동 → 결과'를 적어보세요.",
      recommendedBooks: ["생각에 관한 생각 - 대니얼 카너먼", "똑바로 생각하라 - 롤프 도벨리"],
      affirmation: "나는 문제의 진짜 원인을 찾아 근본적으로 해결할 수 있습니다."
    }
  },
  [SubCategory.COMMUNICATION]: {
    high: {
      title: "뛰어난 소통 능력",
      description: "상황과 상대에 맞게 효과적으로 의사소통하는 능력이 탁월합니다. 자신의 생각을 명확하게 전달하면서도 상대의 말을 경청합니다.",
      currentState: "대화의 분위기를 이끌고, 복잡한 내용도 쉽게 전달합니다. 사람들이 당신과 대화하는 것을 편안해합니다.",
      actionPlan: ["프레젠테이션이나 강연 등 더 큰 무대에 도전", "갈등 중재자 역할 시도", "글쓰기 등 다른 소통 채널 개발"],
      weeklyMission: "이번 주, 평소 대화가 어려웠던 사람과 의도적으로 대화를 시도해보세요.",
      recommendedBooks: ["설득의 심리학 - 로버트 치알디니", "대화의 심리학 - 더글러스 스톤"],
      affirmation: "나의 말은 사람들의 마음에 닿습니다."
    },
    medium: {
      title: "발전 가능한 소통 능력",
      description: "기본적인 의사소통은 잘 하지만, 특정 상황(갈등, 공식석상 등)에서는 어려움을 느낄 수 있습니다.",
      currentState: "편한 사람과는 대화가 잘 되지만, 새로운 사람이나 어려운 주제에서는 주저할 때가 있습니다.",
      actionPlan: ["적극적 경청 연습 - 상대방 말에 온전히 집중하기", "'나 전달법(I-message)' 연습하기", "불편한 대화 상황 점진적으로 경험하기"],
      weeklyMission: "이번 주 대화 시, 상대방의 말이 끝난 후 '네 말은 ~라는 거지?'라고 요약해서 확인하는 연습을 해보세요.",
      recommendedBooks: ["비폭력 대화 - 마셜 로젠버그", "말 그릇 - 김윤나"],
      affirmation: "나는 상대방을 이해하고, 나를 이해시키는 대화를 할 수 있습니다."
    },
    low: {
      title: "소통 능력 강화 필요",
      description: "자신의 생각을 표현하거나 다른 사람과 대화하는 것이 어렵게 느껴질 수 있습니다. 하지만 소통 능력은 연습으로 확실히 향상됩니다!",
      currentState: "대화 중 할 말을 잊거나, 오해가 자주 생기거나, 대화 자체가 부담스러울 수 있습니다.",
      actionPlan: ["하루 한 사람과 의도적으로 대화하기 (간단한 인사부터)", "말하기 전 핵심 메시지 미리 정리하기", "비언어적 소통(표정, 눈맞춤) 연습하기", "소규모 모임이나 동아리 참여하기"],
      weeklyMission: "매일 한 사람에게 '오늘 기분 어때요?' 또는 '점심 뭐 드셨어요?' 같은 가벼운 질문을 건네보세요.",
      recommendedBooks: ["혼자 연습하는 대화의 기술 - 피트 비시어", "말센스 - 셀레스트 헤들리"],
      affirmation: "나는 한 마디씩 더 나은 소통을 만들어가고 있습니다."
    }
  },
  [SubCategory.EMPATHY]: {
    high: {
      title: "뛰어난 공감 능력",
      description: "다른 사람의 감정과 관점을 정확히 이해하고 공감하는 능력이 탁월합니다. 사람들은 당신에게 마음을 열고 편하게 이야기합니다.",
      currentState: "상대방의 표정, 말투, 행동에서 감정을 읽어내고, 그들이 원하는 방식으로 반응할 수 있습니다.",
      actionPlan: ["공감 피로(empathy fatigue) 관리하기", "경계 설정하며 공감하기", "공감 능력을 필요로 하는 역할 탐색"],
      weeklyMission: "이번 주, 누군가의 고민을 들을 때 조언 대신 '그랬구나, 많이 힘들었겠다'로만 반응해보세요.",
      recommendedBooks: ["공감의 기쁨 - 테레사 와이즈먼", "공감하는 유전자 - 프란스 드 발"],
      affirmation: "나의 공감은 다른 사람에게 위로와 힘이 됩니다."
    },
    medium: {
      title: "발전 가능한 공감 능력",
      description: "가까운 사람의 감정은 잘 이해하지만, 낯선 사람이나 다른 배경의 사람을 이해하기 어려울 때가 있습니다.",
      currentState: "공감하려고 노력하지만, 때로 상대의 감정보다 문제 해결에 집중하거나 조언을 서두르기도 합니다.",
      actionPlan: ["판단 없이 듣기 연습", "다양한 배경의 사람들과 교류하기", "'만약 내가 저 상황이라면?' 상상하기"],
      weeklyMission: "이번 주 대화할 때, 상대방이 말을 마친 후 3초간 조용히 기다린 뒤 반응해보세요.",
      recommendedBooks: ["공감의 시대 - 제레미 리프킨", "경청 - 마이클 니콜스"],
      affirmation: "나는 상대방의 마음에 귀 기울이는 연습을 하고 있습니다."
    },
    low: {
      title: "공감 능력 개발 필요",
      description: "다른 사람의 감정을 이해하거나 적절히 반응하는 것이 어렵게 느껴질 수 있습니다. 하지만 공감도 학습 가능한 기술입니다!",
      currentState: "'왜 저러는지 모르겠다'는 생각이 자주 들거나, 상대방이 서운해하는 이유를 파악하기 어려울 수 있습니다.",
      actionPlan: ["감정 어휘 늘리기 - 다양한 감정 단어 배우기", "영화/드라마 보며 등장인물 감정 추측하기", "상대방에게 직접 '지금 기분이 어때?' 물어보기", "비언어적 신호(표정, 자세) 관찰 연습"],
      weeklyMission: "이번 주 영화나 드라마 한 편을 보며 주인공이 느꼈을 감정을 5가지 이상 적어보세요.",
      recommendedBooks: ["감정 사용설명서 - 사라 토머스", "나는 왜 네가 힘든지 모를까 - 전미경"],
      affirmation: "나는 다른 사람의 감정을 이해하려고 노력하고 있습니다."
    }
  },
  [SubCategory.EGO_EXPANSION]: {
    high: {
      title: "풍요로운 대인관계",
      description: "주변에 믿을 수 있는 사람들이 많고, 서로 깊은 유대감을 나누는 관계를 유지하고 있습니다.",
      currentState: "사랑받고 있다는 확신이 있고, 어려울 때 의지할 사람들이 있습니다. 이는 강력한 심리적 자산입니다.",
      actionPlan: ["관계의 질을 더욱 깊게 하기", "새로운 사람들과의 연결 확장", "관계에서 받은 것을 사회에 환원하기"],
      weeklyMission: "이번 주, 오랫동안 연락하지 못했던 소중한 사람에게 안부 메시지를 보내보세요.",
      recommendedBooks: ["관계의 기술 - 존 가트맨", "친밀함의 기술 - 해리엇 러너"],
      affirmation: "나는 사랑하고 사랑받는 풍요로운 관계 속에 있습니다."
    },
    medium: {
      title: "발전 가능한 대인관계",
      description: "관계가 있지만 더 깊은 연결을 원하거나, 일부 관계에서 아쉬움을 느낄 수 있습니다.",
      currentState: "몇몇 가까운 사람은 있지만, 외로움을 느끼거나 더 많은 연결을 원할 때가 있습니다.",
      actionPlan: ["먼저 연락하고 만남 제안하기", "취미나 관심사 기반 커뮤니티 참여", "기존 관계에 더 많은 시간 투자하기"],
      weeklyMission: "이번 주, 평소 친해지고 싶었던 사람에게 커피나 식사를 제안해보세요.",
      recommendedBooks: ["혼자가 편하지만 혼자는 싫은 당신에게 - 너새니얼 브랜든", "어른의 친구 관계 - 박종훈"],
      affirmation: "나는 의미 있는 관계를 만들어갈 수 있습니다."
    },
    low: {
      title: "대인관계 확장 필요",
      description: "주변에 가까운 사람이 적거나, 관계에서 소외감을 느낄 수 있습니다. 하지만 관계는 언제든 새롭게 만들 수 있습니다!",
      currentState: "외로움을 자주 느끼거나, '나를 진정으로 이해하는 사람이 없다'고 생각할 수 있습니다.",
      actionPlan: ["작은 모임이나 동호회 참여하기", "자원봉사 활동 시작하기", "온라인 커뮤니티에서 관심사 공유하기", "전문 상담을 통해 관계 패턴 탐색하기"],
      weeklyMission: "이번 주, 동네나 온라인에서 관심 있는 모임 하나를 찾아보세요. 참여는 다음 단계입니다.",
      recommendedBooks: ["연결 - 매튜 리버먼", "관계 수업 - 진명화"],
      affirmation: "나는 연결될 가치가 있는 사람이고, 좋은 관계를 만들어갈 수 있습니다."
    }
  },
  [SubCategory.SELF_OPTIMISM]: {
    high: {
      title: "강한 자아 낙관성",
      description: "자신과 미래에 대한 긍정적인 믿음이 강합니다. 어려운 상황에서도 '할 수 있다'는 확신을 유지합니다.",
      currentState: "역경을 성장의 기회로 보고, 실패해도 다시 일어설 수 있다는 자신감이 있습니다.",
      actionPlan: ["현실적 낙관주의 유지 - 맹목적 낙관과 구분하기", "낙관성을 주변에 전파하기", "더 큰 도전에 자신감 적용하기"],
      weeklyMission: "이번 주, 어려운 일이 생기면 '이 상황에서 배울 수 있는 것은?'이라고 자문해보세요.",
      recommendedBooks: ["학습된 낙관주의 - 마틴 셀리그만", "마인드셋 - 캐롤 드웩"],
      affirmation: "나는 어떤 상황에서도 해낼 수 있다는 것을 믿습니다."
    },
    medium: {
      title: "발전 가능한 자아 낙관성",
      description: "대체로 긍정적이지만, 큰 도전이나 실패 앞에서는 자신감이 흔들릴 때가 있습니다.",
      currentState: "좋은 상황에서는 낙관적이지만, 어려움이 지속되면 부정적 생각이 고개를 들 수 있습니다.",
      actionPlan: ["과거 성공 경험 떠올리기", "부정적 셀프토크 인식하고 바꾸기", "작은 성공 경험 의도적으로 쌓기"],
      weeklyMission: "매일 밤, 오늘 잘한 일 3가지를 적어보세요. 아무리 작은 것이라도 괜찮습니다.",
      recommendedBooks: ["긍정의 재발견 - 바바라 프레드릭슨", "당신도 잘될 수 있다 - 숀 에이커"],
      affirmation: "나는 과거의 성공을 통해 미래도 잘 해낼 수 있음을 압니다."
    },
    low: {
      title: "자아 낙관성 강화 필요",
      description: "자신이나 미래에 대해 부정적인 생각이 많을 수 있습니다. 하지만 낙관성도 훈련으로 키울 수 있습니다!",
      currentState: "'어차피 안 될 거야', '내가 뭘 해도...'라는 생각이 자주 들 수 있습니다.",
      actionPlan: ["부정적 생각 기록하고 반박하기", "'아직'이라는 단어 사용하기 (안 됐다 → 아직 안 됐다)", "작은 목표 세우고 달성하기", "성공 일기 - 매일 작은 성취 기록하기"],
      weeklyMission: "이번 주, 부정적인 생각이 들 때마다 '정말 그럴까? 다른 가능성은?'이라고 질문해보세요.",
      recommendedBooks: ["셀프토크 - 에단 크로스", "나는 왜 나를 사랑하지 못할까 - 크리스틴 네프"],
      affirmation: "나는 아직 성장 중이고, 더 나아질 수 있습니다."
    }
  },
  [SubCategory.LIFE_SATISFACTION]: {
    high: {
      title: "높은 삶의 만족도",
      description: "현재 삶에 대한 만족도가 높고, 자신의 삶이 의미 있다고 느낍니다.",
      currentState: "삶의 다양한 영역에서 충족감을 느끼고, 자신이 원하는 방향으로 살고 있다는 확신이 있습니다.",
      actionPlan: ["만족도를 유지하면서 새로운 성장 영역 탐색", "감사함을 의식적으로 유지하기", "삶의 만족을 주변과 나누기"],
      weeklyMission: "이번 주, '내 삶에서 가장 감사한 5가지'를 적고 왜 그런지 생각해보세요.",
      recommendedBooks: ["플로리시 - 마틴 셀리그만", "행복의 조건 - 조지 베일런트"],
      affirmation: "나는 내 삶에 감사하며, 매일을 의미있게 살고 있습니다."
    },
    medium: {
      title: "보통 수준의 삶의 만족도",
      description: "삶에 대해 대체로 만족하지만, 특정 영역에서 아쉬움이나 갈망이 있을 수 있습니다.",
      currentState: "괜찮은 삶이지만, '이게 다인가?'라는 생각이 들거나 더 나은 삶을 꿈꿀 때가 있습니다.",
      actionPlan: ["삶의 각 영역 점검하고 개선점 찾기", "진정으로 원하는 것이 무엇인지 탐색", "작은 변화부터 시작하기"],
      weeklyMission: "삶의 영역(건강, 관계, 일, 여가, 성장)별로 만족도를 1-10점으로 매기고, 가장 낮은 영역에서 한 가지 개선할 점을 찾아보세요.",
      recommendedBooks: ["인생 수업 - 엘리자베스 퀴블러 로스", "하버드 행복학 강의 - 탈 벤 샤하르"],
      affirmation: "나는 내 삶을 더 좋은 방향으로 만들어갈 힘이 있습니다."
    },
    low: {
      title: "삶의 만족도 향상 필요",
      description: "현재 삶에 대한 불만족이 크거나, 삶의 의미를 찾기 어려울 수 있습니다. 이는 변화의 시작점이 될 수 있습니다.",
      currentState: "'내 인생이 왜 이럴까', '다시 태어나면 이렇게 살고 싶지 않다'는 생각이 들 수 있습니다.",
      actionPlan: ["현재 상황의 작은 좋은 점 찾기", "가치관 명확히 하기 - 무엇이 정말 중요한가", "변화 가능한 것과 불가능한 것 구분하기", "전문 상담 고려하기"],
      weeklyMission: "오늘 하루 중 가장 좋았던 순간 하나를 매일 밤 기록해보세요. 일주일 후 패턴을 찾아보세요.",
      recommendedBooks: ["죽음의 수용소에서 - 빅터 프랭클", "미움받을 용기 - 기시미 이치로"],
      affirmation: "나는 내 삶을 새롭게 디자인할 수 있습니다. 오늘이 그 시작입니다."
    }
  },
  [SubCategory.GRATITUDE]: {
    high: {
      title: "풍요로운 감사 능력",
      description: "일상에서 감사할 것을 쉽게 발견하고, 이를 통해 행복감을 느낍니다.",
      currentState: "작은 것에도 감사하고, 이 마음을 표현하는 것이 자연스럽습니다. 이는 행복의 핵심 요소입니다.",
      actionPlan: ["감사를 더 적극적으로 표현하기", "감사 습관을 주변에 전파하기", "어려운 상황에서도 감사 찾기 연습"],
      weeklyMission: "이번 주, 3명에게 감사 편지나 메시지를 보내보세요. 구체적으로 무엇에 감사한지 적어주세요.",
      recommendedBooks: ["감사의 힘 - 로버트 에몬스", "작은 것이 아름답다 - E.F. 슈마허"],
      affirmation: "나는 매 순간 감사할 것들로 둘러싸여 있습니다."
    },
    medium: {
      title: "발전 가능한 감사 능력",
      description: "감사해야 할 것들을 알지만, 바쁜 일상에서 잊거나 당연하게 여길 때가 있습니다.",
      currentState: "좋은 일이 생기면 감사하지만, 평범한 일상에서는 감사를 놓치기 쉽습니다.",
      actionPlan: ["감사 일기 시작하기", "하루 세 가지 감사 습관 만들기", "당연하게 여겼던 것들 다시 보기"],
      weeklyMission: "매일 자기 전, '오늘 감사한 일 3가지'를 적어보세요. 구체적일수록 좋습니다.",
      recommendedBooks: ["행복의 정복 - 버트런드 러셀", "감사하면 달라지는 것들 - 잰니스 캐플란"],
      affirmation: "나는 매일 감사할 것들을 발견하는 연습을 하고 있습니다."
    },
    low: {
      title: "감사 능력 개발 필요",
      description: "감사할 것이 별로 없다고 느끼거나, 감사 표현이 어색할 수 있습니다. 감사는 연습으로 키울 수 있는 능력입니다!",
      currentState: "세상이 불공평하게 느껴지거나, 가진 것보다 없는 것에 더 집중하게 될 수 있습니다.",
      actionPlan: ["아침에 일어나서 '살아있음에 감사'로 시작하기", "불평하고 싶을 때 한 가지 좋은 점 찾기", "감사 앱이나 알림 활용하기", "'내가 이것마저 없다면?' 상상해보기"],
      weeklyMission: "오늘부터 일주일간, 불평하고 싶을 때마다 그 상황에서 한 가지 좋은 점을 찾아보세요.",
      recommendedBooks: ["감사의 기술 - 마치 시모프", "긍정의 발견 - 소냐 류보머스키"],
      affirmation: "나는 작은 것부터 감사하는 법을 배우고 있습니다."
    }
  }
};

// 전체 해석 생성을 위한 메시지
export const OVERALL_INTERPRETATIONS = {
  high: "당신은 심리적으로 매우 건강한 상태입니다. 높은 회복탄력성을 바탕으로 어떤 어려움도 성장의 발판으로 삼을 수 있습니다. 현재 수준을 유지하면서 주변 사람들에게도 긍정적인 영향을 주는 리더가 되어보세요.",
  medium: "당신은 대체로 균형 잡힌 회복탄력성을 가지고 있습니다. 일부 영역은 강하고 일부는 보완이 필요합니다. 아래 분석을 참고하여 약한 부분을 집중적으로 강화하면, 더욱 단단한 마음 근력을 갖출 수 있습니다.",
  low: "현재 마음의 근력이 약해진 상태입니다. 하지만 걱정하지 마세요 - 회복탄력성은 타고나는 것이 아니라 훈련으로 키울 수 있습니다! 아래 가이드를 천천히 따라하면서, 한 가지씩 실천해보세요. 작은 변화가 큰 변화를 만듭니다."
};
