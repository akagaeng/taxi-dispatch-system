# taxi-dispatch-system

> MVP REST API for TDS (Taxi Dispatch System)

## Getting started

### Prerequisites

* [node.js](https://nodejs.org/) 12+ (LTS recommended)
  * (optional) [nvm](https://github.com/nvm-sh/nvm) node version manager 
* [sqlite](https://www.sqlite.org/download.html)

```bash
brew install sqlite3
```

* [yarn](https://classic.yarnpkg.com/en/docs/install)

```bash
brew install yarn
```

### Setup

* copy `.env`
```bash
cp .env.example .env

# edit values
```
* install node modules
```bash
yarn
```

### Getting started

* Run server

```bash
yarn start
```

* Open swagger UI
  * http://localhost:8080/
* jwt 토큰으로 로그인하는 방법
  * 회원가입 (`/auth/join`) 또는 로그인 (`/auth/login`) 후 나오는 토큰 값 복사
  * swagger ui 우측 상단의 `Authorize` 버튼 클릭
  * jwt  (apiKey) Value: 에 위에서 얻은 토큰(`ey...`) 을 붙여넣고 Authorize 버튼 입력

## HTTP response code

* 200: OK
* 401: Unauthorized
* 409: Conflict - User already exists
* 419: Token expired
* 404: Not found
* 500: Internal server error

## Resources

![db modeling](docs/db.png)

### Database design
* [Database diagram](https://dbdiagram.io/d/5fd9d0d79a6c525a03bb4524)

### API design
* [Brief api design](api_list.md)
* API spec (Swagger UI)
  * [Localhost](http://localhost:8080/)
