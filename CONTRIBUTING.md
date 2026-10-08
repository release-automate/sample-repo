# Contributing to user-service

## Branch naming — IMPORTANT

This repo uses automated JIRA integration. Branch names **must** follow the
convention below for ticket transitions to work automatically.

| Branch type | Pattern | Example |
|---|---|---|
| Feature | `feature/PROJ-{id}-short-desc` | `feature/PROJ-123-add-user-avatar` |
| Defect / Bug | `defect/PROJ-{id}-short-desc` | `defect/PROJ-456-fix-email-validation` |
| Release | `release/v{major}.{minor}.{patch}` | `release/v1.3.0` |

**What happens automatically:**

```
You create branch feature/PROJ-123-*
        ↓  (within ~30 seconds)
JIRA PROJ-123 moves to "In Progress"

You merge a PR to main  (PR title or body must mention PROJ-123)
        ↓
JIRA PROJ-123 moves to "Ready for Testing"

QA approves → JIRA moves to "Ready to Accept"
        ↓
Confluence release page is auto-generated with risks and sign-off checklist

You push release/v1.3.0
        ↓
JIRA PROJ-123 moves to "Accepted"
```

## PR title convention

Always include the JIRA ticket ID in your PR title:

```
[PROJ-123] Add user avatar upload endpoint
```

Or in the PR body:
```
Closes PROJ-123
```

## Workflow overview

```
main ──────────────────────────────────────────────► main
  │                                                    ▲
  └─► feature/PROJ-123-add-avatar                     │
            │                                          │
            │  (work, commits)                         │
            │                                          │
            └──────────── PR ──────────────────────────┘
                          │
                          └─► release/v1.3.0 ──► deployed ──► PROJ-123 Accepted
```
