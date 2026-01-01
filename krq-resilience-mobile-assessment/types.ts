
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

export interface DetailedFeedback {
  title: string;
  description: string;
  currentState: string;
  actionPlan: string[];
  weeklyMission: string;
  recommendedBooks: string[];
  recommendedMovies: string[];
  affirmation: string;
}

export interface SubCategoryAnalysis {
  subCategory: SubCategory;
  score: number;
  maxScore: number;
  percentage: number;
  level: '매우 높음' | '높음' | '보통' | '낮음' | '매우 낮음';
  interpretation: string;
  detailedFeedback: DetailedFeedback;
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

export interface EnhancedAssessmentResult extends AssessmentResult {
  participantName: string;
  participantEmail?: string;
  completedAt: string;
  roomId: string;
  subCategoryAnalysis: SubCategoryAnalysis[];
  overallInterpretation: string;
  personalGrowthPlan: {
    immediate: string[];
    shortTerm: string[];
    longTerm: string[];
  };
  strengthAreas: SubCategory[];
  improvementAreas: SubCategory[];
}

// Firebase 관련 타입
export interface Room {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  createdBy: string;
  accessCode: string;
  isActive: boolean;
  participantCount: number;
  teamCount: number;  // 팀 갯수
  teams: string[];    // 팀 이름 목록 (예: ["1팀", "2팀", "3팀"])
}

export interface Participant {
  id: string;
  roomId: string;
  name: string;
  team: string;       // 소속 팀
  email?: string;
  completedAt: string;
  result: EnhancedAssessmentResult;
}

export interface RoomStats {
  totalParticipants: number;
  averageTotalScore: number;
  averageCategoryScores: Record<Category, number>;
  averageSubCategoryScores: Record<SubCategory, number>;
  personaDistribution: Record<string, number>;
  scoreDistribution: {
    high: number;    // 200+
    medium: number;  // 180-199
    low: number;     // <180
  };
}

export interface AdminUser {
  uid: string;
  email: string;
  displayName?: string;
  createdAt: string;
}
