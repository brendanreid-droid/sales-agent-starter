# Sapia.ai: AI Sales Agent Team

An outbound GTM system that runs on Claude Code. One Sales Director agent coordinates seven specialists to research accounts, score them against the ICP, draft personalised outreach in your voice, manage contacts, and triage replies.

**No email ever sends itself.** Every batch needs your approval, and every send is a click you make yourself in Gmail. There is no setting that changes this.

---

## Before you start: what you actually need

Three things, and only three. Everything else is optional.

| | What | Why | Cost |
|---|---|---|---|
| 1 | **Claude Code**, comes with Claude Desktop, no separate install | Runs the agents | Included in your Claude plan |
| 2 | **A Claude account you can sign in with** | Connects Gmail, Slack and Lusha | Included |
| 3 | **A Lusha seat** | Finds verified contact emails | Ask your manager |

You do **not** need: a terminal, Python, Obsidian, HubSpot, SalesLoft, Gong, or any API keys. If a guide ever tells you to generate a key, you are reading an old version.

Allow about 30 minutes for setup, most of it waiting on sign-in screens.

---

> **Want the fast version?** [START-HERE.md](START-HERE.md) has two copy-paste prompts that do the whole install and then teach you the system. This README is the detailed reference behind them.
>
> **Want to know what the agents actually do?** [THE-AGENTS.md](THE-AGENTS.md) walks through all eight and what each is good at.

## Step 1: Get the files onto your machine

You do not need to know any git commands. Claude will do this part.

**1a.** Open Claude Desktop and start a new **Claude Code** session. (In the sidebar it is the "Code" tab. It does not matter which folder it opens in for this step.)

**1b.** Paste this in, exactly as written:

> Clone https://github.com/brendanreid-droid/sales-agent-starter.git into my Documents folder, then tell me the full path to where it landed.

Claude downloads the files and tells you the folder path. Write that path down, you need it in the next step.

> **If it fails with a permission error**, the repo is private and your GitHub account has not been added yet. Ask the person who shared this with you to add you as a collaborator (GitHub → the repo → Settings → Collaborators), then paste the prompt again.

**1c.** **Close that session and start a new one pointed at the folder you just downloaded.** This matters and it is the step people skip.

A Claude Code session is tied to the folder it starts in. The session you just used was pointed at Documents, so it will not become the Sales Director. Open a new Claude Code session with the downloaded folder as its working directory (in Claude Desktop, choose the folder when you start the session). Mac users can also just double-click `start.command` inside the folder.

**1d.** Check it worked. In the new session, send:

> Who are you and which specialist agents do you have?

A correct answer names you the **Sales Director** and lists seven specialists: research-analyst, icp-scorer, company-researcher, copywriter, prospect-hunter, reply-handler, gtm-action-thinker. If you get a generic "I'm Claude" instead, the session is pointed at the wrong folder. Go back to 1c.

---

## Step 2: Connect Gmail, Slack and Lusha

All three are point-and-click connectors. Nothing to generate, nothing to paste into a file.

**2a.** Ask your session what is already live:

> Run /mcp and tell me which connectors are connected.

Some may already be on at the workspace level. Only connect what is missing.

**2b.** For anything missing, go to **claude.ai/customize/connectors** in a browser. Sign in with the same account you use for Claude Code. Find **Gmail**, **Slack** and **Lusha**, click **Connect** on each, and approve the sign-in prompt.

**2c.** **Create your own private Slack channel.** This is the one step no tool can do for you, and nothing will post until it is done.

In Slack: create a **private** channel named `#yourfirstname-gtm-agent`, all lowercase (so `#sarahs-gtm-agent`). Then invite the Sapia bot to it: type `/invite @Sapia` in the channel.

**2d.** Tell your Sales Director where to post. Open `CLAUDE.md` in the downloaded folder, find the line that reads `My notification channel is #___-gtm-agent.` and fill in your channel name. Or just ask:

> My Slack notification channel is #sarahs-gtm-agent. Please record that in CLAUDE.md.

**2e.** Confirm:

> Run /mcp again and confirm Gmail, Slack and Lusha are all live.

### What each one does

- **Gmail** is where outreach actually happens. The Copywriter writes a draft into your Gmail Drafts folder. You open it, read it, and click send. Replies are tracked on the thread.
- **Slack** is where the Sales Director posts batches for your approval and flags anything that needs you.
- **Lusha** finds verified contact emails. It costs credits, so the system caps itself at 200 per week.

> **Why Gmail and not SalesLoft or Outreach?** Those are not authorised org-wide yet. Gmail does the same job with the same human-in-the-loop guarantee and nothing to configure. If SalesLoft comes online later the system switches over.

---

## Step 3: Make it sound like you

This is the step that decides whether the emails are any good. Budget 30 minutes.

**3a. Write your Voice Profile.** Copy `Sapia-Sales-Vault/04-Brand_Voice/Sender_Voice_Profiles/Voice_Profile_Template.md`, fill it in, and save it in the same folder as `YourFirstName_Voice.md`. The Copywriter reads this before writing a single word in your name.

Or let Claude draft it from your real emails:

> Read my Voice Profile template, then look at my last 20 sent emails in Gmail to prospects and draft my Voice Profile from how I actually write. Show it to me before saving.

**3b. Add your best cold emails.** Open `Sapia-Sales-Vault/03-Outreach/Email_Winners/Cold_Winners.md` and paste in three to five of your own best-performing cold emails, with the reply rates if you have them. Strip out prospect and company names first, the file tells you how.

**3c. Load your territory.** `Sapia-Sales-Vault/00-ICP/Target_Account_List.csv` and `Target_Account_Analysis.md` both ship empty on purpose. Put your own accounts in, keeping the column headings exactly as they are. Leave the ICP Score and Tier columns blank, the ICP Scorer fills those in.

> **Ignore any ICP score from an old spreadsheet.** The only score that counts is a fresh pass against `ICP_Scoring_Rubric.md`. An account the scorer has not seen is unscored, whatever the old sheet says.

---

## Step 4: Run your first batch

Start small. Five to ten accounts, not fifty.

> You're the Sales Director. Score my top 5 accounts against the ICP rubric, research the ones that come back Tier A or B, then draft Touch 1 for each. Post the batch to Slack for my approval.

What happens:

1. **ICP Scorer** scores each account and assigns a tier.
2. **Company Researcher** writes a one-page brief on the ones worth pursuing.
3. **Copywriter** drafts an email per account, in your voice, and runs it through an 8-point quality audit.
4. **Sales Director** posts the batch to your Slack channel.
5. **You reply `APPROVE`** in Slack. That is approval to *draft*, not to send.
6. You prompt: *"Check Slack approvals and stage the batch."* **Prospect Hunter** finds verified contacts via Lusha and creates a Gmail draft for each.
7. **You open Gmail and click send yourself**, one at a time.

Two separate human checkpoints, deliberately. The Slack approval and the Gmail send are not the same gate.

Read every email in that first batch properly. If one is weak, say so and the Copywriter rewrites it. The system gets better from the feedback.

---

## A weekly rhythm that works

Nothing here runs on a timer. Every row happens because you open Claude Code and ask for it.

| Day | What | How you start it |
|---|---|---|
| **Monday** | Find new accounts, score them, plan the week | *"Let's kick off new research for this week."* |
| **Tuesday** | Draft a batch → approve in Slack → send from Gmail | *"Draft Touch 1 for the accounts we scored Monday."* |
| **Thursday** | Second batch, same flow | Same as Tuesday |
| **Friday** | Review what worked, update the learnings file | *"Pull this week's send and reply stats from Gmail and update Campaign_Learnings.md."* |

---

## The guardrails (the system enforces these on itself)

- **No email ever sends automatically.** You click send in Gmail, every time.
- **Max 100 contacts per send day**, from 100 different companies.
- **21-day cooldown** before contacting a second person at the same company.
- **90-day cooldown** before contacting the same person again.
- **Max 200 Lusha credits per week.** It warns you before it gets close.
- **Max 200 new companies into research per week.**
- **If the research is too thin to personalise properly, it stops and tells you** rather than sending something generic.

---

## When something goes wrong

| What you see | What it means | Fix |
|---|---|---|
| Claude says "I'm Claude" instead of naming the Sales Director | Session is pointed at the wrong folder | Restart the session with the downloaded folder as its working directory (Step 1c) |
| Nothing appears in Slack | The Sapia bot is not in your channel, or the channel is not recorded in `CLAUDE.md` | Redo Steps 2c and 2d |
| "Lusha not connected" | Connector not authorised, or no seat on your account | Re-run Step 2b; if it still fails, you need a Lusha seat |
| Emails read robotic | Voice Profile is thin or missing | Go back to Step 3a and add real detail |
| It refuses to draft for an account | Deliberate: research was too thin to personalise | Give it more to work with, or drop that account |
| A guide tells you to create an API key | You are reading an outdated guide | Gmail, Slack and Lusha are all click-to-connect now |

If you are stuck, just ask the session: *"Something isn't working: [describe it]. Check the setup and tell me what's missing."* It can read its own configuration.

---

## What's in the folder

```
├── README.md                    ← this file
├── CLAUDE.md                    ← loads the Sales Director automatically every session
├── start.command                ← double-click to launch (Mac)
│
├── .claude/agents/              ← the 7 specialists, wired as Claude Code subagents
├── agent_prompts/               ← the full role prompts, the single source of truth
│
└── Sapia-Sales-Vault/
    ├── 00-ICP/                  ← ICP profile, scoring rubric, persona maps, YOUR territory list
    ├── 01-Product/              ← product overview, differentiators, ROI data
    ├── 02-Accounts/             ← fills up as agents research and draft
    ├── 02-Case_Studies/         ← customer case studies the Copywriter cites
    ├── 03-Outreach/             ← sequences, subject lines, objection library, your best emails
    ├── 04-Brand_Voice/          ← brand guidelines, YOUR voice profile
    ├── 05-Signals/              ← job movers, trigger events
    └── 06-Performance/          ← campaign learnings, A/B log
```

**Shared** (same for everyone): the agents, the prompts, the ICP rubric, product material, case studies.
**Yours** (ships empty, you fill it): territory list, voice profile, account briefs, outreach history.

> **One caution:** once you are running, `Outreach_History_Log.csv`, `Gmail_Cadence_Tracker.csv` and `02-Accounts/` hold real prospect names and email addresses. Keep them local. Do not push them to a repo other people can read.

---

## Getting good at it

1. **Fill the vault before you scale.** The agents are only as good as what they can read. An hour on your Voice Profile and case studies is worth more than any prompt tweak.
2. **Start at five emails, not fifty.** Read every one. Correct what is off. Then scale.
3. **Trust the stop.** When the Copywriter says it cannot write something genuinely personal, do not override it. Generic email costs you domain reputation.
4. **Update `Campaign_Learnings.md` weekly.** This is the loop that compounds. Skip it and the system stays where it started.
5. **Recalibrate after six weeks.** Look at what actually converted and adjust the rubric weights to match.

---

## Optional: on-brand slide decks

There is a second skill in here that builds Sapia.ai-branded `.pptx` decks. **It is completely separate from outbound and you should skip it on day one.** Setup takes about 20 minutes and installs fonts, Node and LibreOffice.

When you want it, open `.claude/skills/SETUP.md` and follow the prompt in there. It has Claude install everything and verify it end to end, including a font trap that fails silently if you set it up by hand.

Once installed, you just ask: *"Build a QBR deck for [account]"*.

---

## A note on Claude Desktop Projects

If someone suggests running this as a Claude Desktop **Project** instead, it will not work. Projects have no equivalent to `.claude/agents/` or `CLAUDE.md`, so there is no orchestrator and no specialists, you would be copying prompts between eight separate Projects by hand. It must run as **Claude Code**, which is what Step 1 sets up.

---

## Questions

Ask whoever shared this repo with you.
