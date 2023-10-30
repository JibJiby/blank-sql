# Blank SQL

SQL 을 처음 공부하는 사람이 **빈칸 채우는**  방식으로 복습 도와주는 서비스

&nbsp;&nbsp;

## 🖥️ Screenshot

<p align="center">
  <img src="images/screenshot_01.png" alt="main page screenshot" width="600px"/>
</p>

&nbsp;



<p align="center"><img src="images/screenshot_02.png" alt="screenshot_01" /></p>

&nbsp;

&nbsp;

## ⚙️ Stack

- Typescript
- React
- NextJS (Next-Auth)
- Tanstack/react-query
- TailwindCSS
- Shadcn/ui (radix-ui)
- Prisma
- MySQL (Planetscale)
- Zod
- Ace-builds
- Tsyringe

&nbsp;

&nbsp;

## 🗂 구조

```bash
.
├── prisma  # DB ORM
│   ├── migrations
│   ├── schema.prisma
│   └── seed.ts
├── public  # static files
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── favicon-96x96.png
│   ├── favicon.ico
│   └── mockServiceWorker.js
├── src     # main source code
│   ├── components  # 컴포넌트
│   │   ├── ui      # shadcn/ui 재사용 UI 컴포넌트
│   │   └── ...     # 이외 프로젝트 내 커스텀 컴포넌트
│   ├── hooks
│   │   ├── query   # react-query 관련 hook
│   │   └── ...     # 이외 client-side custom hook
│   ├── instrumentation.ts  # (⚠️ experimental)
│   ├── layouts     # layout 컴포넌트
│   ├── lib         # utility functions
│   ├── middleware.ts
│   ├── mocks       # MSW mocking files
│   ├── models      # database entity model (for prismaORM)
│   ├── pages       # NextJS 페이지
│   ├── server      # DI container & domain services
│   ├── styles      # style file (.css)
│   ├── tests       # test
│   └── types       # typescript declaration type
```



* 참고

따로 server 디렉토리로 나누어 하위에 `[__도메인__].service.ts` 로 분리한 이유는 추후 서버 프레임워크로 구조 그대로 마이그레이션 하기 용이하도록 구성

&nbsp;

&nbsp;

## Get Started

### 🚀 Installation

```bash
yarn
```

&nbsp;

### 🔒 환경 변수 세팅

```bash
cp .env.example .env.local
```

example 환경 변수 파일을 복사해서 local 환경 변수 파일을 생성해줍니다. google oauth 프로젝트 세팅 후 client_id 와 client_secret_key 를 입력해줍니다. 

그리고 NextAuth.js 에 필요한 NEXTAUTH_URL 값과 NEXTAUTH_SECRET 값을 입력해줘야 합니다. 

&nbsp;

#### 예시

예시로 로컬에서는 아래와 같이 입력해주었습니다. 

&nbsp;

* **NEXTAUTH_SECRET**

jwt 토큰을 encrypt 하는데 사용하는 키 생성은 `openssl` 으로 생성해주었습니다. (암호화 알고리즘은 원하시는대로 정하셔서 키 생성해주시면 됩니다)

```bash
openssl rand -base64 64
```

&nbsp;

* 구글 OAuth 로그인

[구글 로그인 설정 방법](https://notspoon.tistory.com/45) 을 통해서 OAuth Client ID 와 보안 비밀번호를 환경 변수에 입력해줍니다. (프로젝트 생성 -> OAuth Callback URL 설정 -> ... )

```
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

&nbsp;

그리고 `DATABASE_URL` 환경 변수는 아래 도커 세팅에서 추가하도록 합니다.

&nbsp;

* **정리**

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET= [위에서 생성한 값]

GOOGLE_CLIENT_ID= [OAuth Client ID 값]
GOOGLE_CLIENT_SECRET= [OAuth Client 보안 비밀번호]

DATABASE_URL= [아래에서 세팅]
```



&nbsp;

### 📦 local DB 세팅

사전에 `docker` , `docker-compose` 설치가 필요합니다

&nbsp;

#### prisma 초기 세팅

```bash
npx prisma init --datasource-provider mysql
```

&nbsp;

#### .env 파일 환경변수 입력

초기 세팅 cli 명령으로 .env 파일 생성되었습니다. 하지만, dev 로 실행될 때는 `.env.local` 파일이 읽혀지기 때문에 주의해주세요. `.env.local` 에 아래 값을 넣어줍니다.

```dotenv
DATABASE_URL=mysql://root:password@localhost:3306/blanksql
```

&nbsp;

#### docker compose

```bash
docker-compose up -d
```

종료할 때는 `down` 으로 정리해주면 됩니다.

&nbsp;

#### 실행중인 docker container 확인

```bash
docker ps
# container 삭제 : docker rm [CONATINER_ID]
# 재시작 : docker start [CONATINER_ID]
```

&nbsp;

#### 마이그레이션 진행

```bash
npx prisma migrate dev --name init
```

결과로 `\<project_root\>/prisma/migrations` 하위에 마이그레이션 파일들이 생성됩니다.

마찬가지로, 스키마 생성 및 변경시에도 동일합니다.

```bash
npx prisma migrate dev --name add_new_table 
```

&nbsp;

#### 마이그레이션 반영

```bash
npx prisma db push
```

&nbsp;

#### DB 확인

```bash
npx prisma studio
```

&nbsp;&nbsp;

#### seeding

`/prisma/seed.ts` 스크립트 파일에 seeding 할 로직을 추가한 다음, 아래 스크립트를 실행해줍니다.

```bash
yarn seed
```

&nbsp;

&nbsp;

### Planetscale 세팅

> Notice
>
> 로컬에서는 Planetscale 설정 생략하셔도 됩니다

&nbsp;

planetscale 에서 DB 생성 후 .env 를 수정한 다음에

```bash
npx prisma db push
```

하면 아래와 같이 생성된걸 확인할 수 있다.



<img src="images/image-20231017173346118.png" alt="planetscale-tables" style="zoom:50%;" />

&nbsp;

&nbsp;&nbsp;&nbsp;

## 🤦🏻 Troubleshooting

* decorator 관련 prettier import sort

`.prettierrc` 옵션 ()

```json
{
	 "importOrderParserPlugins": ["typescript", "decorators-legacy", "jsx"],
}
```

순서 중요함 (이외에도 decorator 관련 tsconfig 설정 필수!)

&nbsp;

* lucide-react 관련 serverless 500 error



NextJS SSR API 중 getServerSideProps 에서 발생했던 오류 메시지는 아래와 같음

```
[Error: EMFILE: too many open files, open '/var/task/node_modules/lucide-react/dist/esm/icons/server-crash.mjs'] {
  errno: -24,
  code: 'EMFILE',
  syscall: 'open',
  path: '/var/task/node_modules/lucide-react/dist/esm/icons/server-crash.mjs',
  page: '/admin/quiz'
}
Error: Runtime exited with error: exit status 1
Runtime.ExitError
```

[관련 이슈](https://github.com/phosphor-icons/react/issues/45) 에 따르면, NextJS 최신 버전 업그레이드를 통해 해결할 수 있다고 한다. `next@^13.5.6` 으로 의존성 버전 변경 후 에러 해결됨.

&nbsp;

&nbsp;
