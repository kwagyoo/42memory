# 42Memory

42서울 카뎃들이 서로 익명 메시지를 주고받는 웹 애플리케이션입니다.
macOS 데스크톱 UI를 모티브로 한 인터페이스에서 메시지를 폴더/파일 형태로 열람합니다.

> 기획 문서: https://garnet-server-5da.notion.site/2-eec4f053a90a40fd98d3d395e3ad4e06

---

## 목차

- [주요 기능](#주요-기능)
- [사용자 흐름](#사용자-흐름)
- [기술 스택](#기술-스택)
- [프로젝트 구조](#프로젝트-구조)
- [시작하기](#시작하기)
- [라우트](#라우트)
- [API 레퍼런스](#api-레퍼런스)
- [에러 코드](#에러-코드)
- [배포](#배포)
- [42 OAuth 연동](#42-oauth-연동)

---

## 주요 기능

- **42 OAuth 인증**: 메시지 발신자의 42 계정 인증으로 익명성 보장
- **익명 메시지 전송**: 공유 링크(`/message/:userID`)를 통해 수신자에게 메시지 전송 (최대 3개)
- **macOS 스타일 수신함**: 드래그 가능한 윈도우로 메시지를 폴더/파일 형태로 열람
- **deadline 열람 제한**: 설정한 날짜 이후에만 메시지 열람 가능
- **회원가입/로그인**: 클러스터명 + 비밀번호 기반 인증

---

## 사용자 흐름

### 메시지 전송 (발신자)

```
수신자 공유 링크 접속 (/message/:userID)
    │
    ▼
수신자 클러스터명 확인
    │
    ▼
42 OAuth 인증 (/redirect)
    │
    ▼
메시지 작성 (/message/:userID/write)
닉네임 + 제목 + 본문 입력
    │
    ▼
전송 완료 (수신자 당 최대 3개)
```

### 메시지 수신 (수신자)

```
로그인 (/login)
    │
    ▼
메인 데스크톱 (/main/:userID)
    │
    ├── deadline 이전: 메시지 열람 불가
    │
    └── deadline 이후: 폴더 아이콘 클릭
            │
            ▼
        발신자 닉네임 목록 (DirectoryBlock)
            │
            ▼
        파일 클릭 → 메시지 윈도우 열기 (MessageBlock)
```

### 회원가입

```
회원가입 버튼 클릭 (/register)
    │
    ▼
42 OAuth 인증 → 클러스터ID 자동 입력
    │
    ▼
비밀번호 + deadline + 이메일 설정
    │
    ▼
회원가입 완료 → 로그인 페이지 이동
```

---

## 기술 스택

| 구분 | 기술 |
|------|------|
| Framework | React 17 + TypeScript |
| Styling | styled-components 5, React Bootstrap 2 |
| Routing | React Router v6 |
| Animation | react-spring 9, react-draggable 4 |
| HTTP Client | Axios |
| Form | Formik 2 + Yup |
| Build | Create React App (react-scripts 5) |
| Package Manager | Yarn 1.x |
| CI/CD | GitHub Actions |
| Hosting | AWS S3 + CloudFront |

---

## 프로젝트 구조

```
src/
├── api/                      # API 호출 함수
│   ├── auth.tsx              # 인증 (로그인, 회원가입, 42 OAuth, 비밀번호 초기화)
│   ├── client.tsx            # Axios 인스턴스 (baseURL 설정)
│   └── message.tsx           # 메시지 CRUD
├── block/                    # 주요 UI 블록 컴포넌트
│   ├── DirectoryBlock.tsx    # 메시지 목록 (macOS 폴더 탐색기)
│   ├── HeaderWatchBlock.tsx  # 상단 시계/상태바
│   ├── MessageBlock.tsx      # 메시지 열람 윈도우
│   ├── MessageWriteBlock.tsx # 메시지 작성 폼
│   └── RegisterBlock.tsx     # 회원가입 폼
├── common/                   # 공통 컴포넌트
│   ├── ButtonList.tsx
│   ├── CautionWindow.tsx
│   ├── DraggableWindow.tsx   # 드래그 가능한 macOS 윈도우
│   ├── Header.tsx            # macOS 상단 메뉴바
│   └── LoadingModal.tsx
├── font/                     # Apple SD Gothic Neo 폰트
├── image/                    # 아이콘 및 배경 이미지
├── module/                   # React Context
│   ├── ErrorContext.tsx
│   └── LoginContext.tsx
├── pages/                    # 라우트별 페이지
│   ├── LoginPage.tsx         # / (로그인)
│   ├── MainPage.tsx          # /main/:userID (메인 데스크톱)
│   ├── RegisterPage.tsx      # /register (회원가입)
│   ├── RedirectPage.tsx      # /redirect (42 OAuth 콜백)
│   ├── WritePage.tsx         # /message/:userID/write (메시지 작성)
│   └── MessageLoginPage.tsx  # /message/:userID (메시지 전송 진입)
└── types/
    └── types.ts              # TypeScript 타입 정의
```

---

## 시작하기

### 사전 요구사항

- **Node.js** 16.x
- **Yarn** 1.x (`npm install -g yarn`)
- 백엔드 서버 실행 (별도 저장소)

### 환경 변수 설정

프로젝트 루트에 `.env.development` 파일을 생성합니다:

```env
# 백엔드 API 서버 주소
REACT_APP_BACKEND_ENDPOINT_URL=http://localhost:8080

# 42 OAuth: 인가 코드 발급 URL (type=register용)
REACT_APP_INTRA=https://api.intra.42.fr/oauth/authorize?client_id=...&redirect_uri=...&response_type=code

# 42 OAuth: 메시지 작성자 인증 URL (type=message용)
REACT_APP_MESSAGE_REDIRECT_URL=https://api.intra.42.fr/oauth/authorize?client_id=...&redirect_uri=...&response_type=code

# 회원가입 완료 후 리다이렉트 URL
REACT_APP_REGISTER_URL=http://localhost:3000/register

# 로그인 후 리다이렉트 URL (홈)
REACT_APP_HOME=http://localhost:3000
```

| 변수 | 설명 |
|------|------|
| `REACT_APP_BACKEND_ENDPOINT_URL` | 백엔드 API 서버 baseURL |
| `REACT_APP_INTRA` | 회원가입/비밀번호 초기화용 42 OAuth URL |
| `REACT_APP_MESSAGE_REDIRECT_URL` | 메시지 작성자 인증용 42 OAuth URL |
| `REACT_APP_REGISTER_URL` | 회원가입 OAuth 콜백 후 리다이렉트 주소 |
| `REACT_APP_HOME` | 로그인 성공 후 리다이렉트 주소 |

### 설치 및 실행

```bash
# 의존성 설치
yarn install

# 개발 서버 실행 (http://localhost:3000)
yarn start

# 프로덕션 빌드
yarn build

# 테스트 실행
yarn test
```

### 최소 화면 요구사항

- 너비: 1280px 이상
- 높이: 750px 이상

화면이 이 크기보다 작으면 "브라우저 크기를 조절해주세요" 안내가 표시됩니다.

---

## 라우트

| 경로 | 페이지 | 설명 |
|------|--------|------|
| `/` | LoginPage | 로그인 (클러스터명 + 비밀번호) |
| `/register` | RegisterPage | 회원가입 |
| `/main/:userID` | MainPage | 메인 데스크톱 (메시지 열람) |
| `/message/:userID` | MessageLoginPage | 메시지 작성 진입점 (수신자 확인) |
| `/message/:userID/write` | WritePage | 메시지 작성 폼 |
| `/redirect` | RedirectPage | 42 OAuth 콜백 처리 |

---

## API 레퍼런스

모든 요청의 baseURL은 `REACT_APP_BACKEND_ENDPOINT_URL`로 설정됩니다.

### 인증

#### 회원가입

```
POST /user
```

Request Body:

| 필드 | 타입 | 설명 |
|------|------|------|
| `userClusterName` | string | 클러스터명 (고유값) |
| `userPassword` | string | 비밀번호 |
| `userDeadline` | string | 메시지 열람 가능 날짜 |
| `userEmail` | string | 이메일 (비밀번호 초기화용) |

#### 로그인

```
GET /user?userClusterName={name}&userPassword={password}
```

Response:

```json
{
  "userID": "string",
  "accessToken": "string",
  "userClusterName": "string",
  "userDeadline": "string"
}
```

> accessToken 유효 기간: 30분. `sessionStorage`에 캐시됩니다.

#### 비밀번호 초기화

```
POST /user/password
```

Request Body:

| 필드 | 타입 | 설명 |
|------|------|------|
| `userEmail` | string | 가입 시 등록한 이메일 |

> 초기화 요청 후 개발자가 슬랙으로 임시 비밀번호를 안내합니다.

#### 42 OAuth 사용자 정보 조회

```
GET /user/info?code={code}&type={type}
```

| 파라미터 | 설명 |
|----------|------|
| `code` | 42 OAuth 인가 코드 |
| `type` | `register` (회원가입/초기화) 또는 `message` (메시지 작성) |

Response:

```json
{
  "data": {
    "login": "cadet_login",
    "cursus_users": [{ "blackholed_at": "..." }]
  },
  "accessToken": "string"
}
```

---

### 메시지

#### 발신자 닉네임 목록 조회 (간략)

```
GET /user/:id/message/simple
```

Response:

```json
{
  "messages": [
    { "messageID": 1, "senderNickname": "string" }
  ]
}
```

#### 메시지 전체 조회

```
GET /user/:id/message
```

Response:

```json
{
  "messages": [
    {
      "messageID": 1,
      "senderNickname": "string",
      "messageTitle": "string",
      "messageText": "string"
    }
  ]
}
```

> deadline 이전 요청 시 `400 NotExpiredDate` 에러를 반환합니다.

#### 메시지 전송

```
POST /user/:id/message
```

Request Body:

| 필드 | 타입 | 설명 |
|------|------|------|
| `senderNickname` | string | 발신자 닉네임 (익명) |
| `messageTitle` | string | 메시지 제목 |
| `messageText` | string | 메시지 본문 |
| `clusterName` | string | 발신자 클러스터명 |

Response:

```json
{
  "sendMessageCount": 2
}
```

#### 수신자 클러스터명 조회

```
GET /user/:id/name
```

Response:

```json
{
  "userClusterName": "string"
}
```

---

## 에러 코드

| HTTP 상태 | 에러 코드 | 설명 |
|-----------|-----------|------|
| 500 | - | 서버 내부 오류 |
| 401 | `Unauthorized` | 잘못된 요청 (인증 실패) |
| 401 | `MismatchedUserInfo` | 클러스터명 또는 비밀번호 불일치 |
| 400 | `NotExpiredDate` | deadline이 아직 도래하지 않아 열람 불가 |
| 400 | `DuplicatedUser` | 이미 가입된 클러스터명 |
| 400 | `ExceededMessageCount` | 수신자에게 보낼 수 있는 메시지 3개 초과 |
| 400 | `ExpiredLinkDate` | 만료된 공유 링크 접속 |

---

## 배포

### 아키텍처

```
GitHub (main branch PR)
    │
    ▼
GitHub Actions (CI/CD)
    │
    ├── yarn install
    ├── yarn build
    │
    ▼
AWS S3 (정적 파일 호스팅)
    │
    ▼
AWS CloudFront (CDN + HTTPS)
    │
    ▼
사용자 브라우저
```

### 트리거

`main` 브랜치에 대한 Pull Request가 생성되면 자동 배포가 실행됩니다.

### GitHub Actions Secrets 설정

GitHub 저장소의 Settings > Secrets and variables > Actions에 아래 값을 등록합니다:

| Secret 이름 | 설명 |
|-------------|------|
| `AWS_S3_BUCKET` | S3 버킷 이름 |
| `AWS_ACCESS_KEY_ID` | AWS IAM 액세스 키 ID |
| `AWS_SECRET_ACCESS_KEY` | AWS IAM 시크릿 액세스 키 |
| `AWS_REGION` | AWS 리전 (예: `ap-northeast-2`) |
| `AWS_DISTRIBUTION_ID` | CloudFront 배포 ID |
| `REACT_APP_BACKEND_ENDPOINT_URL` | 백엔드 API 서버 주소 |
| `REACT_APP_INTRA` | 회원가입용 42 OAuth URL |
| `REACT_APP_MESSAGE_REDIRECT_URL` | 메시지 작성자용 42 OAuth URL |
| `REACT_APP_REGISTER_URL` | 회원가입 콜백 리다이렉트 URL |
| `REACT_APP_HOME` | 로그인 성공 후 리다이렉트 URL |

### CloudFront SPA 설정

React Router를 사용하므로 CloudFront에서 모든 404 응답을 `index.html`로 리다이렉트하도록 설정해야 합니다:

- Error code: `403`, `404`
- Response page path: `/index.html`
- HTTP response code: `200`

---

## 42 OAuth 연동

### 인증 흐름

```
1. 사용자가 "42 로그인" 버튼 클릭
       │
       ▼
2. REACT_APP_INTRA (또는 REACT_APP_MESSAGE_REDIRECT_URL) URL로 이동
   → 42 intra 로그인 페이지
       │
       ▼
3. 42 인증 완료 → /redirect?code={code}&type={type} 로 리다이렉트
       │
       ▼
4. RedirectPage에서 GET /user/info?code={code}&type={type} 호출
       │
       ├── type=register → 클러스터명 자동 입력 후 회원가입 페이지 이동
       └── type=message  → 메시지 작성 페이지 이동
```

### OAuth 앱 설정 시 참고 사항

42 intra에서 OAuth 앱을 등록할 때 Redirect URI를 `/redirect` 경로로 설정해야 합니다:

- 개발: `http://localhost:3000/redirect`
- 프로덕션: `https://your-domain.com/redirect`

`type` 파라미터는 OAuth URL의 `state` 또는 별도 쿼리스트링으로 전달하여 `/redirect` 페이지에서 구분합니다.

---

## DB 구조 참고

| 테이블 | 필드 |
|--------|------|
| UserTable | `userID`, `userPassword`, `userDeadline`, `userEmail` |
| UsernameTable | `userID`, `userClusterName` (unique) |
| MessageTable | `messageID` (auto), `userID`, `senderNickname`, `senderClusterName`, `messageTitle`, `messageText` |

---

## 기여 가이드

### 브랜치 전략

```
main          ← 프로덕션 (직접 push 금지)
└── feature/  ← 기능 개발
└── fix/      ← 버그 수정
```

### 개발 흐름

1. `main`에서 브랜치 생성
2. 개발 및 테스트
3. `main`으로 Pull Request 생성
4. PR 생성 시 GitHub Actions 빌드/배포 자동 실행

### 커밋 메시지

```
feat: 메시지 작성 폼 유효성 검사 추가
fix: 드래그 윈도우 z-index 오류 수정
style: 헤더 레이아웃 조정
```

---

## 라이선스

Private
