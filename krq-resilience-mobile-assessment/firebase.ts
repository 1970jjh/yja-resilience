
import { initializeApp, FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Firestore,
  Timestamp
} from 'firebase/firestore';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  Auth,
  User
} from 'firebase/auth';
import { Room, Participant, EnhancedAssessmentResult, RoomStats, Category, SubCategory } from './types';

// Firebase 설정 - 사용자가 직접 입력해야 함
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "YOUR_API_KEY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "YOUR_AUTH_DOMAIN",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "YOUR_STORAGE_BUCKET",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "YOUR_SENDER_ID",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "YOUR_APP_ID"
};

let app: FirebaseApp;
let db: Firestore;
let auth: Auth;

// Firebase 초기화
export const initializeFirebase = () => {
  if (!app) {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
  }
  return { app, db, auth };
};

// 인증 관련 함수
export const loginAdmin = async (email: string, password: string) => {
  const { auth } = initializeFirebase();
  return signInWithEmailAndPassword(auth, email, password);
};

export const logoutAdmin = async () => {
  const { auth } = initializeFirebase();
  return signOut(auth);
};

export const onAuthChange = (callback: (user: User | null) => void) => {
  const { auth } = initializeFirebase();
  return onAuthStateChanged(auth, callback);
};

// 방(Room) 관련 함수
export const createRoom = async (roomData: Omit<Room, 'id' | 'createdAt' | 'participantCount'>): Promise<string> => {
  const { db } = initializeFirebase();
  const docRef = await addDoc(collection(db, 'rooms'), {
    ...roomData,
    createdAt: Timestamp.now(),
    participantCount: 0
  });
  return docRef.id;
};

export const getRoom = async (roomId: string): Promise<Room | null> => {
  const { db } = initializeFirebase();
  const docSnap = await getDoc(doc(db, 'rooms', roomId));
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Room;
  }
  return null;
};

export const getRoomByAccessCode = async (accessCode: string): Promise<Room | null> => {
  const { db } = initializeFirebase();
  const q = query(collection(db, 'rooms'), where('accessCode', '==', accessCode), where('isActive', '==', true));
  const snapshot = await getDocs(q);
  if (!snapshot.empty) {
    const docData = snapshot.docs[0];
    return { id: docData.id, ...docData.data() } as Room;
  }
  return null;
};

export const getRoomsByAdmin = async (adminId: string): Promise<Room[]> => {
  const { db } = initializeFirebase();
  const q = query(
    collection(db, 'rooms'),
    where('createdBy', '==', adminId),
    orderBy('createdAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Room));
};

export const updateRoom = async (roomId: string, data: Partial<Room>) => {
  const { db } = initializeFirebase();
  await updateDoc(doc(db, 'rooms', roomId), data);
};

// 모든 활성 방 가져오기
export const getAllActiveRooms = async (): Promise<Room[]> => {
  const { db } = initializeFirebase();
  const q = query(
    collection(db, 'rooms'),
    where('isActive', '==', true),
    orderBy('createdAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Room));
};

// 방 삭제 (비활성화)
export const deleteRoom = async (roomId: string) => {
  const { db } = initializeFirebase();
  await updateDoc(doc(db, 'rooms', roomId), { isActive: false });
};

// 방 완전 삭제
export const permanentlyDeleteRoom = async (roomId: string) => {
  const { db } = initializeFirebase();
  await deleteDoc(doc(db, 'rooms', roomId));
};

// 참가자(Participant) 관련 함수
export const saveParticipantResult = async (
  roomId: string,
  participantData: Omit<Participant, 'id'>
): Promise<string> => {
  const { db } = initializeFirebase();

  // 결과 저장
  const docRef = await addDoc(collection(db, 'participants'), {
    ...participantData,
    completedAt: Timestamp.now()
  });

  // 방의 참가자 수 업데이트
  const roomRef = doc(db, 'rooms', roomId);
  const roomSnap = await getDoc(roomRef);
  if (roomSnap.exists()) {
    const currentCount = roomSnap.data().participantCount || 0;
    await updateDoc(roomRef, { participantCount: currentCount + 1 });
  }

  return docRef.id;
};

export const getParticipantsByRoom = async (roomId: string): Promise<Participant[]> => {
  const { db } = initializeFirebase();
  const q = query(
    collection(db, 'participants'),
    where('roomId', '==', roomId),
    orderBy('completedAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Participant));
};

export const getParticipant = async (participantId: string): Promise<Participant | null> => {
  const { db } = initializeFirebase();
  const docSnap = await getDoc(doc(db, 'participants', participantId));
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Participant;
  }
  return null;
};

// 통계 계산 함수
export const calculateRoomStats = (participants: Participant[]): RoomStats => {
  if (participants.length === 0) {
    return {
      totalParticipants: 0,
      averageTotalScore: 0,
      averageCategoryScores: {
        [Category.SELF_REGULATION]: 0,
        [Category.INTERPERSONAL]: 0,
        [Category.POSITIVITY]: 0
      },
      averageSubCategoryScores: {
        [SubCategory.EMOTION_CONTROL]: 0,
        [SubCategory.IMPULSE_CONTROL]: 0,
        [SubCategory.CAUSAL_ANALYSIS]: 0,
        [SubCategory.COMMUNICATION]: 0,
        [SubCategory.EMPATHY]: 0,
        [SubCategory.EGO_EXPANSION]: 0,
        [SubCategory.SELF_OPTIMISM]: 0,
        [SubCategory.LIFE_SATISFACTION]: 0,
        [SubCategory.GRATITUDE]: 0
      },
      personaDistribution: {},
      scoreDistribution: { high: 0, medium: 0, low: 0 }
    };
  }

  const total = participants.length;

  // 평균 점수 계산
  const avgTotal = participants.reduce((sum, p) => sum + p.result.totalScore, 0) / total;

  // 카테고리별 평균
  const avgCat = {
    [Category.SELF_REGULATION]: participants.reduce((sum, p) => sum + p.result.categoryScores[Category.SELF_REGULATION], 0) / total,
    [Category.INTERPERSONAL]: participants.reduce((sum, p) => sum + p.result.categoryScores[Category.INTERPERSONAL], 0) / total,
    [Category.POSITIVITY]: participants.reduce((sum, p) => sum + p.result.categoryScores[Category.POSITIVITY], 0) / total
  };

  // 하위 카테고리별 평균
  const avgSubCat = Object.values(SubCategory).reduce((acc, sub) => {
    acc[sub] = participants.reduce((sum, p) => sum + p.result.subCategoryScores[sub], 0) / total;
    return acc;
  }, {} as Record<SubCategory, number>);

  // 페르소나 분포
  const personaDist: Record<string, number> = {};
  participants.forEach(p => {
    personaDist[p.result.persona] = (personaDist[p.result.persona] || 0) + 1;
  });

  // 점수 분포
  const scoreDist = {
    high: participants.filter(p => p.result.totalScore >= 200).length,
    medium: participants.filter(p => p.result.totalScore >= 180 && p.result.totalScore < 200).length,
    low: participants.filter(p => p.result.totalScore < 180).length
  };

  return {
    totalParticipants: total,
    averageTotalScore: Math.round(avgTotal * 10) / 10,
    averageCategoryScores: avgCat,
    averageSubCategoryScores: avgSubCat,
    personaDistribution: personaDist,
    scoreDistribution: scoreDist
  };
};

// 랜덤 접근 코드 생성
export const generateAccessCode = (): string => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};
