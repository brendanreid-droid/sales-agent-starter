# Workspace Rules — Sapia.ai Sales Agent Team

## Spelling Standards
* **Australian English ONLY:** All markdown files, code comments, PDF templates, and documentation in this workspace must be written using Australian English spelling.
* **Key Replacements:**
  * Use **s** instead of **z** for verbs (e.g., *analyse*, *optimise*, *organise*, *prioritise*, *categorise*, *utilise*).
  * Use **our** instead of **or** (e.g., *behaviour*, *labour*, *colour*, *neighbour*).
  * Use **double l** for suffixes (e.g., *modelling*, *travelling*).
  * Use **ce** for nouns, **se** for verbs (e.g., *licence* (noun) vs *license* (verb), *practice* (noun) vs *practise* (verb)).
  * Use **defence** and **offence** (not *defense* and *offense*).
  * Use **programme** for schemes/initiatives (though *program* is acceptable for computer software).

## Output File Organisation
* **Every account's outputs for one working batch share a single dated session folder**, not a flat dump into `02-Accounts/`: `02-Accounts/YYYY-MM-DD/{CompanyName}_Brief.md`, `02-Accounts/YYYY-MM-DD/{CompanyName}_Email{N}_Draft.md`.
* **The folder date is the session's start date**, i.e. the day the Company Researcher first ran for that batch of accounts, not the day each individual file was written. If copywriting for that same batch happens on a later day (e.g. research Monday, copy Tuesday), the emails still go into the research day's folder, not a new one.
* **Before drafting emails for a company, find its existing brief first** (search `02-Accounts/*/{CompanyName}_Brief.md`) and write the email draft(s) into that same dated folder. Only create a new dated folder when starting a genuinely new research batch with no existing brief to anchor to.
* Before writing, check whether a same-named file already exists in that session's folder from an earlier run, if so, append rather than overwrite, so a second run doesn't clobber the first.
