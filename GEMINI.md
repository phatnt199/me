# Project Context: Personal Portfolio

This repository contains the source code for a personal portfolio website. It appears to be in a transition phase, migrating from a legacy Flutter application to a modern React-based web application.

## 1. Project Overview & Tech Stack

*   **Active Frontend:** React 19, TypeScript, Vite, Tailwind CSS (v4), Framer Motion.
*   **Legacy Frontend:** Flutter (Dart) - located in `bk/flutter_project`.
*   **Infrastructure:** Docker, Docker Compose.
*   **Package Manager:** **Bun** is preferred by the user (though existing scripts use `npm`).

## 2. Directory Structure

*   **`react_project/`**: The main, active codebase for the portfolio.
    *   Configuration: `vite.config.ts`, `tailwind.config.js` (implied/v4), `tsconfig.json`.
    *   Source: `src/` (Components, Hooks, Context, Data).
*   **`bk/`**: Backup directory containing the legacy `flutter_project`.
*   **`deployment/`**: Deployment scripts and configurations.
*   **`docker-compose.yml`**: Defines the `portfolio` service using `dockerfile-react-app`.

## 3. Critical Findings & Discrepancies

### ⚠️ Build Output Mismatch (Action Required)
*   **Issue:** The project uses Vite, which by default outputs build artifacts to `react_project/dist/`.
*   **Conflict:** 
    *   `build.sh` (root) and `deployment/build.sh` reference `react_project/build/`.
    *   `docker-compose.yml` mounts `./react_project/build:/build`.
*   **Consequence:** The Docker container and deployment scripts will likely fail or serve an empty directory because `build/` does not exist after running `vite build`.
*   **Resolution:** Future tasks should update scripts/config to use `dist/` or configure Vite to output to `build/`.

### ⚠️ Package Manager Inconsistency
*   **Issue:** `build.sh` and `deployment/build.sh` use `npm install` and `npm run build`.
*   **Convention:** The user explicitly prefers **Bun**. Future interactions and script updates should utilize `bun`.

## 4. Development Workflow

### Prerequisites
*   Runtime: Bun (Node.js compatible)
*   Docker (optional for local dev, required for deployment simulation)

### Key Commands

| Action | Command | Notes |
| :--- | :--- | :--- |
| **Install Dependencies** | `cd react_project && bun install` | |
| **Start Dev Server** | `cd react_project && bun run dev` | Runs on `http://localhost:5173` |
| **Build for Production** | `cd react_project && bun run build` | Outputs to `dist/` (See Mismatch above) |
| **Lint Code** | `cd react_project && bun run lint` | Uses ESLint |
| **Run Docker** | `docker-compose up` | **Warning:** Requires fixing the build volume mapping first. |

## 5. Deployment Logic
The deployment process appears to be:
1.  `build.sh` pulls changes, cleans `build` (incorrectly), and runs build.
2.  `deployment/build.sh` copies artifacts to a deployment folder and prepares a start script.
3.  The Docker container uses `serve` to host the static files.
