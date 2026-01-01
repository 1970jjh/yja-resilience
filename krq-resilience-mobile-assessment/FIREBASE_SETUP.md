# Firebase 연결 가이드 (초등학생도 따라할 수 있게!)

## 이 가이드는 뭐예요?
이 앱이 데이터를 저장하려면 "Firebase"라는 서비스가 필요해요.
Firebase는 구글이 만든 무료 데이터 저장소예요!
차근차근 따라하면 30분 안에 완료할 수 있어요.

---

## 1단계: Firebase 계정 만들기

### 1-1. Firebase 사이트 접속
1. 인터넷 브라우저(크롬 추천)를 열어요
2. 주소창에 `firebase.google.com` 입력하고 엔터!
3. 오른쪽 위에 **"Go to console"** 또는 **"콘솔로 이동"** 버튼을 클릭

### 1-2. 구글 로그인
1. 구글 계정으로 로그인해요
2. 구글 계정이 없다면 새로 만들어요 (무료!)

---

## 2단계: 새 프로젝트 만들기

### 2-1. 프로젝트 생성
1. **"프로젝트 추가"** 또는 **"Add project"** 클릭
2. 프로젝트 이름 입력: `resilience-test` (원하는 이름 아무거나!)
3. **"계속"** 클릭

### 2-2. Google 애널리틱스 설정
1. "이 프로젝트에 Google 애널리틱스 사용 설정" → **끄기** (파란 버튼을 클릭해서 회색으로)
2. **"프로젝트 만들기"** 클릭
3. 잠시 기다리면 완료! **"계속"** 클릭

---

## 3단계: 웹 앱 등록하기

### 3-1. 앱 추가
1. 프로젝트 메인 화면에서 **`</>`** 모양 아이콘 클릭 (웹 아이콘)
2. 앱 별명 입력: `resilience-webapp`
3. "Firebase 호스팅 설정" 체크 안 해도 돼요
4. **"앱 등록"** 클릭

### 3-2. 설정 값 복사하기
화면에 이런 코드가 나와요:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "resilience-test-xxxxx.firebaseapp.com",
  projectId: "resilience-test-xxxxx",
  storageBucket: "resilience-test-xxxxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

**이 값들을 메모장에 복사해두세요!** 나중에 사용할 거예요.

**"콘솔로 계속"** 클릭

---

## 4단계: 데이터베이스 설정 (Firestore)

### 4-1. Firestore 만들기
1. 왼쪽 메뉴에서 **"Firestore Database"** 클릭
2. **"데이터베이스 만들기"** 클릭

### 4-2. 보안 규칙 설정
1. **"프로덕션 모드에서 시작"** 선택
2. 위치 선택: `asia-northeast3 (Seoul)` 또는 아무거나
3. **"사용 설정"** 클릭

### 4-3. 보안 규칙 수정 (중요!)
1. 상단 **"규칙"** 탭 클릭
2. 기존 내용을 지우고 아래 내용을 복사-붙여넣기:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 인증된 관리자만 방 생성/수정 가능
    match /rooms/{roomId} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    // 누구나 결과 저장 가능, 읽기는 인증된 사용자만
    match /participants/{participantId} {
      allow create: if true;
      allow read: if request.auth != null;
    }
  }
}
```

3. **"게시"** 클릭

---

## 5단계: 로그인 기능 설정 (Authentication)

### 5-1. Authentication 시작
1. 왼쪽 메뉴에서 **"Authentication"** 클릭
2. **"시작하기"** 클릭

### 5-2. 이메일 로그인 활성화
1. **"이메일/비밀번호"** 클릭
2. 첫 번째 토글 **"사용 설정"** 켜기
3. **"저장"** 클릭

### 5-3. 관리자 계정 만들기
1. 상단 **"Users"** 탭 클릭
2. **"사용자 추가"** 클릭
3. 이메일과 비밀번호 입력 (이것이 관리자 로그인 정보!)
   - 예: `admin@mycompany.com` / `mypassword123!`
4. **"사용자 추가"** 클릭

---

## 6단계: 앱에 Firebase 연결하기

### 6-1. 환경 변수 파일 만들기
프로젝트 폴더에서 `.env` 파일을 만들고 아래 내용을 입력:

```
VITE_FIREBASE_API_KEY=여기에_apiKey_값
VITE_FIREBASE_AUTH_DOMAIN=여기에_authDomain_값
VITE_FIREBASE_PROJECT_ID=여기에_projectId_값
VITE_FIREBASE_STORAGE_BUCKET=여기에_storageBucket_값
VITE_FIREBASE_MESSAGING_SENDER_ID=여기에_messagingSenderId_값
VITE_FIREBASE_APP_ID=여기에_appId_값
```

**3-2에서 복사해둔 값들을 여기에 넣어요!**

예시:
```
VITE_FIREBASE_API_KEY=AIzaSyAbCdEfGhIjKlMnOpQrStUvWxYz
VITE_FIREBASE_AUTH_DOMAIN=resilience-test-12345.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=resilience-test-12345
VITE_FIREBASE_STORAGE_BUCKET=resilience-test-12345.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

### 6-2. 의존성 설치
터미널(명령 프롬프트)에서:
```bash
npm install
```

### 6-3. 앱 실행
```bash
npm run dev
```

---

## 7단계: 테스트하기

### 7-1. 관리자 로그인 테스트
1. 브라우저에서 `http://localhost:3000` 열기
2. **"관리자 로그인"** 클릭
3. 5-3에서 만든 이메일/비밀번호 입력
4. 로그인 성공!

### 7-2. 검사 방 만들기
1. 대시보드에서 **"+ 새 방"** 클릭
2. 방 이름 입력 (예: "1학기 회복탄력성 검사")
3. **"생성"** 클릭
4. 자동으로 생성된 **6자리 접속 코드** 확인! (예: ABC123)

### 7-3. 참가자 테스트
1. 새 브라우저 탭/창 열기
2. **"검사 참여하기"** 클릭
3. 접속 코드 입력
4. 검사 진행 & 완료

### 7-4. 결과 확인
1. 관리자 대시보드로 돌아가기
2. 방 클릭
3. 참가자 결과 확인!

---

## 문제가 생겼을 때

### "Firebase 앱이 초기화되지 않았습니다" 오류
→ `.env` 파일의 값들이 정확한지 확인하세요

### 로그인이 안 돼요
→ Firebase Console > Authentication에서 계정이 제대로 만들어졌는지 확인

### 데이터가 저장 안 돼요
→ Firebase Console > Firestore Database > 규칙이 제대로 설정됐는지 확인

---

## 요약 체크리스트

- [ ] Firebase 프로젝트 생성
- [ ] 웹 앱 등록 & 설정 값 복사
- [ ] Firestore Database 생성 & 규칙 설정
- [ ] Authentication 활성화 & 관리자 계정 생성
- [ ] `.env` 파일에 설정 값 입력
- [ ] `npm install` 실행
- [ ] `npm run dev`로 테스트

---

## 도움이 필요하면?

Firebase 공식 문서: https://firebase.google.com/docs

축하해요! Firebase 연결 완료!
