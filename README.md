# Smilout - Frontend (smilout-web-fe)

The frontend project for the self-checkout system, is built with React 19, Vite and TypeScript.

## Tech Stack

- **Core:** React 19, TypeScript, Vite
- **Styling:** TailwindCSS v4, clsx, tailwind-merge
- **State Management:** React Query (TanStack Query)
- **Forms:** React Hook Form
- **Code Quality:** ESLint (Flat Config), Prettier, Husky, Lint-staged, Commitlint

## Setup requirement

- Node.js >= 18
- Package Manager: npm/pnpm/yarn

## Install & run the project

1. **Clone project:**
   ```
   git clone https://github.com/Smilout-team/smilout-web-fe-repo.git
   cd smilout-web-fe-repo
   ```
2. **Install dependencies**

   ```
   npm install
   ```

3. **Setup environment variables**

   Copy `.env.example` to `.env` and update with your credentials:

   ```
   cp .env.example .env
   ```

   Update these values in `.env`:
   - `VITE_API_BASE_URL` - Backend API URL

4. **Start development server**

   ```
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking
- `npm run test` - Run Jest tests
- `npm run prepare` - Setup Husky hooks

## Branch name and commit discription

- **Branch name:** type/JIRA-KEY-discription (Example: feat/SMILOUT-1-login)
- **Commit discription:** type(JIRA-KEY): discription (Example: feat(SMILOUT-1): add button component)
- **Type:** `feat`, `fix`, `chore`, `style`, `refactor`, `test`...
- **JIRA-KEY example:** `SMILOUT-1`
