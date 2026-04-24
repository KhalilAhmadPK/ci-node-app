# CI Pipeline — GitHub Actions

![CI](https://github.com/YOUR_USERNAME/ci-node-app/actions/workflows/ci.yml/badge.svg)

![Node.js](https://img.shields.io/badge/Node.js-22-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-29-C21325?style=for-the-badge&logo=jest&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-8-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)

A simple Node.js REST API with a full CI pipeline built on GitHub Actions. Every push triggers automated linting, testing, and a build check — no manual steps needed.

---

## What the Pipeline Does

Three jobs run automatically on every `git push` to `main`

```
git push
    │
    ├──────────────────────┐
    │                      │
 Lint                 Test
 ESLint checks        Jest on Node 22
 code quality         with coverage report
    │                      │
    └──────────┬───────────┘
               │  both must pass
               ▼
             Build
          app starts + health
          endpoint verified
```

`build` only runs if both `lint` and `test` pass. If either fails, the pipeline stops and the commit gets a red ✗.

---

## Pipeline Breakdown

### Trigger

```yaml
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
```

Runs on every push and every pull request targeting `main`.

---

### Job 1 — Lint

```yaml
- name: Run ESLint
  run: npm run lint
```

ESLint checks all files in `src/` and `tests/` against the rules in `.eslint.config.js`. Things it catches: unused variables, missing semicolons, wrong quotes, missing newlines at end of file.

---

### Job 2 — Test

```yaml
- name: Run tests with coverage
  run: npm test

```

The test job runs on Node 22. This catches version compatibility issues early. Jest runs with `--coverage` and the report gets uploaded as a downloadable artifact.

---

### Job 3 — Build

```yaml
- name: Verify app starts correctly
  run: |
    node index.js &
    sleep 3
    curl --fail http://localhost:3000/api/health
```

Installs only production dependencies, starts the app, and hits the health endpoint. If the app crashes or the endpoint returns an error, the job fails.

---

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/health` | Returns server status and uptime |

---

## Running Locally

```bash
git clone https://github.com/KhalilAhmadPK/ci-node-app.git
cd ci-node-app
npm install

npm run lint      # ESLint
npm test          # Jest with coverage
npm run build     # build check
npm start         # start the server
```

---

## Project Structure

```
ci-node-app/
├── src/
│   ├── app.js          # Express app setup
│   ├── routes.js       # API route handlers
│   └── utils.js        # Pure helper functions
├── tests/
│   ├── utils.test.js   # Unit tests
│   └── routes.test.js  # Integration tests (supertest)
├── .github/
│   └── workflows/
│       └── ci.yml      # Pipeline definition
├── eslint.config.js
└── package.json
```

---

## Key Concepts

| Concept | How it's used here |
|---------|-------------------|
| `on: push / pull_request` | Pipeline triggers on code changes |
| `runs-on: ubuntu-latest` | GitHub's free cloud runner |
| `npm install` | Install Dependencies |
| `needs: [lint, test]` | Build job waits for both jobs to pass |
| `upload-artifact` | Coverage report saved after each run |
| `cache: npm` | `node_modules` cached between runs for speed |

---

## Author

**[Khalil Ahmad]** — [GitHub](https://github.com/KhalilAhmadPK) · [LinkedIn](https://linkedin.com/in/)

---