# Start here

Two prompts. Paste the first one, then the second. That is the whole setup.

You do not need a terminal, an API key, or any git knowledge. Claude does the work and explains each step as it goes.

---

## Prompt 1: install it

Open **Claude Desktop**, go to the **Code** tab, and start a new session. It does not matter which folder it opens in. Paste this in:

```
Please install the Sapia.ai sales agent stack on my machine.

1. Clone https://github.com/brendanreid-droid/sales-agent-starter.git into my
   Documents folder. If git is not available, tell me exactly how to install it
   rather than working around it.

2. Confirm the clone worked. Check that CLAUDE.md, README.md and .claude/agents/
   are all there, and that .claude/agents/ holds 7 agent files. Tell me plainly
   if anything is missing.

3. Read README.md so you understand what this system is, then give me a short
   plain-English summary of what it does and what setup is still left. Do not
   start doing that setup yet.

4. Tell me the full path to the folder you created, then remind me that I need to
   close this session and start a NEW Claude Code session pointed at that folder.
   Explain why: the agents only load in a session that starts inside the folder.

Do not connect any services, do not create files beyond the clone, and do not
send any email at any point.
```

When it finishes, **close that session**. Start a new Claude Code session with the folder it just created as the working directory. In Claude Desktop you pick the folder when you start the session. On a Mac you can also double-click `start.command` inside the folder.

> This restart is the step people skip, and nothing works without it. A Claude Code session is tied to the folder it starts in, so the session that did the cloning cannot become your Sales Director.

---

## Prompt 2: set it up and learn it

In the **new** session, paste this:

```
You're my Sales Director. Read CLAUDE.md and README.md first, then walk me
through setup and teach me how to use this system.

Go one step at a time and wait for me after each one. Do not run ahead.

PART 1, SETUP
Work through the README's Step 2 and Step 3 with me:
- connecting Gmail, Slack and Lusha
- creating my private Slack channel and recording its name in CLAUDE.md
- writing my Voice Profile
- loading my own target accounts

For each step: tell me what to do, why it matters, then check it actually worked
before moving on. If something fails, help me fix it rather than skipping it.
If I do not have Lusha access yet, carry on without it and tell me what I will
not be able to do until I have it.

PART 2, TEACH ME THE SYSTEM
Once setup is done, explain in plain language:
- what each of the 7 specialist agents does, and when I would use each one
- the difference between approving a batch in Slack and sending an email in
  Gmail, and why both gates exist
- the guardrails you enforce on me, which ones are hard limits, and which I can
  change
- the weekly rhythm, with the exact prompt I would send for each day

PART 3, A REAL FIRST BATCH
Then run one small real batch with me. Three accounts, not more. Narrate what
you are doing as each agent runs so I can see how the pieces fit together. Stop
before anything is sent and show me the drafts to review.

Never send an email. Drafts only, into Gmail, for me to send myself.
```

That session will take you from nothing to three reviewed drafts sitting in your Gmail.

---

## After that

Just talk to it. A few that come up often:

| What you want | What to say |
|---|---|
| Start the week | *"Let's kick off new research for this week."* |
| Draft a batch | *"Draft Touch 1 for the accounts we scored on Monday."* |
| After you approve in Slack | *"Check Slack approvals and stage the batch."* |
| Check for replies | *"Check my sent threads for replies and triage anything that came back."* |
| Review the week | *"Pull this week's send and reply stats from Gmail and update Campaign_Learnings.md."* |
| Pressure-test an idea | *"Stress-test this campaign angle before I commit to it: [your idea]"* |

If anything behaves oddly, say so directly: *"Something isn't working: [what you're seeing]. Check the setup and tell me what's missing."* It can read its own configuration and diagnose itself.

Full detail on any of this is in [README.md](README.md).
