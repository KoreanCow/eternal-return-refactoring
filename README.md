# ERGG-Refactoring

|                                           |                                           |
| :---------------------------------------: | :---------------------------------------: |
| ![사진1](/public/ReadMeImages/MainKR.png) | ![사진2](/public/ReadMeImages/MainJP.png) |

**_이터널리턴_** 랭킹 전적 검색 프로젝트입니다.

# 기술 스택

- TypeScript
- Next.js 14
- next-intl

기술 선정 이유

- Next js 연습 및 활용 중점
- 라이브러리를 이용하지않은 기본기를 위함
- next-intl을 이용하여 다국어 서비스 지원

# 배포

- Vercel

# 이용

|                                           |                                           |
| :---------------------------------------: | :---------------------------------------: |
| ![사진1](/public/ReadMeImages/UserKR.png) | ![사진2](/public/ReadMeImages/UserJP.png) |

|                                             |                                             |
| :-----------------------------------------: | :-----------------------------------------: |
| ![사진1](/public/ReadMeImages/DetailKR.png) | ![사진2](/public/ReadMeImages/DetailJP.png) |

# 신경 쓴 부분

1. 이터널리턴의 시즌 정보를 스토어에 저장
   ContextAPI 부분 자체에서 통신을 진행 해서 저장함
   -> 큰 규모의 프로젝트라 생각 되지않아 ContextAPI 및 Provider 작성 부분에서 직접적인 통신 및 관리 하는 것이 간단하고 효율적이라 생각함
   -> 유지 보수의 용이함
2. 랭킹 부분
   UserRanking 훅을 이용해 1000개의 랭킹 데이터를 가져올 때,
   서버 사이드 렌더링을 통해 서버단에서 데이터를 처리해 클라이언트에 전달 함으로 클라이언트에서 추가적인 데이터 처리 부담이 적어짐
3. 데이터 페칭 훅
   API 요청을 통해 데이터를 받아올 때 대부분의 같은 형태로 받기 때문에
   훅의 파라미터를 주소, 타입 등을 주어 코드의 재사용성을 높임

# 리팩토링 요소

1. Suspence와 Fallback을 이용한 렌더링
   데이터 페칭 및 로딩관리를 Suspense, Fallback 을 이용하여 관리하기
   -> useUserNum훅의 값을 Promise의 형태로 반환
   -> UserInfo의 프롭스를 Promise 형태로 전달
   -> Promise Result 의 값을 가져오는데 실패함
   이 부분에서 추후 리팩토링이 필요함
2. 다른 언어 및 주소 접근시 리다이렉팅 필요
