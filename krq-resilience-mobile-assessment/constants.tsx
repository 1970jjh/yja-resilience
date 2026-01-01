
import { Category, SubCategory, Question } from './types';

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
  { min: 200, name: "인재파 (Talent Group)", desc: "웬만한 불행한 사건은 당신을 흔들지 못합니다. 당신은 탁월한 회복탄력성으로 무장한 인재입니다!" },
  { min: 180, name: "노력파 (Effort Group)", desc: "대한민국 평균 수준입니다. 조금만 더 노력해볼까요? 체계적인 훈련으로 더 큰 잠재력을 깨울 수 있습니다." },
  { min: 0, name: "나약파 (Weak Group)", desc: "사소한 부정적 사건에 쉽게 영향을 받습니다. 마음 근육을 키우는 집중적인 관리가 필요합니다." }
];
