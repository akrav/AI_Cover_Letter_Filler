# Approval UI Spec — Right-Side Panel (Simplify-style)

## Layout
- Right-side floating panel docked to the viewport, width ~360–420px.
- Sticky header with product name and actions; body scrolls independently from page.
- High-contrast, clean spacing similar to the screenshots provided.

## Placement & Behavior
- Injected by the content script and rendered over the page (z-index above content).
- Panel can be collapsed/expanded; position persists per tab.
- “Autofill All” primary action at the top of the panel.
- Status badges (e.g., “Autofill complete”) and subtle progress indicators per section.
- Remaining character counter when a field is focused (reads maxlength if present); truncation preview (smart ellipsis) prior to injection.

## Sections
1) Detect & Prepare
   - Show platform/site detection result.
   - Button: “Start analysis” → triggers JD parse + company resolution.
2) Variables (Cover Letter)
   - Table columns:
     - Variable
     - Quote (inline excerpt) + “open” icon to source URL
     - URL (shortened)
     - Rationale (one-liner)
     - Draft (readonly in this ticket)
     - Final (editable in follow-ups)
     - Approve (checkbox)
   - Inline edit and persistence handled in a split ticket.
   - When a site field is focused, show remaining characters (if detectable) and warn for long outputs.
3) Q&A (later sprints)
   - Similar table: Question | Retrieved | Citations | Draft | Final | Approve.
4) Style Badge
   - Shows composite style match score; hover reveals signal breakdown (later sprint).
5) Export
   - Buttons: “Export DOCX”, “Export PDF”.
   - Save folder hint (chosen in options) with a “Change” link.
   - Offline indicator (if cached-only mode enabled); warning when freshness is low.

## Interactions
- “Autofill All” generates candidates and fills Draft/Final cells, but requires approval per variable.
- Approve toggles enabled only when evidence quotes and URLs are present.
- Inline edits (separate ticket) reset approval to “needs review.”

## Accessibility
- Keyboard navigation across rows and columns.
- ARIA labels for buttons and cells.
- High-contrast mode toggle in options.

## Visual Notes
- Inspired by Simplify’s right-docked panel:
  - Compact spacing, clear sections, minimal chrome.
  - Non-blocking overlay; page content remains usable.


