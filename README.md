# taxi-dispatch-system

> MVP REST API for TDS (Taxi Dispatch System)

## Getting started

### Prerequisites

* [node.js](https://nodejs.org/) 12+ (LTS recommended)
  * (optional) [nvm](https://github.com/nvm-sh/nvm) node version manager:

```bash
nvm install v12
nvm use v12
```

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
* JWT Authorization (Login with jwt)
  * Copy response value(token) when join (`/auth/join`) or login (`/auth/login`) from swagger (or from any browser)
  * Click `Authorize` button at the top-right corner from swagger ui
  * Paste token(`ey...`) to the area labeled jwt (apiKey) Value and press Authorize button

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
  * http://localhost:8080/
