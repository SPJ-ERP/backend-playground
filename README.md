## Initial Project Setup

### 1. Installing Dependencies

```bash
npm install bcrypt@^6.0.0 dotenv@^17.3.1 drizzle-orm@^0.45.1 express@^5.2.1 pg@^8.20.0
npm install -D nodemon@^3.1.14
```

### 2. Create project structure

```bash
.
├── drizzle
├── node_modules
├── src
│   ├── config
│   ├── controller
│   ├── database
│   │   ├── schema
│   │   └── seeder
│   ├── middlewares
│   ├── repository
│   ├── routes
│   ├── utils
│   └── validators
├── .dockerignore
├── .env
├── .env.example
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── drizzle.config.js
├── index.js
├── package.json
├── package-lock.json
└── README.md
```

### 3. Setup project .env

```bash
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=
```

### 4. Setup project .dockerignore

```bash
node_modules
npm-debug.log
.env
.git
.gitignore
README.md
.DS_Store
*.md
.vscode

Dockerfile
docker-compose.yml
```

## Cloned Project Setup

### 1. Copy the `.env.example` file and set the values

```bash
cp .env.example .env
```

Open the `.env` file and fill in the required environment variable values.

### 2. Install dependencies

```bash
npm install
```

### 3. Generate the database schema

```bash
npm run db:generate
```

### 4. Run database migrations

```bash
npm run db:migrate
```
