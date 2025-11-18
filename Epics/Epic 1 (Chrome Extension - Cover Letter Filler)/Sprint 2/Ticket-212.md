# TICKET-212 — CI workflow for extension build/tests

## What / Why
Add a GitHub Actions workflow to build the extension and run tests.

## Outcome
- `.github/workflows/extension.yml` (document the desired steps)

## Tests
- `tests/extension/sprint2/ticket-212/ci_plan.md`: outline the actions steps and environment matrix.

## Acceptance Criteria
- CI plan documented; future PR will add the workflow file.
- Includes caching, Node LTS, run unit tests, and artifact upload.


