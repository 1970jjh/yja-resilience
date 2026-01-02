
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

// 하위 요인별 상세 피드백 데이터 (일상생활 + 직장생활 통합)
export const DETAILED_FEEDBACK_DATA: Record<SubCategory, { high: DetailedFeedback; medium: DetailedFeedback; low: DetailedFeedback }> = {
  [SubCategory.EMOTION_CONTROL]: {
    high: {
      title: "뛰어난 감정 조절력의 소유자",
      description: "당신은 예상치 못한 상황이나 스트레스 속에서도 감정의 균형을 유지할 수 있는 뛰어난 능력을 갖추고 있습니다. 가족과의 갈등, 친구와의 오해, 또는 일상의 작은 불편함 앞에서도 감정에 휘둘리지 않고 상황을 객관적으로 바라볼 수 있습니다. 이런 능력은 중요한 결정을 내릴 때 큰 도움이 됩니다.",
      currentState: "누군가와 의견이 달라도 침착하게 대화를 이어갈 수 있고, 피곤하거나 지쳐도 주변 사람들에게 예민하게 굴지 않습니다. 당신의 안정감은 가족, 친구, 동료들에게도 긍정적인 영향을 주어 자연스럽게 분위기 메이커 역할을 합니다.",
      actionPlan: ["매일 10분 '마음챙김 산책'으로 감정 리셋하기", "감정 조절이 어려운 가족이나 친구가 있다면 대화로 노하우 공유하기", "한 달에 한 번, 감정적으로 힘들었던 상황과 대처법을 기록하여 나만의 '감정 위기 매뉴얼' 만들기"],
      weeklyMission: "이번 주 누군가와 의견이 다를 때, 바로 반박하지 말고 '그런 생각도 있네요. 제 생각은...'으로 시작해보세요. 3회 이상 시도하고 상대방의 반응 변화를 관찰해보세요.",
      recommendedBooks: ["감정은 어떻게 만들어지는가 - 리사 펠드먼 배럿", "마음챙김의 기적 - 틱낫한"],
      recommendedMovies: ["인사이드 아웃 (2015) - 내 안의 모든 감정을 껴안는 법", "소울 (2020) - 일상의 불꽃과 삶의 목적 찾기"],
      affirmation: "나는 어떤 상황에서도 감정의 주인으로서 차분하게 대응합니다."
    },
    medium: {
      title: "성장 가능성이 큰 감정 조절력",
      description: "평소에는 감정을 잘 다스리지만, 예상치 못한 상황이나 체력적으로 지쳤을 때 감정 조절이 흔들리는 경험이 있습니다. 특히 피곤한 저녁 시간, 중요한 약속 전, 가까운 사람과의 의견 충돌에서 평소와 다른 반응이 나올 수 있습니다.",
      currentState: "갑작스러운 계획 변경, 누군가의 실수로 내 일이 늘어났을 때, 피곤함이 쌓였을 때 '참다가 폭발'하는 패턴이 있을 수 있습니다. 나중에 '그때 왜 그랬을까' 후회하는 순간들이 종종 있습니다.",
      actionPlan: ["'감정 트리거 지도' 만들기 - 특정 사람, 특정 상황, 특정 시간대 중 언제 감정이 요동치는지 일주일간 기록", "화가 날 때 바로 반응하지 않고 '이 대화는 내일 하자'는 24시간 규칙 적용", "아침과 저녁, 하루 2번 1분 심호흡 루틴 만들기"],
      weeklyMission: "매일 저녁 5분, 오늘 가장 감정이 격했던 순간을 복기해보세요. '상황 → 내 감정 → 내 반응 → 결과 → 다르게 했다면?'을 짧게 적어보면, 일주일 후 나의 감정 패턴이 보입니다.",
      recommendedBooks: ["감정 조절 수업 - 대니얼 골먼", "화가 날 때 읽는 책 - 틱낫한"],
      recommendedMovies: ["인사이드 아웃 (2015) - 내 안의 모든 감정을 껴안는 법", "소울 (2020) - 일상의 불꽃과 삶의 목적 찾기"],
      affirmation: "나는 내 감정의 패턴을 알아가고 있고, 매일 더 나은 대응을 배워가고 있습니다."
    },
    low: {
      title: "감정 조절력, 지금부터 키워갈 수 있어요",
      description: "작은 자극에도 감정이 크게 요동치고, 그로 인해 관계나 일상에 영향을 받은 경험이 있을 겁니다. 누군가의 짧은 한마디에도 하루 종일 기분이 안 좋거나, 대화 중 목소리가 높아지거나, 밤에 낮의 일 때문에 잠을 설치기도 합니다. 하지만 이것은 '성격 탓'이 아니라 아직 연습이 부족한 것입니다.",
      currentState: "낮에 받은 스트레스가 저녁까지 이어지거나, 아침에 있었던 불쾌한 일이 하루 전체에 영향을 미칩니다. 감정이 격해지면 평소 안 할 말을 하거나 문자/메시지에 강한 어조를 쓰고 후회하는 일이 반복됩니다.",
      actionPlan: ["'6초 멈춤' 규칙 - 화가 나면 아무 반응도 하지 말고 속으로 6까지 세기 (편도체가 진정되는 시간)", "감정 폭발 직전 신호 파악하기 - 목소리가 커지거나, 손에 힘이 들어가거나, 호흡이 빨라지는 등 내 고유의 신호 알아채기", "신체로 감정 흘려보내기 - 세수하기, 계단 오르내리기, 밖에서 5분 바람 쐬기", "필요하면 전문 상담사와 이야기 나누기"],
      weeklyMission: "핸드폰에 하루 3번 알람을 설정하세요 (오전 10시, 오후 3시, 저녁 8시). 알람이 울리면 '지금 내 감정은 1-10점 중 몇 점인가?'를 기록합니다. 일주일 후 가장 점수가 높았던 때의 공통점을 찾아보세요.",
      recommendedBooks: ["분노를 다스리는 기술 - 틱낫한", "감정의 발견 - 마크 브래킷"],
      recommendedMovies: ["인사이드 아웃 (2015) - 내 안의 모든 감정을 껴안는 법", "소울 (2020) - 일상의 불꽃과 삶의 목적 찾기"],
      affirmation: "나는 내 감정을 알아차리는 것부터 시작합니다. 알아차리면 선택할 수 있습니다."
    }
  },
  [SubCategory.IMPULSE_CONTROL]: {
    high: {
      title: "탁월한 자기통제력의 소유자",
      description: "당신은 눈앞의 유혹보다 장기적 목표를 선택할 수 있는 능력을 갖추고 있습니다. SNS 알림이 와도 하던 일에 집중하고, 충동적인 소비 대신 계획된 지출을 우선합니다. 이 능력은 건강, 재정, 인간관계, 자기계발 등 삶의 모든 영역에서 큰 자산이 됩니다.",
      currentState: "갑자기 놀자는 연락이 와도 이미 계획된 운동이나 공부를 우선시할 수 있고, 맛있는 음식 앞에서도 건강을 생각해 절제할 수 있습니다. 피곤한 날에도 편의점 음식 대신 건강한 식사를 챙기는 여유가 있습니다.",
      actionPlan: ["더 큰 도전 설정하기 - 3개월 단위 목표(자격증, 운동, 저축) 세우기", "주변 사람들에게 시간관리 노하우 공유하기", "충동 통제가 약한 영역(야식, 쇼핑, SNS 등) 파악하고 그 영역만 별도 관리"],
      weeklyMission: "이번 주, SNS/유튜브 확인 충동이 올 때마다 '이것은 저녁 8시 이후에'라고 속으로 말하고, 정말 그 시간 이후에만 확인해보세요. 일주일간 몇 번 성공했는지 체크합니다.",
      recommendedBooks: ["마시멜로 이야기 - 호아킴 데 포사다", "습관의 힘 - 찰스 두히그"],
      recommendedMovies: ["캐스트 어웨이 (2000) - 끝없는 기다림과 고독을 견디는 인내", "탑건: 매버릭 (2022) - 본능을 넘어서는 냉철한 통제력"],
      affirmation: "나는 순간의 유혹보다 나의 미래를 선택합니다."
    },
    medium: {
      title: "상황에 따라 흔들리는 충동 통제력",
      description: "평소에는 계획대로 생활하지만, 스트레스를 받거나 피곤할 때 '오늘만 예외'를 외치는 자신을 발견할 수 있습니다. 유튜브 30분만 보려다 2시간을 쓰거나, 건강식을 먹으려다 배달앱을 열거나, 저축하려다 세일 문자에 결제 버튼을 누르는 경험이 익숙할 수 있습니다.",
      currentState: "집중해야 할 때도 알림이 오면 바로 확인하고, 무언가에 몰입 중에도 폰을 만지작거립니다. '오늘만 늦게 자도 돼'가 어느새 습관이 되어 만성 수면 부족 상태일 수 있습니다.",
      actionPlan: ["'10분 딜레이 룰' - 충동이 올 때 '10분 후에 다시 생각해보자'고 약속하기. 대부분의 충동은 10분 안에 사라짐", "유혹 환경 재설계 - 폰은 다른 방에, SNS 알림 끄기, 쇼핑앱 삭제", "If-Then 계획 만들기 - '만약 배달앱을 켜고 싶으면, 대신 물 한 잔 마신다' 같은 대체 행동 준비"],
      weeklyMission: "이번 주, 충동적으로 하고 싶었던 것(SNS, 쇼핑, 야식 등)을 할 때마다 10분 타이머를 켜세요. 10분 후에도 하고 싶으면 해도 됩니다. 단, 타이머 켜는 것이 규칙입니다. 일주일 후 10분 안에 사라진 충동이 몇 개인지 세어보세요.",
      recommendedBooks: ["의지력의 재발견 - 켈리 맥고니걸", "아주 작은 습관의 힘 - 제임스 클리어"],
      recommendedMovies: ["캐스트 어웨이 (2000) - 끝없는 기다림과 고독을 견디는 인내", "탑건: 매버릭 (2022) - 본능을 넘어서는 냉철한 통제력"],
      affirmation: "나는 잠시 멈추고 더 나은 선택을 할 수 있습니다."
    },
    low: {
      title: "충동 통제력, 작은 훈련으로 키울 수 있어요",
      description: "집중해야 할 때도 유튜브 쇼츠를 보고, 저축해야 할 때도 충동구매를 하고, 일찍 자야 할 때도 넷플릭스를 켭니다. '이번만'이 매번이 되고, 나중에 후회하지만 다음에도 반복됩니다. 급한 요청에 원래 하던 일을 멈추다 보니 정작 중요한 일은 항상 밀려납니다.",
      currentState: "'오늘은 집중한다'고 다짐해도 30분 만에 폰을 확인합니다. 밤에 핸드폰 보다가 새벽 2시에 자고 다음날 피곤합니다. 카드값 보고 놀라지만 다음 달에도 반복됩니다. 이런 패턴이 자기혐오로 이어질 수 있습니다.",
      actionPlan: ["HALT 체크 습관 - 충동이 올 때 '나는 지금 배고픈가(Hungry)? 화났나(Angry)? 외로운가(Lonely)? 피곤한가(Tired)?' 체크. 이 네 가지 상태에서 충동이 강해짐", "충동 일지 쓰기 - 충동에 넘어간 순간을 기록. '시간, 상황, 충동, 결과' 기록하면 패턴이 보임", "환경 극단적 재설계 - 폰에서 유튜브/인스타 삭제, 신용카드 집에 두기, 침실에 TV 없애기", "작은 성공 축적 - '5분만 참기'부터 시작해서 점진적으로 시간 늘리기"],
      weeklyMission: "이번 주, 충동에 넘어갔을 때마다 메모장에 기록하세요: '언제, 어디서, 무엇을, 그 결과는'. 일주일 후 가장 자주 나타나는 충동 TOP 3를 파악하고, 그중 하나만 다음 주에 집중 관리해보세요.",
      recommendedBooks: ["도파민네이션 - 애나 렘키", "나는 왜 충동에 끌리는가 - 조엘 도미시안"],
      recommendedMovies: ["캐스트 어웨이 (2000) - 끝없는 기다림과 고독을 견디는 인내", "탑건: 매버릭 (2022) - 본능을 넘어서는 냉철한 통제력"],
      affirmation: "나는 충동을 느끼더라도, 그 충동에 따를지 말지는 내가 선택할 수 있습니다."
    }
  },
  [SubCategory.CAUSAL_ANALYSIS]: {
    high: {
      title: "탁월한 문제 분석력의 소유자",
      description: "당신은 복잡한 상황에서도 '진짜 문제가 뭐지?'를 찾아내는 능력이 있습니다. 일이 잘 안 풀릴 때 표면적인 이유가 아닌 근본 원인을 파악할 수 있습니다. 가족 갈등, 친구 관계, 건강 문제 등 다양한 상황에서 이 능력은 큰 도움이 됩니다.",
      currentState: "문제가 생겨도 '누구 탓'이 아닌 '왜 이런 일이 생겼을까'로 접근합니다. 같은 실수가 반복되지 않도록 원인을 분석하고 대책을 세웁니다. 주변 사람들이 복잡한 문제로 고민할 때 당신의 분석이 도움이 됩니다.",
      actionPlan: ["복잡한 문제에 '관계 지도' 그려보기 - 관련된 사람, 상황, 원인을 시각화", "한 달에 1회 반복되는 문제 패턴 점검하기", "가족이나 친구에게 '5 WHY' 분석법 공유하기"],
      weeklyMission: "이번 주 생활에서 발생한 문제 하나를 골라 '5 WHY'로 분석해보세요. 예: '약속에 늦었다' → 왜? '준비 시간이 부족했다' → 왜? → ... 근본 원인까지 도달해보세요.",
      recommendedBooks: ["생각의 도구들 - 리처드 니스벳", "시스템 사고 - 데니스 셰릭"],
      recommendedMovies: ["조이 (2015) - 엉킨 문제를 풀고 기회를 만드는 분석력", "서울의 봄 (2023) - 역사의 흐름 속 진짜 원인을 파헤치는 통찰"],
      affirmation: "나는 표면 아래의 진짜 원인을 찾아 근본적인 해결책을 제시합니다."
    },
    medium: {
      title: "때로 성급해지는 문제 분석력",
      description: "대체로 상황을 분석하려 노력하지만, 급하거나 스트레스를 받을 때 '일단 해결하고 보자'는 생각이 앞섭니다. 빠르게 결론을 내리려 하거나, 문제가 생기면 이전에 했던 방식을 반복하는 경향이 있습니다. 결과적으로 같은 유형의 문제가 반복되기도 합니다.",
      currentState: "급한 부탁을 받으면 질문 없이 바로 행동에 들어갑니다. 문제가 생겨도 '다음엔 더 잘하자'로 끝나고, 구체적인 원인 분석 없이 넘어갑니다. 어떤 문제는 '그냥 그런 거지'로 체념하기도 합니다.",
      actionPlan: ["급한 상황에도 '5분 분석 시간' 갖기 - '무엇이, 왜, 언제, 어떻게' 확인하고 시작", "주 1회 '이번 주 반복된 문제' 복기하기 - 같은 문제가 왜 다시 생겼는지 분석", "중요한 결정 전 가까운 사람에게 '내가 놓친 것 없을까?' 한 번 물어보기"],
      weeklyMission: "이번 주 누군가의 부탁을 받을 때마다 바로 응하지 말고, '정확히 무엇을 원하는 거지?'를 30초만 생각해보세요. 그리고 필요하면 한 번 확인하세요.",
      recommendedBooks: ["논리의 기술 - 조엘 루디노우", "크리티컬 씽킹 - 조 키어스"],
      recommendedMovies: ["조이 (2015) - 엉킨 문제를 풀고 기회를 만드는 분석력", "서울의 봄 (2023) - 역사의 흐름 속 진짜 원인을 파헤치는 통찰"],
      affirmation: "나는 한 걸음 물러서서 '왜?'라고 묻는 습관을 기르고 있습니다."
    },
    low: {
      title: "원인 분석력, 훈련으로 키울 수 있어요",
      description: "문제가 생기면 '일단 해결'에 급급하거나, 원인을 찾기보다 누군가를 탓하거나, '운이 나빴다'고 넘기는 패턴이 있을 수 있습니다. 결과적으로 비슷한 문제가 반복되고, '왜 나한테만 이런 일이'라는 생각이 들기도 합니다.",
      currentState: "일이 잘 안 풀리면 '상대방이 문제야'로 결론 내리고, 같은 패턴을 반복합니다. 피곤함이 쌓이면 '바빠서 그래'라고만 생각하고, 시간 관리 방식은 점검하지 않습니다. 갈등 상황에서 '저 사람이 문제야'로 끝납니다.",
      actionPlan: ["문제 발생 시 바로 행동하지 않고 '10분 분석 시간' 갖기 - 종이에 상황, 관련자, 타임라인 정리", "'왜?'를 3번만 묻는 연습하기 - 'OO 때문이야' → '왜 OO이 생겼지?' → '왜 그게 가능했지?'", "일주일에 한 번 '이번 주 같은 실수/문제' 목록 작성하기 - 패턴 발견", "신뢰하는 사람에게 '내가 뭘 놓치고 있는 것 같아?'라고 물어보기"],
      weeklyMission: "이번 주 불편했던 상황 하나를 고르세요. 종이에 '상황 → 내 생각 → 내 감정 → 내 행동 → 결과'를 적어보세요. 그리고 '만약 다른 생각을 했다면?'을 상상해보세요. 이 연습을 3회 이상 해보세요.",
      recommendedBooks: ["생각에 관한 생각 - 대니얼 카너먼", "똑바로 생각하라 - 롤프 도벨리"],
      recommendedMovies: ["조이 (2015) - 엉킨 문제를 풀고 기회를 만드는 분석력", "서울의 봄 (2023) - 역사의 흐름 속 진짜 원인을 파헤치는 통찰"],
      affirmation: "나는 문제의 진짜 원인을 찾아 근본적으로 해결하는 법을 배워가고 있습니다."
    }
  },
  [SubCategory.COMMUNICATION]: {
    high: {
      title: "탁월한 소통력의 소유자",
      description: "당신은 어떤 상황에서도 상대방에 맞춰 효과적으로 소통할 수 있습니다. 어려운 내용도 쉽게 설명할 수 있고, 민감한 이야기도 상대방이 받아들일 수 있는 방식으로 전달합니다. 이 능력은 가족, 친구, 연인 관계 등 모든 인간관계에서 큰 자산이 됩니다.",
      currentState: "대화할 때 사람들이 고개를 끄덕입니다. 갈등 상황에서 중재자 역할을 자주 맡게 됩니다. 처음 만난 사람과도 편하게 대화를 이어갈 수 있고, 주변 사람들이 고민 상담을 요청하기도 합니다.",
      actionPlan: ["더 큰 무대에 도전하기 - 동아리 발표, 행사 사회 등", "갈등 상황에서 중재자 역할 맡아보기", "블로그나 SNS 등 글쓰기로 소통 영역 확장"],
      weeklyMission: "이번 주, 평소 대화가 어려웠던 사람(오래된 친구, 가족, 또는 말수가 적은 지인)에게 커피나 식사를 제안해보세요. 상대방의 관심사와 고민에 대해 물어보고, 30분 이상 대화해보세요.",
      recommendedBooks: ["설득의 심리학 - 로버트 치알디니", "대화의 심리학 - 더글러스 스톤"],
      recommendedMovies: ["터미널 (2004) - 언어 장벽을 넘어 마음을 얻는 소통", "코다 (2021) - 들리지 않아도 전해지는 진심의 대화"],
      affirmation: "나의 말은 사람들의 마음에 닿고, 변화를 이끌어냅니다."
    },
    medium: {
      title: "상황에 따라 달라지는 소통력",
      description: "친한 사람이나 편한 상황에서는 대화가 술술 풀리지만, 낯선 사람이나 갈등 상황에서는 말문이 막히거나 의도와 다르게 전달되는 경험이 있습니다. 대화 후 '그렇게 말할 게 아니었는데' 후회할 때가 있습니다.",
      currentState: "친한 사람과는 편하게 대화하지만, 처음 만난 사람이나 어른 앞에서는 긴장됩니다. 중요한 얘기를 해야 할 때 미루거나, 말하고 나서 후회할 때가 있습니다. 문자나 카톡 메시지 톤이 의도와 다르게 전달되어 오해가 생기기도 합니다.",
      actionPlan: ["중요한 대화 전 핵심 메시지 3줄로 정리하고 시작하기", "'나 전달법' 연습하기 - '너 때문에 화나'가 아닌 '~할 때 내가 ~하게 느껴져'로", "상대방 말이 끝난 후 '네 말은 ~라는 거지?'로 요약 확인하는 습관 들이기"],
      weeklyMission: "이번 주 대화할 때, 상대방의 말이 끝난 후 바로 내 말을 하지 말고, '그러니까 네 말은 ~라는 거지?' 또는 '~라고 이해했는데 맞아?'로 확인하는 연습을 5회 이상 해보세요.",
      recommendedBooks: ["비폭력 대화 - 마셜 로젠버그", "말 그릇 - 김윤나"],
      recommendedMovies: ["터미널 (2004) - 언어 장벽을 넘어 마음을 얻는 소통", "코다 (2021) - 들리지 않아도 전해지는 진심의 대화"],
      affirmation: "나는 상대방을 이해하고, 나를 이해시키는 대화를 만들어가고 있습니다."
    },
    low: {
      title: "소통력, 연습으로 키울 수 있어요",
      description: "여러 사람 앞에서 말하기가 두렵거나, 대화 후 '내가 무슨 말을 한 거지?' 싶을 때가 많습니다. 중요한 얘기를 해야 할 때 피하거나 미루고, 갈등 상황에서는 아예 말을 안 하거나 폭발하는 양극단으로 갑니다. 이로 인해 오해가 쌓이고 관계에도 영향이 갑니다.",
      currentState: "낯선 사람과 대화할 때 머리가 하얘지고, 의견을 물어보면 '저는 괜찮습니다'로 넘깁니다. 누군가 불만을 표현하면 어떻게 반응해야 할지 몰라 어색해집니다. 카톡 메시지도 여러 번 고쳐 쓰다 결국 못 보내는 경우도 있습니다.",
      actionPlan: ["매일 한 사람에게 먼저 인사하기 - '좋은 하루 되세요', '오늘 날씨 좋네요' 같은 가벼운 말부터 시작", "중요한 말을 하기 전 3줄 메모하기 - '이 대화의 목적, 핵심 메시지, 원하는 결과'", "거울 보며 표정과 눈맞춤 연습하기 - 5분씩", "동아리나 소모임 참여해서 안전한 환경에서 대화 연습하기"],
      weeklyMission: "이번 주, 매일 평소 대화를 안 하던 사람 한 명에게 '오늘 뭐 하세요?' 또는 '주말에 뭐 하셨어요?' 같은 가벼운 질문을 던져보세요. 5일간 5명에게 시도하고, 어떤 기분이 들었는지 기록해보세요.",
      recommendedBooks: ["혼자 연습하는 대화의 기술 - 피트 비시어", "말센스 - 셀레스트 헤들리"],
      recommendedMovies: ["터미널 (2004) - 언어 장벽을 넘어 마음을 얻는 소통", "코다 (2021) - 들리지 않아도 전해지는 진심의 대화"],
      affirmation: "나는 한 마디씩, 한 사람씩 더 나은 소통을 만들어가고 있습니다."
    }
  },
  [SubCategory.EMPATHY]: {
    high: {
      title: "탁월한 공감력의 소유자",
      description: "당신은 상대방이 말하지 않아도 '오늘 기분이 안 좋구나'를 알아챕니다. 가족, 친구, 동료가 진짜로 원하는 것을 표면적인 말 너머에서 읽어냅니다. 이 능력은 모든 인간관계에서 결정적인 차이를 만들어냅니다.",
      currentState: "조용히 있는 사람이 있으면 '혹시 무슨 일 있어?'라고 먼저 물어보게 됩니다. 누군가 '괜찮아'라고 해도 표정에서 괜찮지 않음을 감지합니다. 주변 사람들의 숨은 니즈를 파악해서 도움을 주는 경우가 많습니다.",
      actionPlan: ["공감 피로(empathy fatigue) 관리하기 - 다른 사람 감정을 많이 받아들이면 지칠 수 있으니 '나를 위한 시간' 확보", "건강한 경계 설정하기 - 모든 사람의 감정을 책임질 필요 없음을 기억하기", "공감이 필요한 자원봉사나 멘토링 활동 참여해보기"],
      weeklyMission: "이번 주, 누군가 고민을 털어놓을 때 조언이나 해결책을 제시하지 말고 오직 '그랬구나', '많이 힘들었겠다', '그럴 수 있어'만으로 반응해보세요. 상대방이 어떻게 느끼는지 관찰하세요.",
      recommendedBooks: ["공감의 배신 - 폴 블룸", "타인의 고통 - 수전 손택"],
      recommendedMovies: ["굿 윌 헌팅 (1997) - 상처받은 마음을 여는 깊은 공감", "엘리멘탈 (2023) - 서로 다름을 이해하고 스며드는 과정"],
      affirmation: "나의 공감은 다른 사람에게 위로와 힘이 됩니다. 동시에 나도 돌봅니다."
    },
    medium: {
      title: "가까운 사람에겐 강한 공감력",
      description: "가까운 사람의 감정은 잘 읽지만, 처음 만난 사람이나 나와 다른 세대/배경의 사람을 이해하기 어려울 때가 있습니다. 상대방의 고민에 공감하려다 어느새 해결책을 제시하고 있거나, '내가 너라면 이렇게 했을 텐데'라는 생각이 먼저 들기도 합니다.",
      currentState: "친구가 힘들다고 하면 '힘들지, 나도 그랬어'라며 내 이야기를 하게 됩니다. 누군가 불만을 표현하면 변명이나 해명부터 하다가 더 화나게 하기도 합니다. 세대가 다른 사람이나 낯선 사람의 생각이 이해가 안 될 때가 있습니다.",
      actionPlan: ["'판단 없이 듣기' 연습 - 상대방이 말할 때 머릿속에서 '그건 아니지' 판단이 올라오면 알아차리고 멈추기", "다양한 배경의 사람과 대화하기 - 한 달에 2회 다른 나이, 다른 관심사를 가진 사람과 대화", "상대방이 말을 마친 후 3초간 침묵하고 나서 반응하기 - 급하게 조언하지 않기 위해"],
      weeklyMission: "이번 주 대화할 때, 상대방이 말을 마치면 바로 반응하지 말고 속으로 '하나, 둘, 셋' 센 다음 '그랬구나' 또는 '그래서 어떤 기분이었어?'로 반응해보세요. 5회 이상 시도하고 상대방 반응을 관찰하세요.",
      recommendedBooks: ["공감의 시대 - 제레미 리프킨", "경청 - 마이클 니콜스"],
      recommendedMovies: ["굿 윌 헌팅 (1997) - 상처받은 마음을 여는 깊은 공감", "엘리멘탈 (2023) - 서로 다름을 이해하고 스며드는 과정"],
      affirmation: "나는 상대방의 마음에 먼저 귀 기울이는 연습을 하고 있습니다."
    },
    low: {
      title: "공감력, 배워서 키울 수 있어요",
      description: "상대방이 왜 화가 났는지, 왜 그렇게 반응하는지 이해가 안 될 때가 많습니다. '왜 저렇게 예민하게 굴지?', '뭐가 문제라는 거야?'라는 생각이 자주 듭니다. 대화 후 '내가 뭘 잘못했지?' 싶은데 정확히 뭔지 모르겠고, 상대방이 서운해하는 것 같은데 왜인지 파악이 어렵습니다.",
      currentState: "누군가 '괜찮아'라고 하면 그대로 믿고 넘어갔다가, 나중에 '그때 왜 몰랐어?'라는 말을 듣습니다. 모임에서 분위기가 이상한 건 느끼는데 왜 그런지 모르겠습니다. 솔직하게 말했는데 상대방이 상처받으면 '왜 상처받지?'라고 생각합니다.",
      actionPlan: ["감정 어휘 늘리기 - '짜증, 화남' 외에 '서운함, 불안함, 막막함' 등 감정 단어 30개 배우기", "드라마/영화 볼 때 등장인물 감정 추측하기 - '저 사람 지금 무슨 감정일까?' 연습", "상대방에게 직접 물어보기 - '혹시 내가 한 말이 기분 나빴어?' 솔직하게 확인", "비언어적 신호 관찰 연습 - 표정, 말투, 자세, 한숨, 침묵 등에 주목"],
      weeklyMission: "이번 주 드라마나 영화 한 편을 보면서, 각 장면에서 주인공이 느꼈을 감정을 5가지 이상 적어보세요. 그리고 '내가 저 상황이라면 어떨까?'를 상상해보세요.",
      recommendedBooks: ["나는 왜 네가 힘든지 모를까 - 전미경", "감정 수업 - 마크 브래킷"],
      recommendedMovies: ["굿 윌 헌팅 (1997) - 상처받은 마음을 여는 깊은 공감", "엘리멘탈 (2023) - 서로 다름을 이해하고 스며드는 과정"],
      affirmation: "나는 다른 사람의 감정을 이해하는 법을 배워가고 있습니다."
    }
  },
  [SubCategory.EGO_EXPANSION]: {
    high: {
      title: "풍요로운 인간관계의 소유자",
      description: "고민을 나눌 친구가 있고, 어려울 때 의지할 수 있는 사람들이 있습니다. '혼자가 아니다'라는 안전감이 있어, 스트레스도 더 잘 버틸 수 있습니다. 이 관계는 삶의 어려운 순간을 함께 넘기는 큰 힘이 됩니다.",
      currentState: "힘든 일이 있으면 터놓고 얘기할 수 있는 사람이 있습니다. 주말에 함께할 사람이 있고, 연락하면 기꺼이 만나줄 친구들이 있습니다. 새로운 기회나 정보도 인맥을 통해 얻을 수 있습니다.",
      actionPlan: ["관계의 깊이 더하기 - 자주 보는 사람과 '근황 넘어 꿈과 고민' 나누기", "새로운 연결 확장 - 동아리, 모임, 커뮤니티 참여", "받은 것 돌려주기 - 새로운 사람에게 먼저 다가가 도움 주기"],
      weeklyMission: "이번 주, 최근 3개월간 연락 못 했던 소중한 사람 한 명에게 '요즘 잘 지내?' 메시지를 보내보세요. 가능하면 30분 통화나 만남으로 이어가보세요.",
      recommendedBooks: ["관계의 기술 - 존 가트맨", "어른의 우정 - 박종훈"],
      recommendedMovies: ["그린 북 (2018) - 편견을 넘어 진정한 친구가 되는 길", "가디언즈 오브 갤럭시 Vol.3 (2023) - 동료의 아픔을 함께 짊어지는 연대"],
      affirmation: "나는 사랑하고 사랑받는 풍요로운 관계 속에 있습니다."
    },
    medium: {
      title: "선택적으로 연결된 대인관계",
      description: "가까운 사람 몇 명은 있지만, '터놓고 얘기할 사람'이 부족하다고 느낄 때가 있습니다. 주말에 '연락할 사람이 없네'라는 생각이 들기도 합니다. 새로운 관계를 만드는 게 귀찮거나 에너지가 많이 드는 것 같습니다.",
      currentState: "일상적인 얘기는 하지만 개인적인 고민은 나누기 어려운 관계들입니다. 모임에서 어색함을 느끼거나, '이 사람들이 날 어떻게 생각할까' 신경 쓰입니다. 오래된 친구들도 각자 바빠서 점점 연락이 뜸해집니다.",
      actionPlan: ["먼저 연락하고 만남 제안하기 - '바쁘겠지만...' 대신 '커피 한잔 어때?'로 시작", "관심사 기반 모임 찾기 - 러닝, 독서, 취미 등 커뮤니티 탐색", "기존 관계에 시간 투자 - 한 달에 1번, 오래된 친구와 약속 먼저 잡기"],
      weeklyMission: "이번 주, 평소 대화를 많이 안 했던 지인 한 명에게 커피나 식사를 제안해보세요. '요즘 어때? 뭐 재밌는 거 있어?' 같은 가벼운 대화를 시도해보세요.",
      recommendedBooks: ["혼자가 편하지만 혼자는 싫은 당신에게 - 우에니시 아키라", "어른의 친구 관계 - 박종훈"],
      recommendedMovies: ["그린 북 (2018) - 편견을 넘어 진정한 친구가 되는 길", "가디언즈 오브 갤럭시 Vol.3 (2023) - 동료의 아픔을 함께 짊어지는 연대"],
      affirmation: "나는 의미 있는 관계를 만들어갈 용기와 능력이 있습니다."
    },
    low: {
      title: "관계 확장, 작은 시작이 필요해요",
      description: "주말에 연락할 사람이 없거나, '나를 진짜로 이해하는 사람이 없다'고 느낄 수 있습니다. 과거에 관계에서 상처받은 경험이 새로운 연결을 주저하게 만들기도 합니다. 하지만 관계는 언제든 새롭게 시작할 수 있습니다.",
      currentState: "모임에서 '투명인간'처럼 느껴지거나, 빨리 빠지고 싶습니다. 혼자 있는 시간이 길고, SNS에서 다른 사람들의 모임 사진을 보면 씁쓸합니다. '어차피 다가가도...'라는 생각에 먼저 말 걸기가 어렵습니다.",
      actionPlan: ["아주 작은 시작 - 자주 보는 사람에게 '안녕하세요'라고 인사하기", "관심사 기반 온라인 커뮤니티 먼저 가입 - 댓글 달기부터 시작", "동아리나 모임 탐색 - '보기'만 해도 됨. 참여는 천천히", "필요하면 전문 상담 - 관계 패턴과 과거 상처 탐색"],
      weeklyMission: "이번 주, 관심 있는 모임이나 동아리를 온/오프라인에서 2개 이상 찾아보세요. 바로 가입하지 않아도 됩니다. '이런 것도 있구나' 탐색만 해도 첫 걸음입니다.",
      recommendedBooks: ["연결 - 매튜 리버먼", "관계 수업 - 진명화"],
      recommendedMovies: ["그린 북 (2018) - 편견을 넘어 진정한 친구가 되는 길", "가디언즈 오브 갤럭시 Vol.3 (2023) - 동료의 아픔을 함께 짊어지는 연대"],
      affirmation: "나는 연결될 가치가 있는 사람이고, 작은 시작이 큰 변화를 만들 수 있습니다."
    }
  },
  [SubCategory.SELF_OPTIMISM]: {
    high: {
      title: "탄탄한 자기 확신의 소유자",
      description: "당신은 어려운 상황이 생겨도 '어떻게든 해낼 거야'라는 마음이 먼저 듭니다. 실패했을 때도 '이번엔 안 됐지만 다음엔 다를 거야'라고 생각합니다. 이런 자기 신뢰는 새로운 도전을 할 때 강력한 추진력이 됩니다.",
      currentState: "새로운 시도나 도전에서 '왜 안 되겠어?'라는 마인드로 접근합니다. 실패해도 오래 좌절하지 않고 다음 계획을 세웁니다. 주변 사람들도 당신의 이런 에너지에 영향받습니다.",
      actionPlan: ["현실적 낙관주의 유지 - 근거 없는 자신감과 데이터 기반 자신감 구분하기", "낙관성 전파하기 - 힘들어하는 사람에게 '넌 해낼 수 있어'가 아닌 '같이 해보자'", "더 큰 도전에 자신감 적용 - 새로운 취미, 자격증, 사이드 프로젝트 등"],
      weeklyMission: "이번 주, 어려운 상황이 생기면 '이 상황에서 내가 배울 수 있는 것 3가지'를 적어보세요. 역경을 성장의 기회로 리프레이밍하는 연습입니다.",
      recommendedBooks: ["학습된 낙관주의 - 마틴 셀리그만", "마인드셋 - 캐롤 드웩"],
      recommendedMovies: ["쇼생크 탈출 (1994) - 가장 어두운 곳에서 피어나는 희망", "아이 필 프리티 (2018) - 나를 사랑하는 순간 바뀌는 세상"],
      affirmation: "나는 어떤 상황에서도 길을 찾아낼 수 있다고 믿습니다."
    },
    medium: {
      title: "상황에 따라 흔들리는 자기 확신",
      description: "평소에는 자신감이 있지만, 연속으로 실패하거나 비판을 받으면 '나는 안 되나 봐'라는 생각이 올라옵니다. 도전적인 일을 맡으면 설렘보다 걱정이 먼저 드는 날이 있고, 작은 실수에도 필요 이상으로 자책하는 경향이 있습니다.",
      currentState: "좋은 피드백을 받으면 자신감이 올라가지만, 부정적 피드백에 며칠간 기분이 다운됩니다. 중요한 일 전날 잠을 설치거나, 결정을 내리기 전 수십 번 확인합니다. '내가 이걸 할 자격이 있나?'라는 생각이 들 때가 있습니다.",
      actionPlan: ["'성공 증거 수집' 습관 - 과거에 잘했던 일, 받았던 칭찬을 노트에 정리해두고 자신감이 떨어질 때 꺼내보기", "부정적 셀프토크 인식하기 - '나는 안 돼' → '지금은 어렵지만 배울 수 있어'로 바꾸기", "매일 작은 성공 경험 쌓기 - 오늘의 To-Do 중 쉬운 것부터 완료하며 성취감 누적"],
      weeklyMission: "매일 저녁, '오늘 내가 잘한 일 3가지'를 휴대폰 메모장에 적어보세요. 아무리 작은 것이라도 괜찮습니다. 일주일 후 21개의 증거를 보며 자신을 돌아보세요.",
      recommendedBooks: ["긍정의 재발견 - 바바라 프레드릭슨", "당신도 잘될 수 있다 - 숀 에이커"],
      recommendedMovies: ["쇼생크 탈출 (1994) - 가장 어두운 곳에서 피어나는 희망", "아이 필 프리티 (2018) - 나를 사랑하는 순간 바뀌는 세상"],
      affirmation: "나는 과거에도 어려운 것을 해냈고, 앞으로도 해낼 수 있습니다."
    },
    low: {
      title: "자기 확신, 작은 성공에서 시작해요",
      description: "새로운 일이 생기면 '내가 할 수 있을까?'가 먼저 떠오릅니다. 실패했던 경험이 계속 떠올라 시도 자체를 피하게 됩니다. '어차피 안 될 거야', '다른 사람은 다 잘하는데 나만...'이라는 생각이 자주 듭니다. 이런 마음이 기회를 놓치게 만들기도 합니다.",
      currentState: "새로운 기회가 와도 '내가 감당할 수 있을까' 걱정에 거절하거나 주저합니다. 모임에서 아이디어가 있어도 '틀리면 어쩌지' 싶어 말하지 못합니다. 잠들기 전 '오늘도 뭘 한 게 없네'라는 자책을 합니다.",
      actionPlan: ["부정적 생각 기록 후 반박하기 - '난 안 돼' → '정말? 증거는? 반대 증거는?'", "'아직(yet)' 추가하기 - '못 해' → '아직 못 해. 배우면 돼.'", "아주 작은 목표 세우고 달성하기 - 크고 막막한 것보다 오늘 할 수 있는 작은 것 1개", "성공 일기 쓰기 - 매일 아무리 작아도 '완료한 것' 1개 기록"],
      weeklyMission: "이번 주, 부정적인 생각이 들 때마다 멈추고 '정말 그럴까? 100% 확실해? 다른 가능성은?'을 자문해보세요. 그리고 그 생각과 답변을 메모해보세요. 일주일 후 패턴을 발견할 수 있습니다.",
      recommendedBooks: ["셀프토크 - 에단 크로스", "나에게 친절할 것 - 크리스틴 네프"],
      recommendedMovies: ["쇼생크 탈출 (1994) - 가장 어두운 곳에서 피어나는 희망", "아이 필 프리티 (2018) - 나를 사랑하는 순간 바뀌는 세상"],
      affirmation: "나는 아직 성장 중이고, 한 걸음씩 더 나아질 수 있습니다."
    }
  },
  [SubCategory.LIFE_SATISFACTION]: {
    high: {
      title: "충만한 일상과 삶의 균형",
      description: "당신은 삶의 여러 영역에서 균형을 잘 유지하고 있습니다. 아침에 눈을 뜨면 '오늘도 좋은 하루가 되겠지'라는 생각이 자연스럽게 듭니다. 가족과의 시간, 친구와의 만남, 취미 활동, 그리고 일까지 모든 영역에서 나름의 만족을 느끼고 있습니다. '이 정도면 잘 살고 있다'는 생각이 자주 듭니다.",
      currentState: "주말 아침에 여유롭게 커피를 마시며 '참 좋다'고 느낍니다. 가족과 함께하는 저녁 식사, 친구와의 수다, 좋아하는 드라마 보는 시간 등 일상의 작은 순간들에서 행복을 느낍니다. 더 큰 것을 갈망하기보다 지금 있는 것에 감사합니다.",
      actionPlan: ["만족도를 유지하면서도 새로운 성장 영역 탐색 - 매너리즘 방지", "이 만족감의 원천이 무엇인지 명확히 인식하기 - 흔들릴 때 돌아올 기준점", "주변의 힘든 사람에게 자신의 균형 비결 공유하기"],
      weeklyMission: "이번 주, '내 삶에서 가장 감사한 5가지'를 구체적으로 적어보세요. 그리고 그중 하나에게 직접 감사를 표현해보세요. (예: 부모님께 전화하기, 친구에게 감사 문자 보내기, 반려동물과 특별한 시간 갖기)",
      recommendedBooks: ["플로리시 - 마틴 셀리그만", "행복의 조건 - 조지 베일런트"],
      recommendedMovies: ["포레스트 검프 (1994) - 인생이라는 초콜릿 상자를 즐기는 법", "바비 (2023) - 있는 그대로의 나를 긍정하는 만족감"],
      affirmation: "나는 내 삶에 감사하며, 매일을 의미 있게 살고 있습니다."
    },
    medium: {
      title: "만족과 갈망 사이에 있는 삶",
      description: "삶이 나쁘지는 않지만, '이게 다인가?'라는 생각이 가끔 듭니다. 평일은 무난하게 지나가고 주말은 빠르게 끝나버립니다. 친구들의 SNS를 보며 '다들 잘 사는 것 같은데...'라는 비교를 하게 되고, 더 나은 삶을 상상하며 현실과 비교합니다.",
      currentState: "주말 저녁이면 '벌써 끝이야?'라는 생각이 들고, '다른 선택을 했으면 어땠을까' 상상합니다. 친구의 결혼 소식, 누군가의 여행 사진에 복잡한 감정이 듭니다. '지금도 괜찮은데...'와 '이래도 되나...' 사이를 오갑니다. 특별히 불행하진 않지만, 마냥 행복하지도 않습니다.",
      actionPlan: ["삶의 5대 영역(건강, 관계, 일, 여가, 성장) 점검하기 - 각 영역 만족도 1-10점 체크", "가장 낮은 영역에서 '한 가지'만 개선하기 - 작은 변화부터", "진정으로 원하는 것 탐색 - '내가 정말 원하는 게 뭐지?'를 조용히 생각하는 시간 갖기"],
      weeklyMission: "이번 주말, 30분간 혼자 조용한 곳에서 삶의 5대 영역(건강, 관계, 일, 여가, 성장)에 1-10점을 매겨보세요. 가장 낮은 영역에서 '다음 주에 할 수 있는 작은 행동 1가지'를 정해보세요.",
      recommendedBooks: ["인생 수업 - 엘리자베스 퀴블러 로스", "하버드 행복학 강의 - 탈 벤 샤하르"],
      recommendedMovies: ["포레스트 검프 (1994) - 인생이라는 초콜릿 상자를 즐기는 법", "바비 (2023) - 있는 그대로의 나를 긍정하는 만족감"],
      affirmation: "나는 내 삶을 더 좋은 방향으로 만들어갈 힘이 있습니다."
    },
    low: {
      title: "삶의 만족도, 재설계가 필요한 시점",
      description: "요즘 삶이 무료하게 느껴집니다. 아침에 일어나기 싫고, 하루가 그냥 흘러가고, 잠자리에 누워도 '오늘 뭘 했지?'라는 생각이 듭니다. '왜 이렇게 살고 있지?', '다시 태어나면 이렇게 살지 않을 텐데'라는 생각이 자주 듭니다. 하지만 이 불만족은 변화의 출발점이 될 수 있습니다.",
      currentState: "아침에 눈 뜨면 '또 하루가 시작됐네' 한숨이 나옵니다. 좋아하던 취미도 시들해지고, 만나던 친구도 점점 뜸해집니다. 맛있는 것을 먹어도, 여행을 가도 금방 원래대로 돌아옵니다. '뭘 해야 행복할까'를 모르겠고, 그냥 하루하루 버티는 느낌입니다.",
      actionPlan: ["현재 상황에서 '작은 좋은 점' 찾기 - 아무리 작아도 하루에 1개", "가치관 정리하기 - '나에게 정말 중요한 것'이 관계인지, 성장인지, 자유인지, 안정인지 써보기", "변화 가능한 것과 불가능한 것 구분하기 - 에너지를 쓸 곳 정하기", "전문 상담 고려하기 - 혼자 풀기 어려우면 상담 활용"],
      weeklyMission: "오늘부터 일주일간, 매일 밤 '오늘 하루 중 가장 좋았던 순간 1개'를 기록해보세요. 아무리 사소해도 괜찮습니다. (맛있는 점심, 따뜻한 햇살, 고양이 영상...) 일주일 후 어떤 것들이 나를 기분 좋게 하는지 패턴을 찾아보세요.",
      recommendedBooks: ["죽음의 수용소에서 - 빅터 프랭클", "미움받을 용기 - 기시미 이치로"],
      recommendedMovies: ["포레스트 검프 (1994) - 인생이라는 초콜릿 상자를 즐기는 법", "바비 (2023) - 있는 그대로의 나를 긍정하는 만족감"],
      affirmation: "나는 내 삶을 새롭게 디자인할 수 있습니다. 오늘이 그 시작입니다."
    }
  },
  [SubCategory.GRATITUDE]: {
    high: {
      title: "감사할 줄 아는 풍요로운 마음",
      description: "당신은 일상의 작은 것들도 '당연한 것'이 아니라 '감사한 것'으로 받아들입니다. 가족이 차려준 밥, 친구의 안부 문자, 맑은 날씨까지 감사의 눈으로 바라봅니다. 이런 감사 능력은 관계를 깊게 하고, 어려운 상황에서도 긍정적 요소를 발견하게 해줍니다.",
      currentState: "아침에 눈을 떠서 날씨가 좋으면 '오늘 기분 좋다'고 느끼고, 밥을 함께 먹을 사람이 있음에 감사합니다. 힘든 일이 있어도 '이걸 통해 배우고 있다'는 관점을 가질 수 있습니다. 가족, 친구, 지인에게 '고마워'라는 말을 자연스럽게 합니다.",
      actionPlan: ["감사를 더 구체적으로 표현하기 - '고마워' 대신 '그때 ~해줘서 정말 도움됐어'", "주변에 감사 문화 퍼뜨리기 - 생일이 아니어도 감사 메시지 보내기", "힘든 상황에서도 감사 찾기 연습 - 실패에서도 '덕분에 ~를 알게 됐다' 리프레이밍"],
      weeklyMission: "이번 주, 3명에게 구체적인 감사 메시지를 보내보세요. '고마워'가 아니라 '지난번 ~할 때 ~해줘서 정말 ~했어. 고마워'처럼 구체적으로요. 상대방의 반응과 내 기분을 관찰해보세요.",
      recommendedBooks: ["감사의 힘 - 로버트 에몬스", "작은 것이 아름답다 - E.F. 슈마허"],
      recommendedMovies: ["어바웃 타임 (2013) - 평범한 하루를 다시 살게 하는 감사의 힘", "원더 (2017) - 서로가 서로에게 기적이 되는 순간들"],
      affirmation: "나는 매 순간 감사할 것들로 둘러싸여 있습니다."
    },
    medium: {
      title: "좋은 일에만 감사하는 마음",
      description: "생일 선물을 받거나 좋은 일이 생기면 감사하지만, 평범한 일상에서 감사하긴 어렵습니다. 누군가 도와줘도 '당연한 것'으로 여기다가 나중에야 '그때 고마웠는데'라고 생각합니다. 감사해야 할 것들을 머리로는 알지만, 바쁜 일상에서 잊어버립니다.",
      currentState: "연말에 1년을 돌아보며 '감사해야 할 일이 많았네'라고 생각하지만, 평소엔 불만이 먼저 떠오릅니다. 맛있는 것을 먹으면 '배부르다', 여행을 다녀오면 '벌써 끝이야'가 먼저입니다. 감사를 표현하는 것도 조금 어색합니다.",
      actionPlan: ["감사 일기 시작하기 - 매일 밤 '오늘 감사한 일 3가지' 적기", "'당연한 것' 다시 보기 - 건강, 가족, 친구, 집... 없다고 상상해보면 감사해짐", "감사 표현 연습 - 하루에 1명에게 '고마워'라고 말하기"],
      weeklyMission: "매일 자기 전, '오늘 감사한 일 3가지'를 휴대폰 메모장에 적어보세요. 반복되어도 괜찮습니다. 구체적일수록 좋습니다 ('점심이 맛있었다'보다 '엄마가 해준 김치찌개가 맛있었다'). 일주일 후 21개를 보며 패턴을 발견해보세요.",
      recommendedBooks: ["행복의 정복 - 버트런드 러셀", "감사하면 달라지는 것들 - 잰니스 캐플란"],
      recommendedMovies: ["어바웃 타임 (2013) - 평범한 하루를 다시 살게 하는 감사의 힘", "원더 (2017) - 서로가 서로에게 기적이 되는 순간들"],
      affirmation: "나는 매일 감사할 것들을 발견하는 연습을 하고 있습니다."
    },
    low: {
      title: "감사 능력, 훈련으로 키울 수 있어요",
      description: "솔직히 감사할 게 별로 없다고 느껴집니다. 남들은 다 잘 풀리는 것 같은데 나만 힘든 것 같고, 노력해도 돌아오는 건 없는 것 같습니다. '감사하라'는 말이 공허하게 들리고, 오히려 짜증이 날 때도 있습니다. 하지만 감사는 감정이 아니라 관점의 훈련입니다.",
      currentState: "'왜 나만 이럴까', '다른 사람은 좋겠다'라는 생각이 자주 듭니다. 좋은 일이 생겨도 금방 당연해지고, 나쁜 일은 오래 기억됩니다. 누가 도와줘도 '원래 그래야 하는 거 아니야?'라고 생각하거나, 감사 표현이 어색합니다.",
      actionPlan: ["아침에 눈 뜨면 '오늘도 눈을 떴다'에 감사로 시작하기 - 아무리 작아도 하나", "불평이 올라올 때 '그래도 ~는 있잖아' 한 가지 찾기", "'이것마저 없다면?' 상상하기 - 건강, 가족, 친구, 집... 없으면 어떨까?", "감사 알림 앱 활용하기 - 하루 3번 알림 받고 그 순간 감사한 것 1개 떠올리기"],
      weeklyMission: "오늘부터 일주일간, 불평이나 짜증이 올라올 때마다 '그래도 ~는 있잖아'를 찾아보세요. 무리하게 긍정적일 필요 없고, 작은 것이라도 괜찮습니다. ('아 귀찮아' → '그래도 건강하잖아'). 몇 번 시도했는지 기록해보세요.",
      recommendedBooks: ["감사의 기술 - 마치 시모프", "긍정의 발견 - 소냐 류보머스키"],
      recommendedMovies: ["어바웃 타임 (2013) - 평범한 하루를 다시 살게 하는 감사의 힘", "원더 (2017) - 서로가 서로에게 기적이 되는 순간들"],
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
