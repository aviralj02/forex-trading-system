# 💹 Forex Trading System

- The system offers users to perform essential functions such as topping up their accounts, accessing live FX conversion rates, executing currency conversions, and reviewing account balances.

## 🧑‍💻 Tech Stack

- [![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)

- [![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

* [![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

## Installation

- Clone the repository

```bash
$ git clone https://github.com/aviralj02/forex-trading-system.git
```

- Install NPM Packages

```bash
$ npm install
```

- Create a .env file and fill up the following details. You may also refer to [.env.example](./.env.example)

```
MONGO_URL=
ALPHAVANTAGE_API_KEY=
```

- Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Routes and Description

1. Top Up Account API

- Endpoint: POST /accounts/topup
- Request body:

```bash
{ "currency": "USD", "amount": 100 }
```

- Description: This API allows users to top up their account with a specified amount in a given currency.

2. FX Rate API

- Endpoint: GET /fx-rates
- Description: The system fetches live FX conversion rates from [alphavantage.co](<(https://www.alphavantage.co)>) and stores
  them in memory.
- Each rate is valid for 30 seconds.
- This API fetches live FX conversion rates from memory
  stored in STEP 1.
- The system generates a quoteId and sends it in the response to the
  client.
- Response:

```bash
{"quoteId": "12345", expiry_at: "12345"}
```

**NOTE: Considering AlphaVantage API does not provide an endpoint to have all exchange rate in a single fetch, this project only fetches the 3 most relevant exchange rates:**
**1. USD/JPY**
**2. USD/INR**
**3. USD/EUR**

4. FX Conversion API

- Endpoint: POST /fx-conversion
- Request body: { "quoteId": "12345", "fromCurrency": "USD",
  "toCurrency": "EUR", "amount": 100 }
- Description: This API performs an FX conversion using the provided
  quoteId and converts the specified amount from one currency to
  another.
- Response:

```bash
{ "convertedAmount": 90.53, "currency": "EUR"}
```

4. Balance API

- Endpoint: GET /accounts/balance
- Description: This API retrieves the balances in all currencies for the
  user's account.
- Response:

```bash
{ "balances": { "USD": 1000, "EUR": 500, "GBP": 300 } }
```

## API Documentation

The Forex Trading System provides comprehensive API documentation using [Swagger](https://swagger.io/). Visit the Swagger UI interface at http://localhost:3000/api to explore and interact with the available endpoints.
