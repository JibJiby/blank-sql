## Description
간단하게 SQL 공부를 하기 위한 도구

&nbsp;&nbsp;

## Screenshot
<p align="center">
  <img src="https://github.com/JibJiby/new-blanksql/assets/24295703/0301547e-9458-4cd0-bff4-9d978411b37e" alt="main page screenshot" width="600px"/>
</p>

&nbsp;&nbsp;

## MSW 과 같이 실행하는 방법

`before/clerk`  브랜치에서 진행해주세요

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

2. 환경 변수 NEXT_PUBLIC_API_MOCKING 선언

```bash
echo 'NEXT_PUBLIC_API_MOCKING=enabled' > .env.local
```

&nbsp;

3. 설치 및 실행

우선 의존성 패키지를 설치하고, 실행 스크립트를 실행합니다. 개발자 도구에 `MSW` 로 시작한 콘솔이 찍혔다면 msw가 정상적으로 돌아가는 겁니다.

```bash
yarn
yarn dev
```
