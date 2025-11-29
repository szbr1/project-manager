# Express TS server Setup Guide (pnpm + ESM)

## Prerequisites
- Node.js 18+
- pnpm 8+

## Step-by-Step Setup

### 1. Initialize Project
```bash
mkdir server && cd server
pnpm init
```

### 2. Install Dependencies
```bash
pnpm add express cors dotenv
pnpm add -D typescript @types/node @types/express @types/cors tsx nodemon
```

### 3. Create Project Structure
```bash
mkdir src && touch src/script.ts .env
```

### 4. Generate & Configure tsconfig.json
```bash
npx tsc --init
```
**Update to ESM config:**
```json
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist",
    "module": "ESNext",
    "target": "ES2022",
    "moduleResolution": "node",
    "lib": ["ES2022"],
    "types": ["node"],
    "strict": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "skipLibCheck": true,
    "sourceMap": true
  }
}
```

### 5. Update package.json
```json
{
  "type": "module",
  "main": "dist/script.js",
  "scripts": {
    "dev": "nodemon --watch src --ext ts --exec tsx src/script.ts",
    "build": "tsc",
    "start": "node dist/script.js"
  }
}
```

### 6. Create src/script.ts
```typescript
import express from "express";
import cors from "cors";
import { config } from "dotenv";

config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("server working fine 💓")
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
```

### 7. Run Server
```bash
pnpm run dev
```

## Final Structure
```
server/
├── src/
│   └── script.ts
├── .env
├── tsconfig.json
```

**Visit In Browser** `http://localhost:8000`