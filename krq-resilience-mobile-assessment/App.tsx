
import React, { useState, useMemo } from 'react';
import { QUESTIONS, PERSONA_RULES } from './constants';
import { Category, SubCategory, AssessmentResult } from './types';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

// --- Utility Components ---

const Button: React.FC<{ 
  onClick?: () => void; 
  children: React.ReactNode; 
  variant?: 'primary' | 'secondary' | 'danger';
  className?: string;
  disabled?: boolean;
}> = ({ onClick, children, variant = 'primary', className = '', disabled }) => {
  const baseClass = "brutal-border brutal-shadow font-brutal px-6 py-3 transition-transform active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-white hover:bg-[#A3E635]",
    secondary: "bg-[#00D1FF] hover:bg-[#00B8E6]",
    danger: "bg-[#FF5C00] text-white hover:bg-[#E65200]"
  };
  return (
    <button disabled={disabled} onClick={onClick} className={`${baseClass} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const Card: React.FC<{ children: React.ReactNode; className?: string; id?: string }> = ({ children, className = '', id }) => (
  <div id={id} className={`bg-white brutal-border brutal-shadow p-6 mb-6 ${className}`}>
    {children}
  </div>
);

// --- Main App ---

const App: React.FC = () => {
  const [step, setStep] = useState<'intro' | 'test' | 'result'>('intro');
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentIdx, setCurrentIdx] = useState(0);

  const handleStart = () => setStep('test');

  const handleAnswer = (value: number) => {
    setAnswers(prev => ({ ...prev, [QUESTIONS[currentIdx].id]: value }));
    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setStep('result');
    }
  };

  const calculateResults = useMemo((): AssessmentResult & { 
    categoryStatuses: Record<Category, string>,
    categoryColor: Record<Category, string>,
    categoryMapping: Record<Category, SubCategory[]>
  } => {
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

    const getStatus = (cat: Category, score: number) => {
      if (cat === Category.SELF_REGULATION) {
        if (score >= 75) return "Great! (상위 7%)";
        if (score >= 70) return "양호";
        if (score <= 55) return "반드시 노력 (하위 20%)";
        if (score <= 63) return "노력 필요";
        return "보통";
      }
      if (cat === Category.INTERPERSONAL) {
        if (score >= 80) return "Great! (상위 6%)";
        if (score >= 74) return "양호";
        if (score <= 62) return "반드시 노력 (하위 20%)";
        if (score <= 67) return "노력 필요";
        return "보통";
      }
      if (cat === Category.POSITIVITY) {
        if (score >= 75) return "Great! (상위 7%)";
        if (score >= 70) return "양호";
        if (score <= 56) return "반드시 노력 (하위 20%)";
        if (score <= 63) return "노력 필요";
        return "보통";
      }
      return "데이터 부족";
    };

    const catStatuses = {
      [Category.SELF_REGULATION]: getStatus(Category.SELF_REGULATION, catScores[Category.SELF_REGULATION]),
      [Category.INTERPERSONAL]: getStatus(Category.INTERPERSONAL, catScores[Category.INTERPERSONAL]),
      [Category.POSITIVITY]: getStatus(Category.POSITIVITY, catScores[Category.POSITIVITY]),
    };

    const catColor = {
      [Category.SELF_REGULATION]: "#FF5C00", // Orange
      [Category.INTERPERSONAL]: "#00D1FF", // Blue
      [Category.POSITIVITY]: "#A3E635", // Green
    };

    const categoryMapping = {
      [Category.SELF_REGULATION]: [SubCategory.EMOTION_CONTROL, SubCategory.IMPULSE_CONTROL, SubCategory.CAUSAL_ANALYSIS],
      [Category.INTERPERSONAL]: [SubCategory.COMMUNICATION, SubCategory.EMPATHY, SubCategory.EGO_EXPANSION],
      [Category.POSITIVITY]: [SubCategory.SELF_OPTIMISM, SubCategory.LIFE_SATISFACTION, SubCategory.GRATITUDE],
    };

    const generateAnalysis = () => {
      const sr = catScores[Category.SELF_REGULATION];
      const is = catScores[Category.INTERPERSONAL];
      const po = catScores[Category.POSITIVITY];

      let strengths = "";
      const improvements: AssessmentResult['feedback']['improvements'] = [];

      if (sr >= 70) strengths += `[자기조절능력] 당신은 감정 조절이 우수합니다. 특히 ${subScores[SubCategory.EMOTION_CONTROL] >= 25 ? '정서적 통제력' : '문제 분석력'}이 뛰어나 위기에서도 흔들리지 않습니다. `;
      if (is >= 74) strengths += `[대인관계] 타인의 감정을 읽는 ${SubCategory.EMPATHY}와 명확한 ${SubCategory.COMMUNICATION} 능력이 조화로워 주변의 신뢰를 한몸에 받습니다. `;
      if (po >= 70) strengths += `[긍정성] 삶에 대한 낙관과 ${SubCategory.GRATITUDE}하는 태도는 당신이 역경을 도약의 기회로 바꾸는 핵심 동력입니다. `;
      
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
      categoryStatuses: catStatuses,
      categoryColor: catColor,
      categoryMapping: categoryMapping,
      feedback: generateAnalysis()
    };
  }, [answers]);

  const handleFinalSave = async () => {
    const element = document.getElementById('result-content');
    if (!element) return;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('KRQ_Resilience_Report.pdf');
    window.open("https://drive.google.com/drive/folders/1SEGYJuN-s2mMcjTRGTWiZ2kAtTWqFEhS?usp=sharing", "_blank");
    alert("결과 PDF가 저장되었습니다. 드라이브 폴더에 파일을 업로드해주세요!");
  };

  if (step === 'intro') {
    return (
      <div className="min-h-screen flex flex-col p-6 items-center justify-center text-center">
        <h1 className="text-4xl md:text-6xl font-brutal mb-6 leading-tight">
          RESILIENCE<br/><span className="bg-black text-[#A3E635] px-2">KRQ-53 CHECK</span>
        </h1>
        <Card className="max-w-md">
          <p className="text-lg mb-6 leading-relaxed font-bold">
            안녕하세요! 당신의 단단한 마음 근력, <br/>
            <span className="bg-[#FFDE03] px-1">'회복탄력성'</span>은 어느 정도일까요?
          </p>
          <p className="text-sm mb-8 leading-relaxed opacity-80">
            53개의 문항을 통해 9가지 지표로 정밀 분석합니다. <br/>
            나의 강점을 발견하고 더 나은 내일을 준비하세요. 😊
          </p>
          <Button onClick={handleStart} className="w-full text-xl py-4 bg-[#A3E635]">
            나의 마음 근력 확인하기
          </Button>
        </Card>
        <p className="text-xs uppercase font-bold mt-4 tracking-widest opacity-70">JJ Creative</p>
      </div>
    );
  }

  if (step === 'test') {
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
  }

  const result = calculateResults;
  const radarData = Object.entries(result.subCategoryScores).map(([name, score]) => {
    // Find category for color matching
    let color = "#000";
    if (result.categoryMapping[Category.SELF_REGULATION].includes(name as SubCategory)) color = result.categoryColor[Category.SELF_REGULATION];
    else if (result.categoryMapping[Category.INTERPERSONAL].includes(name as SubCategory)) color = result.categoryColor[Category.INTERPERSONAL];
    else if (result.categoryMapping[Category.POSITIVITY].includes(name as SubCategory)) color = result.categoryColor[Category.POSITIVITY];
    
    return { 
      subject: name.replace('능력', '').replace('도', '').replace('성', ''), 
      A: score, 
      fullMark: 30,
      color: color
    };
  });

  return (
    <div className="min-h-screen p-6 pb-40 max-w-2xl mx-auto">
      <div id="result-content" className="bg-[#FFDE03] p-6 border-4 border-black">
        <h1 className="text-3xl font-brutal mb-4 text-center uppercase border-b-4 border-black pb-2">9-Factor Resilience Report</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card className="text-center flex flex-col justify-center border-4">
                <p className="text-[10px] font-bold uppercase mb-1">Assessment Persona</p>
                <h2 className="text-2xl font-brutal text-[#FF5C00] leading-none mb-1">{result.persona}</h2>
                <p className="text-[10px] font-bold px-2">{PERSONA_RULES.find(p => p.name === result.persona)?.desc}</p>
            </Card>
            <Card className="text-center flex flex-col justify-center border-4">
                <p className="text-[10px] font-bold uppercase mb-1">Total Score</p>
                <div className="text-5xl font-brutal leading-none mb-2">{result.totalScore}</div>
                <div className="text-[9px] leading-tight font-bold space-y-1">
                  <p className={`${result.totalScore >= 200 ? 'bg-black text-white px-1' : 'opacity-60'}`}>200↑: 불행에도 흔들리지 않는 단단함</p>
                  <p className={`${result.totalScore >= 180 && result.totalScore < 200 ? 'bg-black text-white px-1' : 'opacity-60'}`}>180-200: 보통 수준의 양호한 탄력성</p>
                  <p className={`${result.totalScore < 180 ? 'bg-black text-white px-1' : 'opacity-60'}`}>180↓: 사소한 일에도 쉽게 영향 받는 상태</p>
                </div>
            </Card>
        </div>

        <Card className="p-0 overflow-hidden border-4 mb-6">
          <div className="bg-black text-white p-3 font-brutal text-center uppercase text-xs">9-Dimensional Balance Matrix</div>
          <div className="h-72 w-full bg-white">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="#ddd" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'black', fontWeight: '900', fontSize: 10 }} />
                <Radar name="Subfactors" dataKey="A" stroke="#000" fill="#000" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="border-4 bg-white mb-6">
          <h3 className="font-brutal text-sm mb-4 border-b-2 border-black pb-1 uppercase">Sub-Factor Detail Index</h3>
          <div className="space-y-6">
            {(Object.keys(result.categoryMapping) as Category[]).map(cat => (
              <div key={cat} className="space-y-2">
                <div className="flex justify-between items-end border-b border-black pb-1">
                  <h4 className="font-brutal text-sm" style={{ color: result.categoryColor[cat] }}>{cat}</h4>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-black bg-black text-white px-1 mb-1">{result.categoryStatuses[cat]}</span>
                    <span className="font-brutal text-xs">{result.categoryScores[cat]} / {cat === Category.POSITIVITY ? '85' : '90'}</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-2 pl-2">
                  {result.categoryMapping[cat].map(sub => (
                    <div key={sub} className="flex justify-between items-center text-[11px]">
                      <span className="font-bold opacity-70">{sub}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-100 brutal-border border-[1px]">
                          <div className="h-full" style={{ backgroundColor: result.categoryColor[cat], width: `${(result.subCategoryScores[sub] / 30) * 100}%` }}></div>
                        </div>
                        <span className="font-brutal w-4 text-right">{result.subCategoryScores[sub]}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <p className="text-[9px] font-bold opacity-60 text-right mt-2 italic">
              * 한국인 평균: 자기조절(63.5), 대인관계(67.8), 긍정성(63.4)
            </p>
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="border-4 bg-[#A3E635]">
            <h3 className="font-brutal text-lg mb-2 border-b-2 border-black pb-1 uppercase">01. Strength Analysis</h3>
            <p className="leading-relaxed text-sm font-bold">{result.feedback.strengths}</p>
          </Card>
          <Card className="border-4 bg-white">
            <h3 className="font-brutal text-lg mb-2 border-b-2 border-black pb-1 uppercase">02. Growth Solutions</h3>
            <div className="space-y-6">
              {result.feedback.improvements.map((item, idx) => (
                <div key={idx} className="border-l-4 border-black pl-4">
                  <h4 className="font-brutal text-md text-[#FF5C00] mb-1">{item.title}</h4>
                  <p className="text-xs leading-relaxed mb-2 font-bold opacity-80">{item.content}</p>
                  <div className="bg-[#f0f0f0] p-3 brutal-border text-xs font-bold leading-snug">
                    🚀 미션: {item.mission}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
        
        <div className="mt-6 p-4 border-2 border-dashed border-black text-[10px] font-bold text-center opacity-40">
          KRQ-53 심층 분석 엔진 | JJ Creative Resilience Solution | {new Date().toLocaleDateString()}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#FFDE03] border-t-4 border-black flex flex-col gap-2 z-50">
        <div className="flex gap-2 w-full max-w-2xl mx-auto">
            <Button onClick={handleFinalSave} className="flex-1 bg-white flex flex-col items-center py-2">
              <span className="text-lg">결과 저장 및 제출</span>
              <span className="text-[10px] opacity-60 font-sans font-normal">(PDF 저장 + 드라이브 업로드)</span>
            </Button>
            <Button onClick={() => window.location.reload()} variant="danger" className="flex-none px-4">
              다시 하기
            </Button>
        </div>
        <div className="text-center text-[10px] font-bold opacity-50">JJ Creative Resilience Engine v5.0</div>
      </div>
    </div>
  );
};

export default App;
