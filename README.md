# New-blanksql

## Description

간단하게 SQL 공부를 하기 위한 도구

&nbsp;&nbsp;

## Screenshot

<p align="center">
  <img src="https://github.com/JibJiby/new-blanksql/assets/24295703/0301547e-9458-4cd0-bff4-9d978411b37e" alt="main page screenshot" width="600px"/>
</p>

&nbsp;&nbsp;

## Installation

```bash
yarn
```

&nbsp;&nbsp;

## MSW 과 같이 실행하는 방법

DB 없이 Service Worker 로만 실행해보는 방법입니다.
`before/clerk`  브랜치에서 진행해주세요.

```bash
git checkout before/clerk
```

&nbsp;

1. .env.local 파일 생성

프로젝트 최상단에 `.env.local` 파일을 생성해줍니다.

```bash
touch .env.local
```

&nbsp;

2.환경 변수 NEXT_PUBLIC_API_MOCKING 선언

```bash
echo 'NEXT_PUBLIC_API_MOCKING=enabled' > .env.local
```

&nbsp;

3.설치 및 실행

우선 의존성 패키지를 설치하고, 실행 스크립트를 실행합니다. 개발자 도구에 `MSW` 로 시작한 콘솔이 찍혔다면 msw가 정상적으로 돌아가는 겁니다.

```bash
yarn
yarn dev
```

&nbsp;

## local DB 세팅

Mocking이 아닌 DB 세팅 후 실행하기 위한 절차입니다.
사전에 `docker` , `docker-compose` 설치가 필요합니다.

&nbsp;

* prisma 초기 세팅

```bash
npx prisma init --datasource-provider mysql
```

&nbsp;

* .env 파일 환경변수 입력

초기 세팅 cli 명령으로 .env 파일 생성되었습니다. 해당 파일에 아래 값을 넣어줍니다.

```dotenv
DATABASE_URL=mysql://root:password@localhost:3306/blanksql
```

&nbsp;

* docker compose

```bash
docker-compose up
```

종료할 때는 `down` 으로 정리해주면 됩니다.

&nbsp;

* 실행중인 docker container 확인

```bash
docker ps
# container 삭제 : docker rm [CONATINER_ID]
# 재시작 : docker start [CONATINER_ID]
```

&nbsp;

* 마이그레이션 진행

```bash
npx prisma migrate dev --name init
```

결과로 `\<project_root\>/prisma/migrations` 하위에 마이그레이션 파일들이 생성됩니다.

&nbsp;

마찬가지로, 스키마 생성 및 변경시에도 동일합니다.

```bash
npx prisma migrate dev --name add_new_table 
```

&nbsp;

* 마이그레이션 반영

```bash
npx prisma db push
```

&nbsp;

* DB 확인

```bash
npx prisma studio
```

&nbsp;&nbsp;

## seeding

`/prisma/seed.ts` 스크립트 파일에 seeding 할 로직을 추가한 다음, 아래 스크립트를 실행해줍니다.

```bash
yarn seed
```



## Planetscale

planetscale 에서 DB 생성 후 .env 를 수정한 다음에

```bash
npx prisma db push
```

하면 아래와 같이 생성된걸 확인할 수 있다.



<img src="/Users/jiby/Documents/GitHub/nextjs/next-proj/blanksql/blanksql-front/assets/image-20231017173346118.png" alt="planetscale-tables" style="zoom:50%;" />



&nbsp;&nbsp;

## TroubleShooting

* decorator 관련 prettier import sort

`.prettierrc` 옵션 ()

```json
{
	 "importOrderParserPlugins": ["typescript", "decorators-legacy", "jsx"],
}
```

순서 중요함 (이외에도 decorator 관련 tsconfig 설정 필수!)



