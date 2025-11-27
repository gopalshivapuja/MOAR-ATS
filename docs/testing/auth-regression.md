# Manual Auth Regression Suite
_Last run: 2025-11-27 · Owner: Dana (QA)_

## Scope
Validates the Story 1.3 backlog items that required manual verification:
- Session persistence after refresh
- Protected route enforcement
- Logout flow and cache clearing

## Environment
- Local dev server: `npm run dev`
- Test account: `qa-regression@moar-ats.dev`
- Browser: Chrome 131 (Incognito)

## Execution Log
| Scenario | Steps | Expected Outcome | Result |
| --- | --- | --- | --- |
| Session persists after refresh | 1. Log in via `/login` with credentials. 2. Navigate to `/recruiter/dashboard`. 3. Refresh the page twice. | User remains authenticated, session tokens reused, no redirect to `/login`. | ✅ Pass |
| Session timeout guard | 1. Reduce `NEXTAUTH_SESSION_MAX_AGE` to 30s in `.env.local`. 2. Log in and idle for 45s. 3. Attempt navigation. | User redirected to `/login?error=session_expired`. | ✅ Pass |
| Protected route redirect | 1. Log out. 2. Visit `/recruiter/dashboard` directly. | Middleware redirects to `/login?callbackUrl=/recruiter/dashboard`. | ✅ Pass |
| API access without tenant context | 1. Clear cookies. 2. `curl` `/api/candidates`. | JSON error `{ code: TENANT_CONTEXT_MISSING }` with HTTP 403. | ✅ Pass |
| Logout clears session | 1. Log in. 2. Click “Logout”. 3. Visit `/api/auth/session`. | Session endpoint returns `{ user: null }`. Protected routes redirect to `/login`. | ✅ Pass |

## Findings
- Middleware correctly rehydrates tenant context after refresh, so Prisma tenant filtering and RLS continue functioning.
- Expired tokens follow the expected UX flow (toast + redirect).
- No additional defects were observed; rate limiting work (Action Item #1) now covers brute-force protection.

## Follow-Up
- Keep this checklist in the sprint retro to ensure future epics rerun it whenever authentication code changes.

