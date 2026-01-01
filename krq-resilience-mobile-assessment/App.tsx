
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { QUESTIONS, PERSONA_RULES, DETAILED_FEEDBACK_DATA, OVERALL_INTERPRETATIONS, RESILIENCE_INTRO } from './constants';
import { Category, SubCategory, EnhancedAssessmentResult, SubCategoryAnalysis, Room, Participant, RoomStats } from './types';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell } from 'recharts';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import JSZip from 'jszip';
import {
  initializeFirebase,
  createRoom,
  getRoom,
  getAllActiveRooms,
  deleteRoom,
  updateRoom,
  saveParticipantResult,
  getParticipantsByRoom,
  calculateRoomStats,
  generateAccessCode
} from './firebase';

// --- Constants ---
const ADMIN_PASSWORD = "6749467";

// --- Utility Components ---
const Button: React.FC<{
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit';
}> = ({ onClick, children, variant = 'primary', className = '', disabled, type = 'button' }) => {
  const baseClass = "brutal-border brutal-shadow font-brutal px-6 py-3 transition-transform active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-white hover:bg-[#A3E635]",
    secondary: "bg-[#00D1FF] hover:bg-[#00B8E6]",
    danger: "bg-[#FF5C00] text-white hover:bg-[#E65200]",
    success: "bg-[#A3E635] hover:bg-[#8BC34A]"
  };
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={`${baseClass} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const Card: React.FC<{ children: React.ReactNode; className?: string; id?: string; onClick?: () => void }> = ({ children, className = '', id, onClick }) => (
  <div id={id} onClick={onClick} className={`bg-white brutal-border brutal-shadow p-6 mb-6 ${className}`}>
    {children}
  </div>
);

const Input: React.FC<{
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  type?: string;
  className?: string;
}> = ({ value, onChange, placeholder, type = 'text', className = '' }) => (
  <input
    type={type}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className={`w-full p-3 brutal-border bg-white font-bold focus:outline-none focus:ring-2 focus:ring-black ${className}`}
  />
);

const Select: React.FC<{
  value: string;
  onChange: (val: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
}> = ({ value, onChange, options, placeholder, className = '' }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className={`w-full p-3 brutal-border bg-white font-bold focus:outline-none focus:ring-2 focus:ring-black ${className}`}
  >
    {placeholder && <option value="">{placeholder}</option>}
    {options.map(opt => (
      <option key={opt.value} value={opt.value}>{opt.label}</option>
    ))}
  </select>
);

// --- Main App ---
type AppStep = 'landing' | 'participant-info' | 'test' | 'result' | 'admin-login' | 'admin-dashboard';

const App: React.FC = () => {
  // State
  const [step, setStep] = useState<AppStep>('landing');
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentIdx, setCurrentIdx] = useState(0);
  const [activeRooms, setActiveRooms] = useState<Room[]>([]);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [userName, setUserName] = useState('');
  const [userTeam, setUserTeam] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Admin state
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [roomParticipants, setRoomParticipants] = useState<Participant[]>([]);
  const [roomStats, setRoomStats] = useState<RoomStats | null>(null);
  const [newRoomName, setNewRoomName] = useState('');
  const [newRoomTeamCount, setNewRoomTeamCount] = useState('3');
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const [viewMode, setViewMode] = useState<'all' | 'team'>('all');
  const [selectedTeamFilter, setSelectedTeamFilter] = useState<string>('');
  const [savedResult, setSavedResult] = useState<EnhancedAssessmentResult | null>(null);

  const resultRef = useRef<HTMLDivElement>(null);

  // Initialize Firebase and load rooms
  useEffect(() => {
    try {
      initializeFirebase();
      loadActiveRooms();
    } catch (e) {
      console.log('Firebase not configured yet');
    }
  }, []);

  // Auto-refresh for admin dashboard (every 5 seconds when room is selected)
  useEffect(() => {
    if (step === 'admin-dashboard' && selectedRoom) {
      const interval = setInterval(async () => {
        try {
          const participants = await getParticipantsByRoom(selectedRoom.id);
          setRoomParticipants(participants);
          setRoomStats(calculateRoomStats(participants));
          // Also refresh room list to get updated participant counts
          await loadActiveRooms();
        } catch (e) {
          console.error('Auto-refresh error:', e);
        }
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [step, selectedRoom]);

  const loadActiveRooms = async () => {
    try {
      const rooms = await getAllActiveRooms();
      setActiveRooms(rooms);
    } catch (e) {
      console.error('Failed to load rooms:', e);
    }
  };

  // Auto-save result when test is completed (step changes to 'result')
  const [autoSaved, setAutoSaved] = useState(false);

  useEffect(() => {
    const autoSaveResult = async () => {
      if (step === 'result' && currentRoom && !autoSaved && Object.keys(answers).length === QUESTIONS.length) {
        try {
          await saveParticipantResult(currentRoom.id, {
            roomId: currentRoom.id,
            name: userName,
            team: userTeam,
            completedAt: new Date().toISOString(),
            result: calculateResults
          });
          setAutoSaved(true);
          console.log('Result auto-saved to Firestore');
        } catch (e) {
          console.error('Auto-save error:', e);
        }
      }
    };

    autoSaveResult();
  }, [step, currentRoom, autoSaved, answers, userName, userTeam]);

  // Reset autoSaved when starting a new test
  useEffect(() => {
    if (step === 'test') {
      setAutoSaved(false);
    }
  }, [step]);

  // Handlers
  const handleSelectCourse = (room: Room) => {
    setCurrentRoom(room);
    setUserTeam('');
    setUserName('');
    setStep('participant-info');
  };

  const handleStartTest = () => {
    if (!userName.trim()) {
      setError('이름을 입력해주세요.');
      return;
    }
    if (!userTeam) {
      setError('팀을 선택해주세요.');
      return;
    }
    setError('');
    setAnswers({});
    setCurrentIdx(0);
    setStep('test');
  };

  const handleAnswer = (value: number) => {
    setAnswers(prev => ({ ...prev, [QUESTIONS[currentIdx].id]: value }));
    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setStep('result');
    }
  };

  // Go back to previous question
  const handleGoBack = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  // Handle answer change (for when going back and selecting a different answer)
  const handleAnswerChange = (value: number) => {
    const currentAnswer = answers[QUESTIONS[currentIdx].id];
    if (currentAnswer === value) {
      // If clicking the same answer, just proceed to next question
      if (currentIdx < QUESTIONS.length - 1) {
        setCurrentIdx(currentIdx + 1);
      } else {
        setStep('result');
      }
    } else {
      // If clicking a different answer, update and proceed
      setAnswers(prev => ({ ...prev, [QUESTIONS[currentIdx].id]: value }));
      if (currentIdx < QUESTIONS.length - 1) {
        setCurrentIdx(currentIdx + 1);
      } else {
        setStep('result');
      }
    }
  };

  const handleAdminLogin = () => {
    if (adminPassword === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setStep('admin-dashboard');
      setError('');
      loadActiveRooms();
    } else {
      setError('비밀번호가 틀렸습니다.');
    }
  };

  const handleCreateRoom = async () => {
    if (!newRoomName.trim()) {
      setError('과정명을 입력해주세요.');
      return;
    }
    setLoading(true);
    try {
      const teamCount = parseInt(newRoomTeamCount) || 3;
      const teams = Array.from({ length: teamCount }, (_, i) => `${i + 1}팀`);
      const accessCode = generateAccessCode();

      await createRoom({
        name: newRoomName,
        description: `${teamCount}개 팀`,
        createdBy: 'admin',
        accessCode,
        isActive: true,
        teamCount,
        teams
      });

      await loadActiveRooms();
      setNewRoomName('');
      setNewRoomTeamCount('3');
      setShowCreateRoom(false);
      setError('');
    } catch (e: any) {
      console.error('Room creation error:', e);
      setError(`과정 생성 실패: ${e.message || e}`);
    }
    setLoading(false);
  };

  const handleDeleteRoom = async (roomId: string) => {
    if (!confirm('정말로 이 과정을 삭제하시겠습니까?')) return;
    setLoading(true);
    try {
      await deleteRoom(roomId);
      await loadActiveRooms();
      if (selectedRoom?.id === roomId) {
        setSelectedRoom(null);
        setRoomParticipants([]);
        setRoomStats(null);
      }
    } catch (e) {
      console.error('Failed to delete room:', e);
    }
    setLoading(false);
  };

  const handleSelectRoom = async (room: Room) => {
    setSelectedRoom(room);
    setSelectedParticipant(null);
    setLoading(true);
    try {
      const participants = await getParticipantsByRoom(room.id);
      setRoomParticipants(participants);
      setRoomStats(calculateRoomStats(participants));
    } catch (e) {
      console.error('Failed to load participants:', e);
    }
    setLoading(false);
  };

  // Calculate results
  const getSubCategoryLevel = (score: number, maxScore: number): '매우 높음' | '높음' | '보통' | '낮음' | '매우 낮음' => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return '매우 높음';
    if (percentage >= 65) return '높음';
    if (percentage >= 50) return '보통';
    if (percentage >= 35) return '낮음';
    return '매우 낮음';
  };

  const getFeedbackLevel = (score: number, maxScore: number): 'high' | 'medium' | 'low' => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 70) return 'high';
    if (percentage >= 50) return 'medium';
    return 'low';
  };

  const calculateResults = useMemo((): EnhancedAssessmentResult => {
    const catScores = {
      [Category.SELF_REGULATION]: 0,
      [Category.INTERPERSONAL]: 0,
      [Category.POSITIVITY]: 0
    };
    const subScores = {
      [SubCategory.EMOTION_CONTROL]: 0,
      [SubCategory.IMPULSE_CONTROL]: 0,
      [SubCategory.CAUSAL_ANALYSIS]: 0,
      [SubCategory.COMMUNICATION]: 0,
      [SubCategory.EMPATHY]: 0,
      [SubCategory.EGO_EXPANSION]: 0,
      [SubCategory.SELF_OPTIMISM]: 0,
      [SubCategory.LIFE_SATISFACTION]: 0,
      [SubCategory.GRATITUDE]: 0,
    };

    let totalRaw = 0;
    QUESTIONS.forEach(q => {
      let val = answers[q.id] || 3;
      if (q.isReverse) val = 6 - val;
      catScores[q.category] += val;
      subScores[q.subCategory] += val;
      totalRaw += val;
    });

    const personaRule = PERSONA_RULES.find(r => totalRaw >= r.min);
    const persona = personaRule?.name || "마시멜로우";

    const subCategoryAnalysis: SubCategoryAnalysis[] = Object.values(SubCategory).map(sub => {
      const score = subScores[sub];
      const maxScore = sub === SubCategory.LIFE_SATISFACTION ? 25 : 30;
      const percentage = Math.round((score / maxScore) * 100);
      const level = getSubCategoryLevel(score, maxScore);
      const feedbackLevel = getFeedbackLevel(score, maxScore);
      const feedback = DETAILED_FEEDBACK_DATA[sub][feedbackLevel];

      return {
        subCategory: sub,
        score,
        maxScore,
        percentage,
        level,
        interpretation: feedback.description,
        detailedFeedback: feedback
      };
    });

    const sortedSubs = [...subCategoryAnalysis].sort((a, b) => b.percentage - a.percentage);
    const strengthAreas = sortedSubs.slice(0, 3).map(s => s.subCategory);
    const improvementAreas = sortedSubs.slice(-3).reverse().map(s => s.subCategory);

    let overallLevel: 'high' | 'medium' | 'low' = 'medium';
    if (totalRaw >= 201) overallLevel = 'high';
    else if (totalRaw < 181) overallLevel = 'low';

    const personalGrowthPlan = {
      immediate: improvementAreas.slice(0, 2).map(area => {
        const analysis = subCategoryAnalysis.find(s => s.subCategory === area);
        return analysis?.detailedFeedback.weeklyMission || '';
      }),
      shortTerm: improvementAreas.map(area => {
        const analysis = subCategoryAnalysis.find(s => s.subCategory === area);
        return analysis?.detailedFeedback.actionPlan[0] || '';
      }),
      longTerm: [
        "정기적인 자기 점검과 회복탄력성 재측정 (3개월 후)",
        "관련 도서 읽기 및 실천",
        "필요시 전문 상담 또는 코칭 받기"
      ]
    };

    const generateAnalysis = () => {
      const sr = catScores[Category.SELF_REGULATION];
      const is = catScores[Category.INTERPERSONAL];
      const po = catScores[Category.POSITIVITY];

      let strengths = "";
      const improvements: { title: string; content: string; mission: string; }[] = [];

      if (sr >= 70) strengths += `[자기조절능력] 당신은 감정 조절이 우수합니다. `;
      if (is >= 74) strengths += `[대인관계] 타인의 감정을 읽는 공감능력이 뛰어납니다. `;
      if (po >= 70) strengths += `[긍정성] 삶에 대한 낙관과 감사하는 태도가 훌륭합니다. `;

      if (!strengths) strengths = "마음 근력을 본격적으로 단련해야 하는 시기입니다.";

      if (sr < 70) {
        improvements.push({
          title: "자기조절능력 솔루션",
          content: `자기조절 점수(${sr}점)를 높이는 훈련이 필요합니다.`,
          mission: "감정 일기를 쓰세요."
        });
      }
      if (is < 74) {
        improvements.push({
          title: "대인관계능력 솔루션",
          content: `대인관계 점수(${is}점) 보완이 필요합니다.`,
          mission: "'나 전달법'을 사용해보세요."
        });
      }
      if (po < 70) {
        improvements.push({
          title: "긍정성 솔루션",
          content: `긍정성 점수(${po}점)를 높여보세요.`,
          mission: "매일 밤 '세 가지 감사 일기'를 적으세요."
        });
      }

      return { strengths, improvements };
    };

    return {
      totalScore: totalRaw,
      categoryScores: catScores,
      subCategoryScores: subScores,
      persona,
      feedback: generateAnalysis(),
      participantName: userName,
      participantEmail: '',
      completedAt: new Date().toISOString(),
      roomId: currentRoom?.id || 'direct',
      subCategoryAnalysis,
      overallInterpretation: OVERALL_INTERPRETATIONS[overallLevel],
      personalGrowthPlan,
      strengthAreas,
      improvementAreas
    };
  }, [answers, userName, currentRoom]);

  // Save and download
  const handleSaveResult = async () => {
    setLoading(true);
    try {
      // Only save to Firestore if not already auto-saved
      if (currentRoom && !autoSaved) {
        await saveParticipantResult(currentRoom.id, {
          roomId: currentRoom.id,
          name: userName,
          team: userTeam,
          completedAt: new Date().toISOString(),
          result: calculateResults
        });
        setAutoSaved(true);
      }
      setSavedResult(calculateResults);
      await generateAndDownloadPDF();
      alert("PDF가 다운로드되었습니다!" + (autoSaved ? " (결과는 이미 저장됨)" : " 결과도 저장되었습니다!"));
    } catch (e) {
      console.error('Save error:', e);
      alert('저장 중 오류가 발생했습니다.');
    }
    setLoading(false);
  };

  const generateAndDownloadPDF = async (participant?: Participant) => {
    const element = document.getElementById('result-content');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = pdfHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();

      while (heightLeft >= 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
        heightLeft -= pdf.internal.pageSize.getHeight();
      }

      const name = participant?.name || userName;
      pdf.save(`KRQ_회복탄력성_${name}_${new Date().toLocaleDateString()}.pdf`);
    } catch (e) {
      console.error('PDF generation error:', e);
    }
  };

  // Generate single participant PDF as blob using html2canvas for Korean support
  const generateParticipantPDFBlob = async (participant: Participant): Promise<Blob> => {
    const result = participant.result;
    const personaRule = PERSONA_RULES.find(r => result.totalScore >= r.min);

    // Create temporary container for rendering
    const tempContainer = document.createElement('div');
    tempContainer.id = 'temp-pdf-container';
    tempContainer.style.cssText = `
      position: fixed;
      left: -9999px;
      top: 0;
      width: 800px;
      background: #FFDE03;
      padding: 30px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    `;

    // Build HTML content
    const subCategoryAnalysis = result.subCategoryAnalysis || [];
    const sortedAnalysis = [...subCategoryAnalysis].sort((a, b) => a.percentage - b.percentage);

    tempContainer.innerHTML = `
      <div style="border: 4px solid black; padding: 20px; background: #FFDE03;">
        <!-- Header -->
        <h1 style="font-size: 24px; font-weight: 900; text-align: center; margin: 0 0 10px 0; border-bottom: 4px solid black; padding-bottom: 10px;">
          회복탄력성 심층 분석 리포트
        </h1>
        <p style="text-align: center; font-weight: bold; margin: 0 0 20px 0;">
          ${participant.team || '-'} | ${participant.name}님 | ${new Date(participant.completedAt).toLocaleDateString()}
        </p>

        <!-- Persona & Total Score -->
        <div style="display: flex; gap: 20px; margin-bottom: 20px;">
          <div style="flex: 1; background: ${personaRule?.color || '#fff'}; border: 4px solid black; padding: 15px; text-align: center;">
            <p style="font-size: 10px; font-weight: bold; margin: 0;">당신의 유형</p>
            <div style="font-size: 40px; margin: 10px 0;">${personaRule?.emoji || ''}</div>
            <h2 style="font-size: 20px; font-weight: 900; margin: 0 0 5px 0;">${result.persona}</h2>
            <p style="font-size: 10px; font-weight: bold; margin: 0;">${personaRule?.desc || ''}</p>
          </div>
          <div style="flex: 1; background: white; border: 4px solid black; padding: 15px; text-align: center;">
            <p style="font-size: 10px; font-weight: bold; margin: 0;">총점</p>
            <div style="font-size: 48px; font-weight: 900; margin: 10px 0;">${result.totalScore}</div>
            <div style="font-size: 9px; font-weight: bold;">
              <p style="margin: 2px 0; ${result.totalScore >= 201 ? 'background: black; color: white; padding: 2px;' : 'opacity: 0.6;'}">201점 이상: 슈퍼 고무공</p>
              <p style="margin: 2px 0; ${result.totalScore >= 181 && result.totalScore <= 200 ? 'background: black; color: white; padding: 2px;' : 'opacity: 0.6;'}">181-200점: 테니스공</p>
              <p style="margin: 2px 0; ${result.totalScore <= 180 ? 'background: black; color: white; padding: 2px;' : 'opacity: 0.6;'}">180점 이하: 마시멜로우</p>
            </div>
          </div>
        </div>

        <!-- Overall Interpretation -->
        <div style="background: white; border: 4px solid black; padding: 15px; margin-bottom: 20px;">
          <h3 style="font-weight: 900; font-size: 16px; margin: 0 0 10px 0; border-bottom: 2px solid black; padding-bottom: 5px;">종합 해석</h3>
          <p style="font-size: 12px; line-height: 1.6; margin: 0;">${result.overallInterpretation}</p>
        </div>

        <!-- Strengths & Improvements -->
        <div style="display: flex; gap: 20px; margin-bottom: 20px;">
          <div style="flex: 1; background: #A3E635; border: 4px solid black; padding: 15px;">
            <h3 style="font-weight: 900; font-size: 14px; margin: 0 0 10px 0;">나의 강점 TOP 3</h3>
            ${result.strengthAreas.map((area, i) => `
              <div style="background: rgba(255,255,255,0.5); padding: 8px; margin-bottom: 8px; border-radius: 4px;">
                <div style="font-weight: bold; font-size: 12px;">${i + 1}. ${area}</div>
              </div>
            `).join('')}
          </div>
          <div style="flex: 1; background: #FF5C00; color: white; border: 4px solid black; padding: 15px;">
            <h3 style="font-weight: 900; font-size: 14px; margin: 0 0 10px 0;">성장 필요 영역 TOP 3</h3>
            ${result.improvementAreas.map((area, i) => `
              <div style="background: rgba(255,255,255,0.2); padding: 8px; margin-bottom: 8px; border-radius: 4px;">
                <div style="font-weight: bold; font-size: 12px;">${i + 1}. ${area}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Category Scores -->
        <div style="background: white; border: 4px solid black; padding: 15px; margin-bottom: 20px;">
          <h3 style="font-weight: 900; font-size: 14px; margin: 0 0 15px 0; border-bottom: 2px solid black; padding-bottom: 5px;">영역별 상세 점수</h3>
          ${(Object.keys(categoryMapping) as Category[]).map(cat => {
            const catScore = result.categoryScores[cat];
            const avg = koreanAverageScores[cat];
            return `
              <div style="margin-bottom: 15px;">
                <div style="display: flex; justify-content: space-between; border-bottom: 1px solid black; padding-bottom: 5px; margin-bottom: 8px;">
                  <div>
                    <span style="font-weight: 900; font-size: 13px; color: ${categoryColor[cat]};">${cat}</span>
                    <span style="font-size: 9px; opacity: 0.6; margin-left: 10px;">한국인 평균 ${avg}점</span>
                  </div>
                  <div style="text-align: right;">
                    <span style="font-weight: 900; font-size: 16px;">${catScore}점</span>
                    <span style="font-size: 9px; color: ${catScore >= avg ? '#A3E635' : '#FF5C00'}; font-weight: bold; margin-left: 5px;">
                      ${catScore >= avg ? '▲ 평균 이상' : '▼ 평균 이하'}
                    </span>
                  </div>
                </div>
                <div style="padding-left: 10px;">
                  ${categoryMapping[cat].map(sub => {
                    const analysis = subCategoryAnalysis.find(s => s.subCategory === sub);
                    if (!analysis) return '';
                    return `
                      <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px; margin-bottom: 4px;">
                        <span style="font-weight: bold;">${sub}</span>
                        <div style="display: flex; align-items: center; gap: 8px;">
                          <span style="font-size: 9px; background: #eee; padding: 1px 4px;">${analysis.level}</span>
                          <div style="width: 60px; height: 8px; background: #ddd; border: 1px solid black;">
                            <div style="height: 100%; background: ${categoryColor[cat]}; width: ${analysis.percentage}%;"></div>
                          </div>
                          <span style="font-weight: 900; width: 40px; text-align: right;">${analysis.score}/${analysis.maxScore}</span>
                        </div>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- 9 Factor Detailed Feedback -->
        <div style="background: black; color: white; padding: 10px; text-align: center; font-weight: 900; font-size: 14px; margin-bottom: 15px;">
          9가지 요인 맞춤 분석 및 성장 가이드
        </div>
        <p style="text-align: center; font-size: 10px; opacity: 0.7; margin-bottom: 15px;">※ 낮은 점수 순으로 표시됩니다</p>

        ${sortedAnalysis.map((analysis, idx) => `
          <div style="background: white; border: 4px solid black; padding: 15px; margin-bottom: 15px;">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px;">
              <div>
                <span style="font-size: 10px; font-weight: bold; padding: 2px 6px; margin-right: 8px; ${idx < 3 ? 'background: #FF5C00; color: white;' : 'background: black; color: white;'}">${idx + 1}</span>
                <span style="font-weight: 900; font-size: 16px;">${analysis.subCategory}</span>
                ${idx < 3 ? '<span style="font-size: 10px; color: #FF5C00; font-weight: bold; margin-left: 8px;">← 우선 개선</span>' : ''}
              </div>
              <div style="text-align: right;">
                <div style="font-size: 20px; font-weight: 900;">${analysis.score}<span style="font-size: 12px;">/${analysis.maxScore}</span></div>
                <span style="font-size: 10px; padding: 2px 6px; font-weight: bold; ${analysis.percentage >= 70 ? 'background: #A3E635;' : analysis.percentage >= 50 ? 'background: #FFDE03;' : 'background: #FF5C00; color: white;'}">
                  ${analysis.level}
                </span>
              </div>
            </div>

            <div style="margin-bottom: 12px;">
              <h4 style="font-weight: bold; font-size: 12px; margin: 0 0 5px 0;">${analysis.detailedFeedback?.title || ''}</h4>
              <p style="font-size: 10px; line-height: 1.5; margin: 0; opacity: 0.8;">${analysis.detailedFeedback?.description || ''}</p>
            </div>

            <div style="background: #f5f5f5; padding: 10px; border: 2px solid black; margin-bottom: 10px;">
              <h5 style="font-weight: bold; font-size: 10px; margin: 0 0 5px 0;">현재 상태</h5>
              <p style="font-size: 10px; margin: 0; opacity: 0.8;">${analysis.detailedFeedback?.currentState || ''}</p>
            </div>

            <div style="margin-bottom: 10px;">
              <h5 style="font-weight: bold; font-size: 10px; margin: 0 0 5px 0;">실천 방법</h5>
              ${(analysis.detailedFeedback?.actionPlan || []).map(action => `
                <div style="font-size: 10px; display: flex; gap: 5px; margin-bottom: 3px;">
                  <span style="color: #A3E635; font-weight: bold;">+</span>
                  <span>${action}</span>
                </div>
              `).join('')}
            </div>

            <div style="background: #A3E635; padding: 10px; border: 2px solid black; margin-bottom: 10px;">
              <h5 style="font-weight: bold; font-size: 10px; margin: 0 0 5px 0;">이번 주 미션</h5>
              <p style="font-size: 10px; margin: 0;">${analysis.detailedFeedback?.weeklyMission || ''}</p>
            </div>

            <div style="margin-bottom: 8px;">
              <span style="font-size: 10px; font-weight: bold;">📚 추천 도서: </span>
              ${(analysis.detailedFeedback?.recommendedBooks || []).map(book => `
                <span style="font-size: 9px; background: white; padding: 2px 6px; border: 1px solid black; margin-right: 5px;">${book}</span>
              `).join('')}
            </div>

            <div style="margin-bottom: 10px;">
              <span style="font-size: 10px; font-weight: bold;">🎬 추천 영화: </span>
              ${(analysis.detailedFeedback?.recommendedMovies || []).map(movie => `
                <span style="font-size: 9px; background: #00D1FF; padding: 2px 6px; border: 1px solid black; margin-right: 5px;">${movie}</span>
              `).join('')}
            </div>

            <div style="background: black; color: white; padding: 8px; text-align: center;">
              <p style="font-size: 10px; font-style: italic; margin: 0;">"${analysis.detailedFeedback?.affirmation || ''}"</p>
            </div>
          </div>
        `).join('')}

        <!-- Growth Plan -->
        <div style="background: #00D1FF; border: 4px solid black; padding: 15px;">
          <h3 style="font-weight: 900; font-size: 16px; text-align: center; margin: 0 0 15px 0;">나만의 성장 로드맵</h3>

          <div style="background: white; padding: 12px; border: 2px solid black; margin-bottom: 10px;">
            <h4 style="font-weight: 900; font-size: 12px; margin: 0 0 8px 0;">즉시 실천 (이번 주)</h4>
            ${(result.personalGrowthPlan?.immediate || []).map((item, i) => `
              <div style="font-size: 10px; display: flex; gap: 5px; margin-bottom: 3px;">
                <span style="font-weight: bold;">${i + 1}.</span>
                <span>${item}</span>
              </div>
            `).join('')}
          </div>

          <div style="background: white; padding: 12px; border: 2px solid black; margin-bottom: 10px;">
            <h4 style="font-weight: 900; font-size: 12px; margin: 0 0 8px 0;">단기 목표 (1개월)</h4>
            ${(result.personalGrowthPlan?.shortTerm || []).map(item => `
              <div style="font-size: 10px; display: flex; gap: 5px; margin-bottom: 3px;">
                <span style="font-weight: bold;">+</span>
                <span>${item}</span>
              </div>
            `).join('')}
          </div>

          <div style="background: white; padding: 12px; border: 2px solid black;">
            <h4 style="font-weight: 900; font-size: 12px; margin: 0 0 8px 0;">장기 목표 (3개월+)</h4>
            ${(result.personalGrowthPlan?.longTerm || []).map(item => `
              <div style="font-size: 10px; display: flex; gap: 5px; margin-bottom: 3px;">
                <span style="font-weight: bold;">+</span>
                <span>${item}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Footer -->
        <div style="margin-top: 20px; padding: 15px; border: 2px dashed black; text-align: center; font-size: 9px; font-weight: bold; opacity: 0.4;">
          KRQ-53 심층 분석 엔진 | JJ Creative Resilience Solution | ${new Date().toLocaleDateString()}
        </div>
      </div>
    `;

    // Append to body for rendering
    document.body.appendChild(tempContainer);

    try {
      // Use html2canvas to render
      const canvas = await html2canvas(tempContainer, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#FFDE03'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = pdfHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();

      while (heightLeft >= 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
        heightLeft -= pdf.internal.pageSize.getHeight();
      }

      return pdf.output('blob');
    } finally {
      // Clean up
      document.body.removeChild(tempContainer);
    }
  };

  // Batch PDF download as ZIP
  const handleBatchPDFDownload = async () => {
    if (!roomParticipants.length || !selectedRoom) return;

    setLoading(true);
    try {
      const zip = new JSZip();
      const folder = zip.folder(`${selectedRoom.name}_결과`);

      for (let i = 0; i < roomParticipants.length; i++) {
        const participant = roomParticipants[i];
        const pdfBlob = await generateParticipantPDFBlob(participant);
        const fileName = `${participant.team || '미지정'}_${participant.name}_${participant.result.totalScore}점.pdf`;
        folder?.file(fileName, pdfBlob);
      }

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${selectedRoom.name}_전체결과_${new Date().toLocaleDateString()}.zip`;
      link.click();
      URL.revokeObjectURL(url);

      alert(`${roomParticipants.length}명의 결과가 ZIP 파일로 다운로드되었습니다.`);
    } catch (e) {
      console.error('Batch PDF download error:', e);
      alert('다운로드 중 오류가 발생했습니다.');
    }
    setLoading(false);
  };

  // CSV Export
  const handleExportCSV = async () => {
    if (!selectedRoom || !roomParticipants.length) return;

    const headers = ['이름', '팀', '총점', '페르소나', '자기조절', '대인관계', '긍정성', '완료일시'];
    const rows = roomParticipants.map(p => [
      p.name,
      p.team || '-',
      p.result.totalScore,
      p.result.persona,
      p.result.categoryScores[Category.SELF_REGULATION],
      p.result.categoryScores[Category.INTERPERSONAL],
      p.result.categoryScores[Category.POSITIVITY],
      new Date(p.completedAt).toLocaleString()
    ]);

    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedRoom.name}_결과_${new Date().toLocaleDateString()}.csv`;
    link.click();
  };

  // Group participants by team
  const getParticipantsByTeam = () => {
    const teamGroups: Record<string, Participant[]> = {};
    roomParticipants.forEach(p => {
      const team = p.team || '미지정';
      if (!teamGroups[team]) teamGroups[team] = [];
      teamGroups[team].push(p);
    });
    return teamGroups;
  };

  // Calculate team statistics
  const getTeamStats = () => {
    const teamGroups = getParticipantsByTeam();
    const teamStats: Record<string, { count: number; avgScore: number; participants: Participant[] }> = {};

    Object.entries(teamGroups).forEach(([team, participants]) => {
      const avgScore = participants.length > 0
        ? Math.round(participants.reduce((sum, p) => sum + p.result.totalScore, 0) / participants.length)
        : 0;
      teamStats[team] = {
        count: participants.length,
        avgScore,
        participants
      };
    });

    return teamStats;
  };

  // Calculate group average for subcategories (for visualization)
  const getGroupSubCategoryAverages = () => {
    if (roomParticipants.length === 0) return [];

    const subCategoryNames = Object.values(SubCategory);
    return subCategoryNames.map(sub => {
      const avgScore = roomParticipants.reduce((sum, p) => sum + (p.result.subCategoryScores[sub] || 0), 0) / roomParticipants.length;
      const maxScore = sub === SubCategory.LIFE_SATISFACTION ? 25 : 30;
      return {
        name: sub.replace('능력', '').replace('도', ''),
        score: Math.round(avgScore * 10) / 10,
        maxScore,
        percentage: Math.round((avgScore / maxScore) * 100)
      };
    });
  };

  // Calculate group average for categories (for visualization)
  const getGroupCategoryAverages = () => {
    if (roomParticipants.length === 0) return [];

    const koreanAverages: Record<Category, number> = {
      [Category.SELF_REGULATION]: 63.5,
      [Category.INTERPERSONAL]: 67.8,
      [Category.POSITIVITY]: 63.4,
    };

    return Object.values(Category).map(cat => {
      const avgScore = roomParticipants.reduce((sum, p) => sum + (p.result.categoryScores[cat] || 0), 0) / roomParticipants.length;
      return {
        name: cat,
        우리그룹: Math.round(avgScore * 10) / 10,
        한국평균: koreanAverages[cat]
      };
    });
  };

  // Generate individual PDF for a participant
  const handleIndividualPDF = async (participant: Participant) => {
    setSelectedParticipant(participant);
    await new Promise(resolve => setTimeout(resolve, 300));
    await generateAndDownloadPDF(participant);
  };

  // Render functions
  const renderLanding = () => (
    <div className="min-h-screen p-4 md:p-6 bg-gradient-to-br from-[#FFDE03] to-[#A3E635]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-brutal mb-4 leading-tight">
            RESILIENCE<br /><span className="bg-black text-[#A3E635] px-3 py-1">KRQ-53</span>
          </h1>
        </div>

        {/* Resilience Intro Card */}
        <Card className="mb-8 border-4">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-brutal mb-2">{RESILIENCE_INTRO.title}</h2>
            <p className="text-lg font-bold text-gray-700">{RESILIENCE_INTRO.subtitle}</p>
          </div>
          <p className="text-center mb-6 leading-relaxed">{RESILIENCE_INTRO.description}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {RESILIENCE_INTRO.benefits.map((benefit, i) => (
              <div key={i} className="bg-gray-50 p-3 brutal-border text-center">
                <div className="text-2xl mb-1">{benefit.icon}</div>
                <div className="text-xs font-bold">{benefit.text}</div>
              </div>
            ))}
          </div>

          <div className="bg-[#A3E635] p-3 brutal-border text-center">
            <p className="text-sm font-bold">{RESILIENCE_INTRO.howItWorks}</p>
            <p className="text-xs mt-1 opacity-70">{RESILIENCE_INTRO.duration}</p>
          </div>
        </Card>

        {/* Active Courses */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-brutal">진행 중인 과정</h2>
            <button
              onClick={() => setStep('admin-login')}
              className="text-sm font-bold underline opacity-70 hover:opacity-100"
            >
              과정 생성
            </button>
          </div>

          {activeRooms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeRooms.map(room => (
                <Card
                  key={room.id}
                  className="cursor-pointer hover:bg-[#A3E635] transition-colors border-4"
                  onClick={() => handleSelectCourse(room)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-brutal text-lg">{room.name}</h3>
                      <p className="text-sm opacity-70">{room.teamCount || 0}개 팀</p>
                    </div>
                    <div className="text-right">
                      <span className="bg-black text-white px-2 py-1 text-xs font-brutal">
                        {room.participantCount || 0}명 참여
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12 border-4">
              <p className="text-lg opacity-50 mb-4">현재 진행 중인 과정이 없습니다</p>
              <p className="text-sm opacity-40">관리자가 과정을 생성하면 여기에 표시됩니다</p>
            </Card>
          )}
        </div>

        <p className="text-xs uppercase font-bold text-center tracking-widest opacity-50 mt-8">
          JJ Creative - 회복탄력성 진단 솔루션
        </p>
      </div>
    </div>
  );

  const renderParticipantInfo = () => (
    <div className="min-h-screen flex flex-col p-6 items-center justify-center">
      <Card className="max-w-md w-full border-4">
        {currentRoom && (
          <div className="bg-[#00D1FF] brutal-border p-3 mb-4 text-center font-bold">
            {currentRoom.name}
          </div>
        )}
        <h2 className="text-2xl font-brutal mb-6 text-center">참가자 정보</h2>
        <div className="space-y-4">
          <div>
            <label className="block font-bold mb-2">팀 선택 *</label>
            <Select
              value={userTeam}
              onChange={setUserTeam}
              options={(currentRoom?.teams || []).map(t => ({ value: t, label: t }))}
              placeholder="팀을 선택하세요"
            />
          </div>
          <div>
            <label className="block font-bold mb-2">이름 *</label>
            <Input value={userName} onChange={setUserName} placeholder="이름을 입력하세요" />
          </div>
          {error && <p className="text-red-500 text-sm font-bold">{error}</p>}
          <Button onClick={handleStartTest} className="w-full bg-[#A3E635]">
            검사 시작하기
          </Button>
          <button
            onClick={() => { setStep('landing'); setCurrentRoom(null); }}
            className="w-full text-sm underline opacity-70"
          >
            돌아가기
          </button>
        </div>
      </Card>
    </div>
  );

  const renderTest = () => {
    const q = QUESTIONS[currentIdx];
    const progress = ((currentIdx + 1) / QUESTIONS.length) * 100;
    const currentAnswer = answers[q.id]; // 현재 질문에 대한 기존 답변

    return (
      <div className="min-h-screen p-6 flex flex-col max-w-lg mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-end mb-2">
            <div className="flex items-center gap-3">
              {currentIdx > 0 && (
                <button
                  onClick={handleGoBack}
                  className="text-sm font-bold px-3 py-1 bg-white brutal-border hover:bg-gray-100 active:scale-95"
                >
                  ← 이전
                </button>
              )}
              <span className="font-brutal text-2xl">Q {currentIdx + 1}</span>
            </div>
            <span className="font-bold">{currentIdx + 1} / {QUESTIONS.length}</span>
          </div>
          <div className="w-full h-4 bg-white brutal-border overflow-hidden">
            <div className="h-full bg-black transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
        <div className="flex-grow flex flex-col justify-center">
          <h2 className="text-xl md:text-2xl font-bold mb-10 leading-snug min-h-[4rem]">
            {q.text}
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {[
              { val: 5, text: "매우 그러하다" },
              { val: 4, text: "그러하다" },
              { val: 3, text: "보통이다" },
              { val: 2, text: "그렇지 않다" },
              { val: 1, text: "전혀 그렇지 않다" }
            ].map((opt) => {
              const isSelected = currentAnswer === opt.val;
              return (
                <Button
                  key={opt.val}
                  onClick={() => handleAnswerChange(opt.val)}
                  className={`text-left py-3 px-5 flex justify-between items-center active:scale-95 ${
                    isSelected
                      ? 'bg-[#A3E635] border-4 border-black'
                      : 'bg-white hover:bg-[#A3E635]'
                  }`}
                >
                  <span className="font-bold flex items-center gap-2">
                    {isSelected && <span className="text-lg">✓</span>}
                    {opt.text}
                  </span>
                  <span className="text-xs font-brutal opacity-30">{opt.val}</span>
                </Button>
              );
            })}
          </div>
          {currentAnswer && (
            <p className="text-xs text-center mt-4 opacity-60">
              이미 선택한 답변이 있습니다. 다른 답변을 선택하거나 같은 답변을 눌러 다음으로 이동하세요.
            </p>
          )}
        </div>
      </div>
    );
  };

  const renderResult = () => {
    const result = calculateResults;
    const personaRule = PERSONA_RULES.find(r => result.totalScore >= r.min);
    const categoryMapping = {
      [Category.SELF_REGULATION]: [SubCategory.EMOTION_CONTROL, SubCategory.IMPULSE_CONTROL, SubCategory.CAUSAL_ANALYSIS],
      [Category.INTERPERSONAL]: [SubCategory.COMMUNICATION, SubCategory.EMPATHY, SubCategory.EGO_EXPANSION],
      [Category.POSITIVITY]: [SubCategory.SELF_OPTIMISM, SubCategory.LIFE_SATISFACTION, SubCategory.GRATITUDE],
    };
    const categoryColor = {
      [Category.SELF_REGULATION]: "#FF5C00",
      [Category.INTERPERSONAL]: "#00D1FF",
      [Category.POSITIVITY]: "#A3E635",
    };

    // 한국인 평균 점수
    const koreanAverageScores = {
      [Category.SELF_REGULATION]: 63.5,
      [Category.INTERPERSONAL]: 67.8,
      [Category.POSITIVITY]: 63.4,
    };

    // 하위요인별 간단 설명
    const subCategoryDescriptions: Record<SubCategory, string> = {
      [SubCategory.EMOTION_CONTROL]: "스트레스 상황에서 감정을 조절하고 침착함을 유지하는 능력",
      [SubCategory.IMPULSE_CONTROL]: "충동적인 반응을 억제하고 인내심 있게 행동하는 능력",
      [SubCategory.CAUSAL_ANALYSIS]: "문제의 원인을 정확히 파악하고 분석하는 능력",
      [SubCategory.COMMUNICATION]: "자신의 생각과 감정을 효과적으로 전달하는 능력",
      [SubCategory.EMPATHY]: "타인의 감정과 입장을 이해하고 공감하는 능력",
      [SubCategory.EGO_EXPANSION]: "건강한 인간관계를 형성하고 유지하는 능력",
      [SubCategory.SELF_OPTIMISM]: "미래에 대해 긍정적으로 기대하고 자신을 믿는 능력",
      [SubCategory.LIFE_SATISFACTION]: "현재 삶에 대한 전반적인 만족감과 행복감",
      [SubCategory.GRATITUDE]: "일상 속 감사할 것들을 인식하고 표현하는 능력",
    };

    // 9가지 요인을 낮은 점수순으로 정렬
    const sortedSubCategoryAnalysis = [...result.subCategoryAnalysis].sort((a, b) => a.percentage - b.percentage);

    const radarData = result.subCategoryAnalysis.map(s => ({
      subject: s.subCategory.replace('능력', '').replace('도', '').replace('성', ''),
      A: s.score,
      fullMark: s.maxScore
    }));

    return (
      <div className="min-h-screen p-4 pb-40 max-w-4xl mx-auto">
        <div id="result-content" ref={resultRef} className="bg-[#FFDE03] p-4 md:p-6 border-4 border-black">
          {/* Header */}
          <h1 className="text-2xl md:text-3xl font-brutal mb-4 text-center uppercase border-b-4 border-black pb-2">
            회복탄력성 심층 분석 리포트
          </h1>
          <p className="text-center font-bold mb-4">
            {currentRoom?.name} | {userTeam} | {result.participantName}님 | {new Date().toLocaleDateString()}
          </p>

          {/* Persona & Total Score */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card className="text-center border-4" style={{ backgroundColor: personaRule?.color }}>
              <p className="text-xs font-bold uppercase mb-1">당신의 유형</p>
              <div className="text-4xl mb-2">{personaRule?.emoji}</div>
              <h2 className="text-2xl font-brutal mb-2">{result.persona}</h2>
              <p className="text-xs font-bold">{personaRule?.desc}</p>
            </Card>
            <Card className="text-center border-4">
              <p className="text-xs font-bold uppercase mb-1">총점</p>
              <div className="text-5xl font-brutal mb-2">{result.totalScore}</div>
              <div className="text-[9px] space-y-1 font-bold">
                <p className={result.totalScore >= 201 ? 'bg-black text-white px-1' : 'opacity-60'}>201점 이상: 슈퍼 고무공</p>
                <p className={result.totalScore >= 181 && result.totalScore <= 200 ? 'bg-black text-white px-1' : 'opacity-60'}>181-200점: 테니스공</p>
                <p className={result.totalScore <= 180 ? 'bg-black text-white px-1' : 'opacity-60'}>180점 이하: 마시멜로우</p>
              </div>
            </Card>
          </div>

          {/* Overall Interpretation */}
          <Card className="border-4 bg-white mb-6">
            <h3 className="font-brutal text-lg mb-3 border-b-2 border-black pb-1">종합 해석</h3>
            <p className="text-sm leading-relaxed font-medium">{result.overallInterpretation}</p>
          </Card>

          {/* Radar Chart */}
          <Card className="p-0 overflow-hidden border-4 mb-6">
            <div className="bg-black text-white p-3 font-brutal text-center uppercase text-xs">9가지 회복탄력성 요인 분석</div>
            <div className="h-72 w-full bg-white">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="#ddd" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: 'black', fontWeight: '700', fontSize: 9 }} />
                  <Radar name="점수" dataKey="A" stroke="#000" fill="#A3E635" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Strengths & Improvements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card className="border-4 bg-[#A3E635]">
              <h3 className="font-brutal text-sm mb-3">나의 강점 TOP 3</h3>
              <div className="space-y-3">
                {result.strengthAreas.map((area, i) => (
                  <div key={area} className="bg-white bg-opacity-50 p-2 rounded">
                    <div className="font-bold text-sm">{i + 1}. {area}</div>
                    <p className="text-xs opacity-80 mt-1">{subCategoryDescriptions[area as SubCategory]}</p>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="border-4 bg-[#FF5C00] text-white">
              <h3 className="font-brutal text-sm mb-3">성장 필요 영역 TOP 3</h3>
              <div className="space-y-3">
                {result.improvementAreas.map((area, i) => (
                  <div key={area} className="bg-white bg-opacity-20 p-2 rounded">
                    <div className="font-bold text-sm">{i + 1}. {area}</div>
                    <p className="text-xs opacity-90 mt-1">{subCategoryDescriptions[area as SubCategory]}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Category Scores */}
          <Card className="border-4 bg-white mb-6">
            <h3 className="font-brutal text-sm mb-4 border-b-2 border-black pb-1 uppercase">영역별 상세 점수</h3>
            <div className="space-y-6">
              {(Object.keys(categoryMapping) as Category[]).map(cat => (
                <div key={cat} className="space-y-2">
                  <div className="flex justify-between items-center border-b border-black pb-1">
                    <div>
                      <h4 className="font-brutal text-sm" style={{ color: categoryColor[cat] }}>{cat}</h4>
                      <span className="text-[10px] opacity-60">한국인 평균 {koreanAverageScores[cat]}점</span>
                    </div>
                    <div className="text-right">
                      <span className="font-brutal text-lg">{result.categoryScores[cat]}점</span>
                      <div className="text-[10px]">
                        {result.categoryScores[cat] >= koreanAverageScores[cat]
                          ? <span className="text-[#A3E635] font-bold">▲ 평균 이상</span>
                          : <span className="text-[#FF5C00] font-bold">▼ 평균 이하</span>
                        }
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-2 pl-2">
                    {categoryMapping[cat].map(sub => {
                      const analysis = result.subCategoryAnalysis.find(s => s.subCategory === sub)!;
                      return (
                        <div key={sub} className="flex justify-between items-center text-xs">
                          <span className="font-bold">{sub}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] px-1 bg-gray-100">{analysis.level}</span>
                            <div className="w-16 h-2 bg-gray-200 brutal-border border-[1px]">
                              <div className="h-full" style={{ backgroundColor: categoryColor[cat], width: `${analysis.percentage}%` }}></div>
                            </div>
                            <span className="font-brutal w-8 text-right">{analysis.score}/{analysis.maxScore}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Detailed Feedback */}
          <h3 className="font-brutal text-lg mb-4 uppercase bg-black text-white p-2 text-center">9가지 요인 맞춤 분석 및 성장 가이드</h3>
          <p className="text-xs text-center mb-4 opacity-70">※ 낮은 점수 순으로 표시됩니다. 우선 개선이 필요한 영역부터 확인하세요.</p>

          {sortedSubCategoryAnalysis.map((analysis, idx) => (
            <Card key={analysis.subCategory} className="border-4 mb-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className={`text-xs font-bold px-2 py-1 mr-2 ${idx < 3 ? 'bg-[#FF5C00] text-white' : 'bg-black text-white'}`}>{idx + 1}</span>
                  <span className="font-brutal text-lg">{analysis.subCategory}</span>
                  {idx < 3 && <span className="text-xs ml-2 text-[#FF5C00] font-bold">← 우선 개선</span>}
                </div>
                <div className="text-right">
                  <div className="text-2xl font-brutal">{analysis.score}<span className="text-sm">/{analysis.maxScore}</span></div>
                  <span className={`text-xs px-2 py-1 font-bold ${analysis.percentage >= 70 ? 'bg-[#A3E635]' : analysis.percentage >= 50 ? 'bg-[#FFDE03]' : 'bg-[#FF5C00] text-white'}`}>
                    {analysis.level}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-bold text-sm mb-1">{analysis.detailedFeedback.title}</h4>
                <p className="text-xs leading-relaxed opacity-80">{analysis.detailedFeedback.description}</p>
              </div>

              <div className="bg-gray-50 p-3 mb-3 brutal-border border-2">
                <h5 className="font-bold text-xs mb-1">현재 상태</h5>
                <p className="text-xs opacity-80">{analysis.detailedFeedback.currentState}</p>
              </div>

              <div className="mb-3">
                <h5 className="font-bold text-xs mb-2">실천 방법</h5>
                <ul className="text-xs space-y-1">
                  {analysis.detailedFeedback.actionPlan.map((action, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#A3E635] font-bold">+</span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#A3E635] p-3 brutal-border border-2 mb-3">
                <h5 className="font-bold text-xs mb-1">이번 주 미션</h5>
                <p className="text-xs">{analysis.detailedFeedback.weeklyMission}</p>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-xs font-bold">📚 추천 도서:</span>
                {analysis.detailedFeedback.recommendedBooks.map((book, i) => (
                  <span key={i} className="text-xs bg-white px-2 py-1 brutal-border border-1">{book}</span>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-xs font-bold">🎬 추천 영화:</span>
                {analysis.detailedFeedback.recommendedMovies?.map((movie, i) => (
                  <span key={i} className="text-xs bg-[#00D1FF] px-2 py-1 brutal-border border-1">{movie}</span>
                ))}
              </div>

              <div className="bg-black text-white p-2 text-center">
                <p className="text-xs italic">"{analysis.detailedFeedback.affirmation}"</p>
              </div>
            </Card>
          ))}

          {/* Growth Plan */}
          <Card className="border-4 bg-[#00D1FF]">
            <h3 className="font-brutal text-lg mb-4 text-center">나만의 성장 로드맵</h3>
            <div className="space-y-4">
              <div className="bg-white p-3 brutal-border">
                <h4 className="font-brutal text-sm mb-2">즉시 실천 (이번 주)</h4>
                <ul className="text-xs space-y-1">
                  {result.personalGrowthPlan.immediate.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="font-bold">{i + 1}.</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-3 brutal-border">
                <h4 className="font-brutal text-sm mb-2">단기 목표 (1개월)</h4>
                <ul className="text-xs space-y-1">
                  {result.personalGrowthPlan.shortTerm.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="font-bold">+</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-3 brutal-border">
                <h4 className="font-brutal text-sm mb-2">장기 목표 (3개월+)</h4>
                <ul className="text-xs space-y-1">
                  {result.personalGrowthPlan.longTerm.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="font-bold">+</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>

          <div className="mt-6 p-4 border-2 border-dashed border-black text-[10px] font-bold text-center opacity-40">
            KRQ-53 심층 분석 엔진 | JJ Creative Resilience Solution | {new Date().toLocaleDateString()}
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#FFDE03] border-t-4 border-black z-50">
          <div className="flex flex-col gap-2 w-full max-w-4xl mx-auto">
            {autoSaved && (
              <div className="text-center text-xs font-bold text-green-700 bg-green-100 p-2 brutal-border">
                ✓ 결과가 자동으로 저장되었습니다 (관리자 대시보드에서 확인 가능)
              </div>
            )}
            <div className="flex gap-2">
              <Button onClick={handleSaveResult} disabled={loading} className="flex-1 bg-white flex flex-col items-center py-2">
                <span className="text-lg">{loading ? '저장 중...' : 'PDF 다운로드'}</span>
              </Button>
              <Button onClick={() => window.location.reload()} variant="danger" className="flex-none px-4">
                처음으로
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAdminLogin = () => (
    <div className="min-h-screen flex flex-col p-6 items-center justify-center">
      <Card className="max-w-md w-full border-4">
        <h2 className="text-2xl font-brutal mb-6 text-center">관리자 접근</h2>
        <div className="space-y-4">
          <div>
            <label className="block font-bold mb-2">비밀번호</label>
            <Input
              value={adminPassword}
              onChange={setAdminPassword}
              type="password"
              placeholder="비밀번호 입력"
            />
          </div>
          {error && <p className="text-red-500 text-sm font-bold">{error}</p>}
          <Button onClick={handleAdminLogin} className="w-full bg-[#A3E635]">
            접속
          </Button>
          <button
            onClick={() => { setStep('landing'); setError(''); setAdminPassword(''); }}
            className="w-full text-sm underline opacity-70"
          >
            돌아가기
          </button>
        </div>
      </Card>
    </div>
  );

  const renderAdminDashboard = () => {
    const teamGroups = getParticipantsByTeam();
    const teamStats = getTeamStats();
    const filteredParticipants = selectedTeamFilter
      ? roomParticipants.filter(p => (p.team || '미지정') === selectedTeamFilter)
      : roomParticipants;

    return (
      <div className="min-h-screen p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-brutal">관리자 대시보드</h1>
              <span className="text-xs bg-[#A3E635] px-2 py-1 brutal-border animate-pulse">
                실시간 업데이트 중
              </span>
            </div>
            <button
              onClick={() => { setIsAdmin(false); setStep('landing'); }}
              className="text-sm underline text-red-500"
            >
              나가기
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Room List */}
            <div className="lg:col-span-1">
              <Card className="border-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-brutal">과정 목록</h2>
                  <Button onClick={() => setShowCreateRoom(!showCreateRoom)} variant="success" className="text-sm py-1 px-3">
                    + 새 과정
                  </Button>
                </div>

                {showCreateRoom && (
                  <div className="mb-4 p-3 bg-gray-50 brutal-border">
                    <Input
                      value={newRoomName}
                      onChange={setNewRoomName}
                      placeholder="과정명"
                      className="mb-2"
                    />
                    <div className="mb-2">
                      <label className="block text-xs font-bold mb-1">팀 갯수</label>
                      <Select
                        value={newRoomTeamCount}
                        onChange={setNewRoomTeamCount}
                        options={[
                          { value: '2', label: '2개 팀' },
                          { value: '3', label: '3개 팀' },
                          { value: '4', label: '4개 팀' },
                          { value: '5', label: '5개 팀' },
                          { value: '6', label: '6개 팀' },
                          { value: '7', label: '7개 팀' },
                          { value: '8', label: '8개 팀' },
                          { value: '9', label: '9개 팀' },
                          { value: '10', label: '10개 팀' },
                        ]}
                      />
                    </div>
                    {error && <p className="text-red-500 text-xs font-bold mb-2">{error}</p>}
                    <div className="flex gap-2">
                      <Button onClick={handleCreateRoom} disabled={loading} className="flex-1 text-sm py-1">
                        {loading ? '생성 중...' : '생성'}
                      </Button>
                      <Button onClick={() => { setShowCreateRoom(false); setError(''); }} variant="danger" className="text-sm py-1">
                        취소
                      </Button>
                    </div>
                  </div>
                )}

                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {activeRooms.map(room => (
                    <div
                      key={room.id}
                      className={`p-3 brutal-border cursor-pointer transition-colors ${selectedRoom?.id === room.id ? 'bg-[#A3E635]' : 'bg-white hover:bg-gray-50'}`}
                    >
                      <div className="flex justify-between items-start" onClick={() => handleSelectRoom(room)}>
                        <div>
                          <h3 className="font-bold">{room.name}</h3>
                          <p className="text-xs opacity-70">{room.teamCount || 0}개 팀</p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-brutal bg-black text-white px-2">{room.accessCode}</span>
                          <p className="text-xs mt-1">{room.participantCount || 0}명</p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDeleteRoom(room.id); }}
                        className="text-xs text-red-500 underline mt-2"
                      >
                        삭제
                      </button>
                    </div>
                  ))}
                  {activeRooms.length === 0 && (
                    <p className="text-center text-sm opacity-50">아직 생성된 과정이 없습니다.</p>
                  )}
                </div>
              </Card>
            </div>

            {/* Stats & Results */}
            <div className="lg:col-span-2">
              {selectedRoom ? (
                <>
                  {/* Room Info */}
                  <Card className="mb-4 border-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="font-brutal text-xl">{selectedRoom.name}</h2>
                        <p className="text-sm opacity-70">{selectedRoom.teamCount || 0}개 팀</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-brutal bg-[#FFDE03] px-3 py-1 brutal-border">{selectedRoom.accessCode}</div>
                        <p className="text-xs mt-1">접속 코드</p>
                      </div>
                    </div>
                  </Card>

                  {/* Stats */}
                  {roomStats && roomStats.totalParticipants > 0 && (
                    <Card className="mb-4 border-4">
                      <h3 className="font-brutal mb-4">종합 통계</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="text-center p-3 bg-gray-50 brutal-border">
                          <div className="text-3xl font-brutal">{roomStats.totalParticipants}</div>
                          <div className="text-xs">참여자</div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 brutal-border">
                          <div className="text-3xl font-brutal">{roomStats.averageTotalScore}</div>
                          <div className="text-xs">평균 점수</div>
                        </div>
                        <div className="text-center p-3 bg-[#A3E635] brutal-border">
                          <div className="text-3xl font-brutal">{roomStats.scoreDistribution.high}</div>
                          <div className="text-xs">슈퍼 고무공</div>
                        </div>
                        <div className="text-center p-3 bg-[#FF5C00] text-white brutal-border">
                          <div className="text-3xl font-brutal">{roomStats.scoreDistribution.low}</div>
                          <div className="text-xs">마시멜로우</div>
                        </div>
                      </div>

                      <div className="flex gap-2 flex-wrap">
                        <Button onClick={handleExportCSV} variant="secondary" className="text-sm py-2">
                          CSV 다운로드
                        </Button>
                        <Button onClick={handleBatchPDFDownload} variant="primary" className="text-sm py-2">
                          전체 PDF 일괄 다운로드
                        </Button>
                      </div>
                    </Card>
                  )}

                  {/* Visualization Charts */}
                  {roomStats && roomStats.totalParticipants > 0 && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                      {/* Group Radar Chart - 9 Subcategories */}
                      <Card className="border-4">
                        <h3 className="font-brutal mb-2 text-sm">그룹 전체 9가지 요인 분석</h3>
                        <p className="text-xs opacity-60 mb-3">낮은 영역이 우선 개선 필요 영역입니다</p>
                        <div className="h-64 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={getGroupSubCategoryAverages()}>
                              <PolarGrid stroke="#ddd" />
                              <PolarAngleAxis dataKey="name" tick={{ fill: 'black', fontWeight: '700', fontSize: 9 }} />
                              <Radar name="그룹평균" dataKey="score" stroke="#000" fill="#A3E635" fillOpacity={0.6} />
                            </RadarChart>
                          </ResponsiveContainer>
                        </div>
                        {/* Lowest 3 areas */}
                        <div className="mt-3 p-2 bg-[#FF5C00] text-white brutal-border">
                          <div className="text-xs font-bold mb-1">⚠️ 우선 개선 필요 영역</div>
                          <div className="text-xs">
                            {getGroupSubCategoryAverages()
                              .sort((a, b) => a.percentage - b.percentage)
                              .slice(0, 3)
                              .map((item, i) => `${i + 1}. ${item.name} (${item.percentage}%)`)
                              .join(' / ')}
                          </div>
                        </div>
                      </Card>

                      {/* Category Comparison Bar Chart */}
                      <Card className="border-4">
                        <h3 className="font-brutal mb-2 text-sm">한국인 평균 대비 우리 그룹</h3>
                        <p className="text-xs opacity-60 mb-3">3개 영역별 평균 점수 비교</p>
                        <div className="h-64 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={getGroupCategoryAverages()} layout="vertical" margin={{ left: 20, right: 20 }}>
                              <XAxis type="number" domain={[0, 90]} tick={{ fontSize: 10 }} />
                              <YAxis type="category" dataKey="name" tick={{ fontSize: 9, fontWeight: 'bold' }} width={80} />
                              <Tooltip />
                              <Legend wrapperStyle={{ fontSize: '10px' }} />
                              <Bar dataKey="우리그룹" fill="#A3E635" />
                              <Bar dataKey="한국평균" fill="#999" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                        {/* Summary */}
                        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                          {getGroupCategoryAverages().map(cat => (
                            <div key={cat.name} className={`p-2 brutal-border text-xs ${cat.우리그룹 >= cat.한국평균 ? 'bg-[#A3E635]' : 'bg-[#FF5C00] text-white'}`}>
                              <div className="font-bold">{cat.name.split('능력')[0]}</div>
                              <div>{cat.우리그룹 >= cat.한국평균 ? '▲ 평균 이상' : '▼ 평균 이하'}</div>
                            </div>
                          ))}
                        </div>
                      </Card>
                    </div>
                  )}

                  {/* Team Statistics */}
                  {Object.keys(teamStats).length > 0 && (
                    <Card className="mb-4 border-4 bg-[#00D1FF]">
                      <h3 className="font-brutal mb-4">팀별 통계</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {Object.entries(teamStats).sort((a, b) => a[0].localeCompare(b[0])).map(([team, stats]) => (
                          <div key={team} className="bg-white p-3 brutal-border text-center">
                            <div className="font-brutal text-sm mb-1">{team}</div>
                            <div className="text-2xl font-brutal">{stats.avgScore}</div>
                            <div className="text-xs opacity-70">{stats.count}명 참여</div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}

                  {/* View Mode Toggle */}
                  <Card className="border-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-brutal">참가자 결과 ({roomParticipants.length}명)</h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() => { setViewMode('all'); setSelectedTeamFilter(''); }}
                          className={`text-xs px-3 py-1 brutal-border ${viewMode === 'all' ? 'bg-black text-white' : 'bg-white'}`}
                        >
                          전체보기
                        </button>
                        <button
                          onClick={() => setViewMode('team')}
                          className={`text-xs px-3 py-1 brutal-border ${viewMode === 'team' ? 'bg-black text-white' : 'bg-white'}`}
                        >
                          팀별보기
                        </button>
                      </div>
                    </div>

                    {/* Team Filter */}
                    {viewMode === 'team' && (
                      <div className="flex gap-2 flex-wrap mb-4">
                        {Object.keys(teamGroups).map(team => (
                          <button
                            key={team}
                            onClick={() => setSelectedTeamFilter(selectedTeamFilter === team ? '' : team)}
                            className={`text-xs px-3 py-1 brutal-border ${selectedTeamFilter === team ? 'bg-[#A3E635]' : 'bg-white'}`}
                          >
                            {team} ({teamGroups[team].length}명)
                          </button>
                        ))}
                      </div>
                    )}

                    {selectedParticipant ? (
                      <div>
                        <button onClick={() => setSelectedParticipant(null)} className="text-sm underline mb-4">
                          ← 목록으로 돌아가기
                        </button>
                        <div className="bg-gray-50 p-4 brutal-border">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="font-brutal text-lg">{selectedParticipant.name}</h4>
                              <p className="text-sm opacity-70">{selectedParticipant.team || '미지정'}</p>
                            </div>
                            <Button onClick={() => handleIndividualPDF(selectedParticipant)} variant="success" className="text-xs py-1 px-3">
                              PDF 저장
                            </Button>
                          </div>

                          {/* Individual Score Overview */}
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="bg-white p-3 brutal-border text-center">
                              <span className="text-xs opacity-70">총점</span>
                              <div className="text-3xl font-brutal">{selectedParticipant.result.totalScore}</div>
                              <div className="text-xs mt-1">
                                {roomStats && (
                                  selectedParticipant.result.totalScore >= roomStats.averageTotalScore
                                    ? <span className="text-[#A3E635] font-bold">▲ 그룹평균({roomStats.averageTotalScore}) 이상</span>
                                    : <span className="text-[#FF5C00] font-bold">▼ 그룹평균({roomStats.averageTotalScore}) 이하</span>
                                )}
                              </div>
                            </div>
                            <div className="bg-white p-3 brutal-border text-center">
                              <span className="text-xs opacity-70">유형</span>
                              <div className="text-xl font-bold text-[#FF5C00]">{selectedParticipant.result.persona}</div>
                            </div>
                          </div>

                          {/* Individual vs Group Comparison Chart */}
                          <div className="bg-white p-3 brutal-border mb-4">
                            <h5 className="font-brutal text-xs mb-2">개인 vs 그룹 평균 비교</h5>
                            <div className="h-48 w-full">
                              <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                  data={Object.values(Category).map(cat => {
                                    const groupAvg = roomParticipants.length > 0
                                      ? Math.round(roomParticipants.reduce((sum, p) => sum + (p.result.categoryScores[cat] || 0), 0) / roomParticipants.length * 10) / 10
                                      : 0;
                                    return {
                                      name: cat.replace('능력', ''),
                                      개인: selectedParticipant.result.categoryScores[cat],
                                      그룹평균: groupAvg
                                    };
                                  })}
                                  layout="vertical"
                                  margin={{ left: 10, right: 10 }}
                                >
                                  <XAxis type="number" domain={[0, 90]} tick={{ fontSize: 10 }} />
                                  <YAxis type="category" dataKey="name" tick={{ fontSize: 9, fontWeight: 'bold' }} width={70} />
                                  <Tooltip />
                                  <Legend wrapperStyle={{ fontSize: '10px' }} />
                                  <Bar dataKey="개인" fill="#00D1FF" />
                                  <Bar dataKey="그룹평균" fill="#ddd" />
                                </BarChart>
                              </ResponsiveContainer>
                            </div>
                          </div>

                          {/* Category Scores */}
                          <div className="space-y-2 bg-white p-3 brutal-border mb-4">
                            {Object.values(Category).map(cat => {
                              const groupAvg = roomParticipants.length > 0
                                ? Math.round(roomParticipants.reduce((sum, p) => sum + (p.result.categoryScores[cat] || 0), 0) / roomParticipants.length * 10) / 10
                                : 0;
                              const diff = selectedParticipant.result.categoryScores[cat] - groupAvg;
                              return (
                                <div key={cat} className="flex justify-between items-center text-sm">
                                  <span>{cat}</span>
                                  <div className="flex items-center gap-2">
                                    <span className="font-bold">{selectedParticipant.result.categoryScores[cat]}점</span>
                                    <span className={`text-xs px-1 ${diff >= 0 ? 'bg-[#A3E635]' : 'bg-[#FF5C00] text-white'}`}>
                                      {diff >= 0 ? `+${diff.toFixed(1)}` : diff.toFixed(1)}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          {/* Improvement Areas */}
                          <div className="bg-[#FF5C00] text-white p-3 brutal-border">
                            <h5 className="font-brutal text-xs mb-2">이 참가자의 개선 필요 영역</h5>
                            <div className="text-xs space-y-1">
                              {selectedParticipant.result.improvementAreas?.slice(0, 3).map((area, i) => (
                                <div key={area}>{i + 1}. {area}</div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2 max-h-[500px] overflow-y-auto">
                        {filteredParticipants.map(p => (
                          <div
                            key={p.id}
                            className="p-3 bg-white brutal-border hover:bg-gray-50"
                          >
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2 cursor-pointer flex-1" onClick={() => setSelectedParticipant(p)}>
                                <span className="font-bold">{p.name}</span>
                                <span className="text-xs px-2 py-0.5 bg-gray-100 brutal-border border-[1px]">{p.team || '미지정'}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className={`text-xs px-2 py-1 font-bold ${p.result.totalScore >= 201 ? 'bg-[#A3E635]' : p.result.totalScore >= 181 ? 'bg-[#FFDE03]' : 'bg-[#FF5C00] text-white'}`}>
                                  {p.result.totalScore}점
                                </span>
                                <span className="text-[10px] opacity-50 hidden md:inline">
                                  {new Date(p.completedAt).toLocaleTimeString()}
                                </span>
                                <button
                                  onClick={(e) => { e.stopPropagation(); handleIndividualPDF(p); }}
                                  className="text-xs px-2 py-1 bg-white brutal-border hover:bg-[#A3E635]"
                                >
                                  PDF
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                        {filteredParticipants.length === 0 && (
                          <div className="text-center py-12">
                            <p className="text-lg opacity-50 mb-2">아직 참여자가 없습니다</p>
                            <p className="text-xs opacity-40">참가자가 검사를 완료하면 여기에 표시됩니다</p>
                          </div>
                        )}
                      </div>
                    )}
                  </Card>
                </>
              ) : (
                <Card className="text-center py-12 border-4">
                  <p className="text-lg opacity-50">왼쪽에서 과정을 선택하세요</p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Main render
  switch (step) {
    case 'landing': return renderLanding();
    case 'participant-info': return renderParticipantInfo();
    case 'test': return renderTest();
    case 'result': return renderResult();
    case 'admin-login': return renderAdminLogin();
    case 'admin-dashboard': return renderAdminDashboard();
    default: return renderLanding();
  }
};

export default App;
