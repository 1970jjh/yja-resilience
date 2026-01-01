
import React, { useState, useMemo, useEffect } from 'react';
import { QUESTIONS, PERSONA_RULES, DETAILED_FEEDBACK_DATA, OVERALL_INTERPRETATIONS } from './constants';
import { Category, SubCategory, EnhancedAssessmentResult, SubCategoryAnalysis, Room, Participant, RoomStats } from './types';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import {
  initializeFirebase,
  loginAdmin,
  logoutAdmin,
  onAuthChange,
  createRoom,
  getRoom,
  getRoomByAccessCode,
  getRoomsByAdmin,
  updateRoom,
  saveParticipantResult,
  getParticipantsByRoom,
  calculateRoomStats,
  generateAccessCode
} from './firebase';
import type { User } from 'firebase/auth';

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

const Card: React.FC<{ children: React.ReactNode; className?: string; id?: string }> = ({ children, className = '', id }) => (
  <div id={id} className={`bg-white brutal-border brutal-shadow p-6 mb-6 ${className}`}>
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

// --- Main App ---

type AppStep = 'landing' | 'join-room' | 'intro' | 'user-info' | 'test' | 'result' | 'admin-login' | 'admin-dashboard';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>('landing');
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentIdx, setCurrentIdx] = useState(0);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [roomCode, setRoomCode] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [adminUser, setAdminUser] = useState<User | null>(null);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminRooms, setAdminRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [roomParticipants, setRoomParticipants] = useState<Participant[]>([]);
  const [roomStats, setRoomStats] = useState<RoomStats | null>(null);
  const [newRoomName, setNewRoomName] = useState('');
  const [newRoomDesc, setNewRoomDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const [savedResult, setSavedResult] = useState<EnhancedAssessmentResult | null>(null);

  useEffect(() => {
    try {
      initializeFirebase();
      const unsubscribe = onAuthChange((user) => {
        setAdminUser(user);
        if (user) {
          loadAdminRooms(user.uid);
        }
      });
      return () => unsubscribe();
    } catch (e) {
      console.log('Firebase not configured yet');
    }
  }, []);

  const loadAdminRooms = async (uid: string) => {
    try {
      const rooms = await getRoomsByAdmin(uid);
      setAdminRooms(rooms);
    } catch (e) {
      console.error('Failed to load rooms:', e);
    }
  };

  const handleJoinRoom = async () => {
    if (!roomCode.trim()) {
      setError('접속 코드를 입력해주세요.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const room = await getRoomByAccessCode(roomCode.toUpperCase());
      if (room) {
        setCurrentRoom(room);
        setStep('intro');
      } else {
        setError('유효하지 않은 접속 코드입니다.');
      }
    } catch (e) {
      setError('오류가 발생했습니다. 다시 시도해주세요.');
    }
    setLoading(false);
  };

  const handleStartTest = () => {
    setStep('user-info');
  };

  const handleUserInfoSubmit = () => {
    if (!userName.trim()) {
      setError('이름을 입력해주세요.');
      return;
    }
    setError('');
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
      if (q.isReverse) {
        val = 6 - val;
      }
      catScores[q.category] += val;
      subScores[q.subCategory] += val;
      totalRaw += val;
    });

    const personaRule = PERSONA_RULES.find(r => totalRaw >= r.min);
    const persona = personaRule?.name || "집중 관리";

    // 하위 요인별 상세 분석 생성
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

    // 강점/약점 영역 식별
    const sortedSubs = [...subCategoryAnalysis].sort((a, b) => b.percentage - a.percentage);
    const strengthAreas = sortedSubs.slice(0, 3).map(s => s.subCategory);
    const improvementAreas = sortedSubs.slice(-3).reverse().map(s => s.subCategory);

    // 전체 해석
    let overallLevel: 'high' | 'medium' | 'low' = 'medium';
    if (totalRaw >= 200) overallLevel = 'high';
    else if (totalRaw < 180) overallLevel = 'low';

    // 개인 성장 계획
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

    // 기존 피드백 생성
    const generateAnalysis = () => {
      const sr = catScores[Category.SELF_REGULATION];
      const is = catScores[Category.INTERPERSONAL];
      const po = catScores[Category.POSITIVITY];

      let strengths = "";
      const improvements: { title: string; content: string; mission: string; }[] = [];

      if (sr >= 70) strengths += `[자기조절능력] 당신은 감정 조절이 우수합니다. 특히 ${subScores[SubCategory.EMOTION_CONTROL] >= 25 ? '정서적 통제력' : '문제 분석력'}이 뛰어나 위기에서도 흔들리지 않습니다. `;
      if (is >= 74) strengths += `[대인관계] 타인의 감정을 읽는 공감능력과 명확한 소통능력이 조화로워 주변의 신뢰를 한몸에 받습니다. `;
      if (po >= 70) strengths += `[긍정성] 삶에 대한 낙관과 감사하는 태도는 당신이 역경을 도약의 기회로 바꾸는 핵심 동력입니다. `;

      if (!strengths) strengths = "마음 근력을 본격적으로 단련해야 하는 시기입니다. 본인의 잠재력을 믿고 아래 가이드를 하나씩 실천해보세요.";

      if (sr < 70) {
        improvements.push({
          title: "자기조절능력 솔루션",
          content: `자기조절 점수(${sr}점)는 평균 근처입니다. ${subScores[SubCategory.IMPULSE_CONTROL] < 20 ? '충동 억제력' : '사건의 원인을 객관적으로 규명하는 힘'}을 키우는 훈련이 필요합니다.`,
          mission: "감정 일기를 쓰세요. 불쾌한 상황에서 '지금 내 감정은 무엇인가?'라고 3번 묻고 상황을 객관화하는 ABCDE 훈련을 추천합니다."
        });
      }
      if (is < 74) {
        improvements.push({
          title: "대인관계능력 솔루션",
          content: `대인관계 점수(${is}점) 보완을 위해 ${subScores[SubCategory.COMMUNICATION] < 20 ? '자신의 의사를 유연하게 전달하는 법' : '상대방의 감정에 깊이 공감하는 법'}에 집중해보세요.`,
          mission: "'나 전달법'을 사용해보세요. 하루 1번, 상대의 말을 그대로 요약해서 되묻는 '백트래킹' 기법 연습을 추천합니다."
        });
      }
      if (po < 70) {
        improvements.push({
          title: "긍정성 솔루션",
          content: `긍정성 점수(${po}점)를 높이려면 ${subScores[SubCategory.GRATITUDE] < 20 ? '일상의 소중함 발견' : '자신에 대한 긍정적 확신'}이 필요합니다.`,
          mission: "매일 밤 '세 가지 감사 일기'를 적으세요. 뇌의 긍정 회로를 재설계하여 스트레스에 강한 마음을 만들어줍니다."
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
      participantEmail: userEmail,
      completedAt: new Date().toISOString(),
      roomId: currentRoom?.id || 'direct',
      subCategoryAnalysis,
      overallInterpretation: OVERALL_INTERPRETATIONS[overallLevel],
      personalGrowthPlan,
      strengthAreas,
      improvementAreas
    };
  }, [answers, userName, userEmail, currentRoom]);

  const handleSaveResult = async () => {
    setLoading(true);
    try {
      if (currentRoom) {
        await saveParticipantResult(currentRoom.id, {
          roomId: currentRoom.id,
          name: userName,
          email: userEmail,
          completedAt: new Date().toISOString(),
          result: calculateResults
        });
      }
      setSavedResult(calculateResults);

      // PDF 생성
      const element = document.getElementById('result-content');
      if (element) {
        const canvas = await html2canvas(element, { scale: 2 });
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

        pdf.save(`KRQ_회복탄력성_${userName}_${new Date().toLocaleDateString()}.pdf`);
      }

      window.open("https://drive.google.com/drive/folders/1SEGYJuN-s2mMcjTRGTWiZ2kAtTWqFEhS?usp=sharing", "_blank");
      alert("결과가 저장되었습니다! 드라이브 폴더에 PDF를 업로드해주세요.");
    } catch (e) {
      console.error('Save error:', e);
      alert('저장 중 오류가 발생했습니다.');
    }
    setLoading(false);
  };

  // Admin functions
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await loginAdmin(adminEmail, adminPassword);
      setStep('admin-dashboard');
    } catch (e: any) {
      setError('로그인 실패: ' + e.message);
    }
    setLoading(false);
  };

  const handleCreateRoom = async () => {
    if (!newRoomName.trim()) {
      setError('방 이름을 입력해주세요.');
      return;
    }
    setLoading(true);
    try {
      const accessCode = generateAccessCode();
      await createRoom({
        name: newRoomName,
        description: newRoomDesc,
        createdBy: adminUser!.uid,
        accessCode,
        isActive: true
      });
      await loadAdminRooms(adminUser!.uid);
      setNewRoomName('');
      setNewRoomDesc('');
      setShowCreateRoom(false);
      setError('');
    } catch (e) {
      setError('방 생성 실패');
    }
    setLoading(false);
  };

  const handleSelectRoom = async (room: Room) => {
    setSelectedRoom(room);
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

  const handleExportRoomData = async () => {
    if (!selectedRoom || !roomParticipants.length) return;

    // CSV 생성
    const headers = ['이름', '이메일', '총점', '페르소나', '자기조절', '대인관계', '긍정성', '완료일시'];
    const rows = roomParticipants.map(p => [
      p.name,
      p.email || '',
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

  // Render functions
  const renderLanding = () => (
    <div className="min-h-screen flex flex-col p-6 items-center justify-center text-center bg-gradient-to-br from-[#FFDE03] to-[#A3E635]">
      <h1 className="text-4xl md:text-6xl font-brutal mb-8 leading-tight">
        RESILIENCE<br /><span className="bg-black text-[#A3E635] px-2">KRQ-53</span>
      </h1>
      <Card className="max-w-md w-full">
        <p className="text-lg mb-8 font-bold">회복탄력성 진단 검사</p>
        <div className="space-y-4">
          <Button onClick={() => setStep('join-room')} className="w-full bg-[#A3E635]">
            검사 참여하기
          </Button>
          <Button onClick={() => setStep('admin-login')} variant="secondary" className="w-full">
            관리자 로그인
          </Button>
        </div>
      </Card>
      <p className="text-xs uppercase font-bold mt-4 tracking-widest opacity-70">JJ Creative</p>
    </div>
  );

  const renderJoinRoom = () => (
    <div className="min-h-screen flex flex-col p-6 items-center justify-center text-center">
      <Card className="max-w-md w-full">
        <h2 className="text-2xl font-brutal mb-6">검사 참여</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-left font-bold mb-2">접속 코드</label>
            <Input
              value={roomCode}
              onChange={setRoomCode}
              placeholder="6자리 코드 입력"
              className="text-center text-2xl tracking-widest uppercase"
            />
          </div>
          {error && <p className="text-red-500 text-sm font-bold">{error}</p>}
          <Button onClick={handleJoinRoom} disabled={loading} className="w-full bg-[#A3E635]">
            {loading ? '확인 중...' : '참여하기'}
          </Button>
          <Button onClick={() => { setStep('intro'); setCurrentRoom(null); }} variant="secondary" className="w-full">
            코드 없이 개인 검사하기
          </Button>
          <button onClick={() => setStep('landing')} className="text-sm underline opacity-70">
            돌아가기
          </button>
        </div>
      </Card>
    </div>
  );

  const renderIntro = () => (
    <div className="min-h-screen flex flex-col p-6 items-center justify-center text-center">
      <h1 className="text-4xl md:text-5xl font-brutal mb-6 leading-tight">
        RESILIENCE<br /><span className="bg-black text-[#A3E635] px-2">KRQ-53 CHECK</span>
      </h1>
      {currentRoom && (
        <div className="bg-[#00D1FF] brutal-border p-3 mb-4 font-bold">
          {currentRoom.name}
        </div>
      )}
      <Card className="max-w-md">
        <p className="text-lg mb-6 leading-relaxed font-bold">
          안녕하세요! 당신의 단단한 마음 근력, <br />
          <span className="bg-[#FFDE03] px-1">'회복탄력성'</span>은 어느 정도일까요?
        </p>
        <p className="text-sm mb-8 leading-relaxed opacity-80">
          53개의 문항을 통해 9가지 지표로 정밀 분석합니다. <br />
          나의 강점을 발견하고 더 나은 내일을 준비하세요.
        </p>
        <Button onClick={handleStartTest} className="w-full text-xl py-4 bg-[#A3E635]">
          나의 마음 근력 확인하기
        </Button>
      </Card>
    </div>
  );

  const renderUserInfo = () => (
    <div className="min-h-screen flex flex-col p-6 items-center justify-center">
      <Card className="max-w-md w-full">
        <h2 className="text-2xl font-brutal mb-6 text-center">참가자 정보</h2>
        <div className="space-y-4">
          <div>
            <label className="block font-bold mb-2">이름 *</label>
            <Input value={userName} onChange={setUserName} placeholder="이름을 입력하세요" />
          </div>
          <div>
            <label className="block font-bold mb-2">이메일 (선택)</label>
            <Input value={userEmail} onChange={setUserEmail} placeholder="email@example.com" type="email" />
          </div>
          {error && <p className="text-red-500 text-sm font-bold">{error}</p>}
          <Button onClick={handleUserInfoSubmit} className="w-full bg-[#A3E635]">
            검사 시작하기
          </Button>
        </div>
      </Card>
    </div>
  );

  const renderTest = () => {
    const q = QUESTIONS[currentIdx];
    const progress = ((currentIdx + 1) / QUESTIONS.length) * 100;

    return (
      <div className="min-h-screen p-6 flex flex-col max-w-lg mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-end mb-2">
            <span className="font-brutal text-2xl">Q {currentIdx + 1}</span>
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
            ].map((opt) => (
              <Button key={opt.val} onClick={() => handleAnswer(opt.val)} className="text-left py-3 px-5 flex justify-between items-center bg-white hover:bg-[#A3E635] active:scale-95">
                <span className="font-bold">{opt.text}</span>
                <span className="text-xs font-brutal opacity-30">{opt.val}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderResult = () => {
    const result = calculateResults;
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

    const radarData = result.subCategoryAnalysis.map(s => ({
      subject: s.subCategory.replace('능력', '').replace('도', '').replace('성', ''),
      A: s.score,
      fullMark: s.maxScore
    }));

    return (
      <div className="min-h-screen p-4 pb-40 max-w-4xl mx-auto">
        <div id="result-content" className="bg-[#FFDE03] p-4 md:p-6 border-4 border-black">
          {/* 헤더 */}
          <h1 className="text-2xl md:text-3xl font-brutal mb-4 text-center uppercase border-b-4 border-black pb-2">
            회복탄력성 심층 분석 리포트
          </h1>
          <p className="text-center font-bold mb-4">{result.participantName}님의 결과 | {new Date().toLocaleDateString()}</p>

          {/* 총점 및 페르소나 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card className="text-center border-4">
              <p className="text-xs font-bold uppercase mb-1">당신의 유형</p>
              <h2 className="text-2xl font-brutal text-[#FF5C00] mb-2">{result.persona}</h2>
              <p className="text-xs font-bold">{PERSONA_RULES.find(p => p.name === result.persona)?.desc}</p>
            </Card>
            <Card className="text-center border-4">
              <p className="text-xs font-bold uppercase mb-1">총점</p>
              <div className="text-5xl font-brutal mb-2">{result.totalScore}</div>
              <div className="text-[9px] space-y-1 font-bold">
                <p className={result.totalScore >= 200 ? 'bg-black text-white px-1' : 'opacity-60'}>200점 이상: 탁월한 회복탄력성</p>
                <p className={result.totalScore >= 180 && result.totalScore < 200 ? 'bg-black text-white px-1' : 'opacity-60'}>180-199점: 평균 수준</p>
                <p className={result.totalScore < 180 ? 'bg-black text-white px-1' : 'opacity-60'}>180점 미만: 집중 관리 필요</p>
              </div>
            </Card>
          </div>

          {/* 전체 해석 */}
          <Card className="border-4 bg-white mb-6">
            <h3 className="font-brutal text-lg mb-3 border-b-2 border-black pb-1">종합 해석</h3>
            <p className="text-sm leading-relaxed font-medium">{result.overallInterpretation}</p>
          </Card>

          {/* 레이더 차트 */}
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

          {/* 강점/약점 요약 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card className="border-4 bg-[#A3E635]">
              <h3 className="font-brutal text-sm mb-2">나의 강점 TOP 3</h3>
              <ul className="text-sm space-y-1">
                {result.strengthAreas.map((area, i) => (
                  <li key={area} className="font-bold">
                    {i + 1}. {area}
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="border-4 bg-[#FF5C00] text-white">
              <h3 className="font-brutal text-sm mb-2">성장 필요 영역 TOP 3</h3>
              <ul className="text-sm space-y-1">
                {result.improvementAreas.map((area, i) => (
                  <li key={area} className="font-bold">
                    {i + 1}. {area}
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* 카테고리별 상세 */}
          <Card className="border-4 bg-white mb-6">
            <h3 className="font-brutal text-sm mb-4 border-b-2 border-black pb-1 uppercase">영역별 상세 점수</h3>
            <div className="space-y-6">
              {(Object.keys(categoryMapping) as Category[]).map(cat => (
                <div key={cat} className="space-y-2">
                  <div className="flex justify-between items-center border-b border-black pb-1">
                    <h4 className="font-brutal text-sm" style={{ color: categoryColor[cat] }}>{cat}</h4>
                    <span className="font-brutal text-sm">{result.categoryScores[cat]}점</span>
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

          {/* 하위 요인별 상세 피드백 */}
          <h3 className="font-brutal text-lg mb-4 uppercase bg-black text-white p-2 text-center">9가지 요인 맞춤 분석 및 성장 가이드</h3>

          {result.subCategoryAnalysis.map((analysis, idx) => (
            <Card key={analysis.subCategory} className="border-4 mb-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="text-xs font-bold bg-black text-white px-2 py-1 mr-2">{idx + 1}</span>
                  <span className="font-brutal text-lg">{analysis.subCategory}</span>
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
                <span className="text-xs font-bold">추천 도서:</span>
                {analysis.detailedFeedback.recommendedBooks.map((book, i) => (
                  <span key={i} className="text-xs bg-white px-2 py-1 brutal-border border-1">{book}</span>
                ))}
              </div>

              <div className="bg-black text-white p-2 text-center">
                <p className="text-xs italic">"{analysis.detailedFeedback.affirmation}"</p>
              </div>
            </Card>
          ))}

          {/* 성장 계획 */}
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

        {/* 하단 버튼 */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#FFDE03] border-t-4 border-black z-50">
          <div className="flex gap-2 w-full max-w-4xl mx-auto">
            <Button onClick={handleSaveResult} disabled={loading} className="flex-1 bg-white flex flex-col items-center py-2">
              <span className="text-lg">{loading ? '저장 중...' : '결과 저장 및 제출'}</span>
              <span className="text-[10px] opacity-60 font-sans font-normal">(PDF 저장 + 드라이브 업로드)</span>
            </Button>
            <Button onClick={() => window.location.reload()} variant="danger" className="flex-none px-4">
              다시 하기
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderAdminLogin = () => (
    <div className="min-h-screen flex flex-col p-6 items-center justify-center">
      <Card className="max-w-md w-full">
        <h2 className="text-2xl font-brutal mb-6 text-center">관리자 로그인</h2>
        <form onSubmit={handleAdminLogin} className="space-y-4">
          <div>
            <label className="block font-bold mb-2">이메일</label>
            <Input value={adminEmail} onChange={setAdminEmail} type="email" placeholder="admin@example.com" />
          </div>
          <div>
            <label className="block font-bold mb-2">비밀번호</label>
            <Input value={adminPassword} onChange={setAdminPassword} type="password" placeholder="비밀번호" />
          </div>
          {error && <p className="text-red-500 text-sm font-bold">{error}</p>}
          <Button type="submit" disabled={loading} className="w-full bg-[#A3E635]">
            {loading ? '로그인 중...' : '로그인'}
          </Button>
          <button type="button" onClick={() => setStep('landing')} className="w-full text-sm underline opacity-70">
            돌아가기
          </button>
        </form>
      </Card>
    </div>
  );

  const renderAdminDashboard = () => (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-brutal">관리자 대시보드</h1>
          <div className="flex gap-2">
            <span className="text-sm opacity-70">{adminUser?.email}</span>
            <button onClick={() => { logoutAdmin(); setStep('landing'); }} className="text-sm underline text-red-500">
              로그아웃
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 방 목록 */}
          <div className="lg:col-span-1">
            <Card>
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-brutal">검사 방 목록</h2>
                <Button onClick={() => setShowCreateRoom(!showCreateRoom)} variant="success" className="text-sm py-1 px-3">
                  + 새 방
                </Button>
              </div>

              {showCreateRoom && (
                <div className="mb-4 p-3 bg-gray-50 brutal-border">
                  <Input value={newRoomName} onChange={setNewRoomName} placeholder="방 이름" className="mb-2" />
                  <Input value={newRoomDesc} onChange={setNewRoomDesc} placeholder="설명 (선택)" className="mb-2" />
                  <div className="flex gap-2">
                    <Button onClick={handleCreateRoom} disabled={loading} className="flex-1 text-sm py-1">생성</Button>
                    <Button onClick={() => setShowCreateRoom(false)} variant="danger" className="text-sm py-1">취소</Button>
                  </div>
                </div>
              )}

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {adminRooms.map(room => (
                  <div
                    key={room.id}
                    onClick={() => handleSelectRoom(room)}
                    className={`p-3 brutal-border cursor-pointer transition-colors ${selectedRoom?.id === room.id ? 'bg-[#A3E635]' : 'bg-white hover:bg-gray-50'}`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold">{room.name}</h3>
                        <p className="text-xs opacity-70">{room.description}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-brutal bg-black text-white px-2">{room.accessCode}</span>
                        <p className="text-xs mt-1">{room.participantCount || 0}명</p>
                      </div>
                    </div>
                  </div>
                ))}
                {adminRooms.length === 0 && (
                  <p className="text-center text-sm opacity-50">아직 생성된 방이 없습니다.</p>
                )}
              </div>
            </Card>
          </div>

          {/* 통계 및 결과 */}
          <div className="lg:col-span-2">
            {selectedRoom ? (
              <>
                {/* 방 정보 */}
                <Card className="mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="font-brutal text-xl">{selectedRoom.name}</h2>
                      <p className="text-sm opacity-70">{selectedRoom.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-brutal bg-[#FFDE03] px-3 py-1 brutal-border">{selectedRoom.accessCode}</div>
                      <p className="text-xs mt-1">접속 코드</p>
                    </div>
                  </div>
                </Card>

                {/* 통계 */}
                {roomStats && roomStats.totalParticipants > 0 && (
                  <Card className="mb-4">
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
                        <div className="text-xs">인재파</div>
                      </div>
                      <div className="text-center p-3 bg-[#FF5C00] text-white brutal-border">
                        <div className="text-3xl font-brutal">{roomStats.scoreDistribution.low}</div>
                        <div className="text-xs">관리필요</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={handleExportRoomData} variant="secondary" className="text-sm py-2">
                        CSV 다운로드
                      </Button>
                    </div>
                  </Card>
                )}

                {/* 참가자 목록 */}
                <Card>
                  <h3 className="font-brutal mb-4">참가자 결과 ({roomParticipants.length}명)</h3>

                  {selectedParticipant ? (
                    <div>
                      <button onClick={() => setSelectedParticipant(null)} className="text-sm underline mb-4">
                        목록으로 돌아가기
                      </button>
                      <div className="bg-gray-50 p-4 brutal-border">
                        <h4 className="font-brutal text-lg mb-2">{selectedParticipant.name}</h4>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <span className="text-xs opacity-70">총점</span>
                            <div className="text-2xl font-brutal">{selectedParticipant.result.totalScore}</div>
                          </div>
                          <div>
                            <span className="text-xs opacity-70">유형</span>
                            <div className="font-bold text-[#FF5C00]">{selectedParticipant.result.persona}</div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>자기조절능력</span>
                            <span className="font-bold">{selectedParticipant.result.categoryScores[Category.SELF_REGULATION]}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>대인관계능력</span>
                            <span className="font-bold">{selectedParticipant.result.categoryScores[Category.INTERPERSONAL]}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>긍정성</span>
                            <span className="font-bold">{selectedParticipant.result.categoryScores[Category.POSITIVITY]}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {roomParticipants.map(p => (
                        <div
                          key={p.id}
                          onClick={() => setSelectedParticipant(p)}
                          className="p-3 bg-white brutal-border cursor-pointer hover:bg-gray-50"
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="font-bold">{p.name}</span>
                              <span className="text-xs ml-2 opacity-50">{p.email}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className={`text-xs px-2 py-1 font-bold ${p.result.totalScore >= 200 ? 'bg-[#A3E635]' : p.result.totalScore >= 180 ? 'bg-[#FFDE03]' : 'bg-[#FF5C00] text-white'}`}>
                                {p.result.totalScore}점
                              </span>
                              <span className="text-xs opacity-50">
                                {new Date(p.completedAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                      {roomParticipants.length === 0 && (
                        <p className="text-center text-sm opacity-50 py-8">아직 참여자가 없습니다.</p>
                      )}
                    </div>
                  )}
                </Card>
              </>
            ) : (
              <Card className="text-center py-12">
                <p className="text-lg opacity-50">왼쪽에서 방을 선택하세요</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Main render
  switch (step) {
    case 'landing': return renderLanding();
    case 'join-room': return renderJoinRoom();
    case 'intro': return renderIntro();
    case 'user-info': return renderUserInfo();
    case 'test': return renderTest();
    case 'result': return renderResult();
    case 'admin-login': return renderAdminLogin();
    case 'admin-dashboard': return renderAdminDashboard();
    default: return renderLanding();
  }
};

export default App;
