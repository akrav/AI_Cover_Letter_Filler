# TICKET-212 — CI plan

Pipeline steps:
- Checkout
- Setup Node LTS + npm cache
- Install deps (if package.json present)
- Lint (if present)
- Build (if present)
- Upload extension artifacts from `extension/dist`

Matrix:
- OS: ubuntu-latest (expand later)
- Node: lts/*


