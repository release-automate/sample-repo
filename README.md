# user-service

Sample microservice used to demonstrate the release automation POC.

## What this repo demonstrates

This is one of the **20 caller repos**. The only release automation file here is:

```
.github/workflows/release-automation.yml   ← the ONE file per repo
```

Everything else (JIRA transitions, Confluence page generation, OpenAI) lives in the
`release-automation` hub repo.

## Development setup

```bash
pnpm install
pnpm dev      # starts on :3001
pnpm test
```

## API

```
GET  /health       → { status, version }
GET  /users        → list all users
GET  /users/:id    → get one user
POST /users        → create user  { name, email }
```

## POC walkthrough — test all four flows

### Flow 1 — Create a feature branch

```bash
git checkout main
git pull

# Branch name MUST follow: feature/PROJ-{id}-description
git checkout -b feature/PROJ-123-add-user-avatar
git push -u origin feature/PROJ-123-add-user-avatar

# ✅ Check GitHub Actions → "Flow 1 — In Progress" workflow
# ✅ Check JIRA PROJ-123 → should be "In Progress" within 30 seconds
```

### Flow 2 — Merge a PR to main

```bash
# Make a small change on the feature branch
echo "// PROJ-123: avatar support" >> src/index.ts
git add .
git commit -m "[PROJ-123] Add placeholder for avatar endpoint"
git push

# Open a PR on GitHub:
#   Title:  [PROJ-123] Add user avatar upload endpoint
#   Base:   main
#   Merge it (squash or merge commit — both work)

# ✅ Check GitHub Actions → "Flow 2 — Ready for Testing" workflow
# ✅ Check JIRA PROJ-123 → should be "Ready for Testing"
```

### Flow 3 — Generate Confluence release doc

```bash
# QA approves the ticket in JIRA → moves it to "Ready to Accept"
# (This triggers the JIRA webhook → Express server in the hub repo)

# ✅ Check Confluence → a new release page should appear
# ✅ Check JIRA PROJ-123 → a comment with the Confluence URL
```

### Flow 4 — Deploy a release branch

```bash
git checkout main
git pull

# Create a release branch — must follow: release/v{major}.{minor}.{patch}
git checkout -b release/v1.3.0
git push -u origin release/v1.3.0

# ✅ Check GitHub Actions → "Deploy" and "Flow 4 — Accepted" workflows
# ✅ Check JIRA PROJ-123 → should be "Accepted"
```

## Branch naming rules

See [CONTRIBUTING.md](./CONTRIBUTING.md) for full branch naming conventions.
