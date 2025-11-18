# Risks & Assumptions

## Risks
- Platform variance: DOM and input behaviors differ across job sites; injection may be blocked or throttled.
- Evidence availability: Paywalls or dynamic content may limit quote extraction.
- Cost drift: Research + generation calls can exceed budgets without guardrails.
- Style false positives/negatives: Evaluation thresholds may misclassify; override path required.
- Permissions friction: FS Access and host permissions may confuse users; require clear onboarding.

## Mitigations
- Split per-platform adapters, throttled typing, and clipboard fallback.
- Manual “Add link/quote” fallback in approval.
- Per-job token budgets, strictness modes, caching.
- Composite style score with hover breakdown and override dialog.
- First-run wizard and options page with allowlist guidance.

## Assumptions
- Users can choose a save folder from an extension page (not content scripts).
- Evidence quotes are short verbatim excerpts with links for fair use.
- Read-only research defaults; users approve before any export/injection.


