# The agents: what each one does

Eight agents. One coordinates, seven do the work. You only ever talk to the coordinator.

You do not need to memorise any of this. Ask for an outcome ("research these five accounts and draft outreach") and the Sales Director works out who to call. This page is for when you want to know what is happening under the bonnet, or you want to call one specialist directly.

---

## How the team is wired

```
                          YOU
                           |
                   SALES DIRECTOR            (the only one you talk to)
                           |
   +--------+--------+-----+-----+--------+--------+
   |        |        |           |        |        |
Research   ICP    Company    Prospect  Copy-    Reply    GTM Action
Analyst   Scorer  Researcher  Hunter   writer   Handler   Thinker
   |        |        |           |        |        |
 finds    scores  researches   finds    writes  handles
accounts  them     them      contacts  emails   replies
```

The Sales Director can run several specialists at once. Researching five accounts happens in parallel, not one after another.

---

## Sales Director

**The orchestrator. This is who you are talking to in every session.**

It loads automatically from `CLAUDE.md` the moment you open a Claude Code session in this folder, so you never dispatch it.

What it does:

- Decides which specialists a request needs, and runs them in parallel where it can
- Reviews everything they produce before you see it, including running the 8-point copy audit on every email
- Posts batches to your Slack channel for approval, and builds the digest you approve from
- Enforces the guardrails, including the ones that stop you (send caps, cooldowns, Lusha budget)
- Says no when research is too thin to personalise, rather than letting a generic email through

**What it will not do:** send an email, ever. It has no send capability and neither does anything below it.

---

## Research Analyst

**Finds accounts you have not thought of yet.**

Use it when your target list is thin, or you want to find more companies like the ones already working.

| | |
|---|---|
| **Give it** | "Find companies like Woolworths in NZ retail", or a trigger to watch for |
| **Get back** | New companies with firmographics and a source for each claim |
| **Tools** | Web search, Lusha company search, your vault |

What it is good at:

- **Lookalike discovery.** Give it an account that fits and it finds structurally similar companies, filtering on industry, size, location and hiring technology rather than guessing from scraped pages.
- **Trigger signals.** New leadership, hiring surges, ATS changes, the events that make outreach timely rather than random.
- **Re-scoring.** Running existing accounts back through the current rubric when the rubric changes.

Anything it finds gets written straight back into your target list, so the same company is never resurfaced as "new" a month later.

It marks anything it could not verify as "(unconfirmed)" rather than asserting it. If it says a company uses Workday, it found that somewhere and will show you where.

**It does not** write briefs or emails. It feeds the pipeline.

---

## ICP Scorer

**The quality gate. Decides whether an account is worth your time before you spend any.**

| | |
|---|---|
| **Give it** | A company name |
| **Get back** | A score, a tier, and the reasoning dimension by dimension |
| **Reads** | `00-ICP/ICP_Scoring_Rubric.md`, which is its only source of truth |

It scores against the rubric consistently rather than by feel, so two accounts scored weeks apart are genuinely comparable. You get the breakdown, not just a number, so you can disagree with the reasoning rather than just the result.

**The rule that matters:** an account the Scorer has not seen is unscored. Not "probably Tier B", not "whatever the old spreadsheet said". If you want it prioritised, score it.

Running this before research is the single biggest saving in the system. Research is expensive; scoring is cheap. Score first, research the ones worth researching.

---

## Company Researcher

**Builds the one-page brief everything else is written from.**

| | |
|---|---|
| **Give it** | A company that has already scored well |
| **Get back** | A brief you can read in 60 seconds, every claim sourced |
| **Writes to** | `Sapia-Sales-Vault/02-Accounts/` |

A brief covers the company snapshot, what is actually happening there right now, the pain worth talking about, who to approach, and an opener grounded in something real.

Two modes: **Lean** by default, and **Full** (a deeper ten-section version) for your best accounts.

**Its strictest rule is the UNKNOWN rule.** It will not guess. If it cannot verify headcount, it writes UNKNOWN and moves on rather than inventing a plausible number. That is deliberate: a brief you can trust completely is worth more than a complete brief you cannot.

Every claim carries a source URL and the date it was pulled.

---

## Prospect Hunter

**Finds the actual human, and protects your Lusha budget while doing it.**

| | |
|---|---|
| **Give it** | An approved account, or a whole batch |
| **Get back** | A verified contact with a real email address |
| **Tools** | Lusha, your outreach history |

What it enforces, without being asked:

- **Never guesses an email.** Verified or marked unknown. No pattern-guessing from a name.
- **Emails only, never phone numbers.** Phone reveals cost credits and this system has no use for them.
- **Checks your history first.** It will not contact someone you contacted 60 days ago, or a second person at a company you emailed last week.
- **Watches the budget.** 200 Lusha credits a week, and it tells you before you get close rather than after.

It also does a batched pre-pull: one Lusha call covering a whole cohort of companies up front, rather than one call per company. That is cheaper and faster, and it is why the Company Researcher never has to look up headcount itself.

**Cooldowns it enforces:** 90 days before the same person again, 21 days before a different person at the same company.

---

## Copywriter

**Writes the emails, in your voice, not a generic sales voice.**

| | |
|---|---|
| **Give it** | A research brief |
| **Get back** | A drafted email that has already passed an 8-point audit |
| **Reads** | Your Voice Profile, the brief, persona maps, verified product material |

This is the agent your setup effort pays off in. It reads your Voice Profile and your best past emails before writing a word, which is why Step 3 of the README matters more than it looks.

**Every email must pass all eight checks before you see it:**

1. No em dashes or en dashes
2. Does not open with a rhetorical question
3. Opens on a specific, verifiable signal, not flattery
4. No jargon (leverage, synergies, seamless, robust, empower, streamline, and the rest)
5. First word is not "I" or "We"
6. Email 1 contains no meeting ask at all
7. Email 1 under 135 words, follow-ups under 150
8. Subject follows `{Company} / Sapia.Ai - {hook}`, hook six words or fewer

Point 6 is the one people query. The first email asks for nothing. It offers something useful instead, on the reasoning that a stranger has not earned 30 minutes of a CHRO's calendar and asking for it is what gets you deleted.

It also threads properly: touches 2 to 4 reuse touch 1's subject with `Re:` so the sequence reads as one conversation rather than four cold approaches.

**It will refuse to write** if the research is too thin to say anything specific. Treat that as the system working. Give it more to work with or drop the account.

---

## Reply Handler

**Triages what comes back.**

| | |
|---|---|
| **Give it** | An inbound reply, or just "check my threads" |
| **Get back** | A classification, a drafted response, and an escalation if it is hot |

It sorts replies by intent (interested, not now, wrong person, objection, unsubscribe), drafts the appropriate response, and pushes genuinely positive ones at you immediately rather than letting them sit.

Objections get answered from your objection library, so the response is the one that has worked before rather than one invented on the spot.

**Everything it writes is a draft for you to approve.** It never replies to a prospect on its own.

Two things it handles without asking: pausing a sequence when someone is out of office, and processing an unsubscribe immediately and completely.

---

## GTM Action Thinker

**The one that argues with you.**

| | |
|---|---|
| **Give it** | A campaign idea, an angle, a positioning hypothesis |
| **Get back** | An honest assessment, usually including why it might not work |

Use it before committing to something, not after. It states your actual hypothesis back to you, sorts your assumptions into Validated, Reasonable, Unproven and Risky, finds the blind spots, and then maps out what executing it would really take.

It is explicitly built not to agree with you by default. If your idea is weak it says so. That is the point, and it is worth using precisely on the ideas you are most attached to.

---

## Calling one directly

Usually you do not need to. "Research these five and draft outreach" is enough, and the Sales Director routes it.

When you do want a specific one, just name it:

| You want | Say |
|---|---|
| New accounts | *"Have the research analyst find 10 companies like [account] in [market]."* |
| A fit check | *"Score [company] against the ICP rubric."* |
| Deep background | *"Get me a full brief on [company], I have a call Thursday."* |
| A contact | *"Find me the right person at [company] and verify their email."* |
| An email | *"Draft touch 1 for [company] from the brief."* |
| Reply triage | *"Check my sent threads and triage anything that came back."* |
| A reality check | *"Stress-test this before I commit: [your idea]."* |

---

## What none of them can do

Worth being clear, because it is the design decision the whole system rests on.

**No agent can send an email.** Not the Sales Director, not the Copywriter, not the Reply Handler. The Gmail connection is used to create drafts, read threads and check for replies. The send capability is not wired up, so there is no instruction you could give that would cause one to go out.

Emails leave your account when you open Gmail and click send. Every time, including follow-ups.

There are two separate human checkpoints by design: you approve a batch in Slack, which authorises *drafting*, and then you send each draft yourself. Approving a batch has never meant anything is going out.
