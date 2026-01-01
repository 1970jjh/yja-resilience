
export enum Category {
  SELF_REGULATION = '자기조절능력',
  INTERPERSONAL = '대인관계능력',
  POSITIVITY = '긍정성'
}

export enum SubCategory {
  EMOTION_CONTROL = '감정조절력',
  IMPULSE_CONTROL = '충동통제력',
  CAUSAL_ANALYSIS = '원인분석력',
  COMMUNICATION = '소통능력',
  EMPATHY = '공감능력',
  EGO_EXPANSION = '자아확장력',
  SELF_OPTIMISM = '자아낙관성',
  LIFE_SATISFACTION = '생활만족도',
  GRATITUDE = '감사하기'
}

export interface Question {
  id: number;
  text: string;
  category: Category;
  subCategory: SubCategory;
  isReverse: boolean;
}

export interface AssessmentResult {
  totalScore: number;
  categoryScores: Record<Category, number>;
  subCategoryScores: Record<SubCategory, number>;
  persona: string;
  feedback: {
    strengths: string;
    improvements: {
      title: string;
      content: string;
      mission: string;
    }[];
  };
}
