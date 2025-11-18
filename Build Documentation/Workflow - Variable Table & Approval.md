# Workflow — Variable Table & Approval Gate

## Variable Table (per job session)
For each template variable, we require:
- Variable Key
- Evidence Quote (verbatim text)
- Source URL (canonical link)
- Rationale (why this quote justifies the fill)
- Draft (LLM-proposed content constrained to evidence + JD)
- Final (post-approval, in user’s style and voice)

## Steps
1) Extract variables from the template (e.g., {{company_mission}}, {{recent_news}}, {{role_fit}}).
2) Gather evidence (search + optional crawl) → capture quotes + URLs.
3) Build candidate fills per variable, strictly grounded in evidence and the JD.
4) Present approval UI in extension:
   - Inline quote preview with link out
   - Edit Draft → produce Final (or accept as-is)
   - Mark Approved
5) Only after all required variables are Approved → render template to DOCX/PDF.
6) Save to chosen folder:
   - Folder: `<Company Name>/`
   - Files: `<UserFirstName>'s <CompanyName> Cover Letter.docx/.pdf`
   - Include `evidence.json` for reproducibility.

## Failure Handling
- Missing evidence: prompt user to provide a link or relax strictness level.
- Ambiguous company info: show multiple quotes; require user to pick one.
- Job detection fails: allow manual paste of JD and company site.


