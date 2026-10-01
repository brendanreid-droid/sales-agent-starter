# Sapia.ai — Enterprise Product Overview & Solution Stack
**Last updated:** July 2026
**Owner:** Sales Lead (update quarterly)

> ⚠️ AGENT INSTRUCTION: Only reference capabilities listed in this document. Never invent or extrapolate product features. If a prospect asks about a capability not listed here, escalate to the human rep.

---

## 1. Executive Summary

Sapia.ai is an enterprise-grade, AI-native talent intelligence platform that delivers unbiased, structured, and scalable decisions for every candidate and employee. Grounded in validated organisational psychology (including the HEXACO personality framework) and built on the world’s largest structured hiring dataset (6M+ interviews, 2B+ words analysed across 47 countries), Sapia.ai replaces resumes and gut-feel screening with structured, text-based chat interviews. 

Sapia.ai is **Ethical by Design**—using no video, no audio, and no resumes in its scoring models—ensuring zero adverse impact across gender, ethnicity, and disability.

---

## 2. Core Product Suite (The Solution Stack)

### A. Smart Interviewer (Chat Interview)
The entry point of the Sapia platform. Candidates complete a short, mobile-first, text-based interview consisting of 5 behavioural and situational judgment questions.
* **Chat Pro / SAIGE Scoring:** Sapia's unified chat interview and grading system (deployed across both frontline and professional/corporate roles). It utilises generative AI to analyse candidate responses against Sapia’s competency framework and provides numerical scores combined with deep, explainable, and written behavioural justifications.
* **Video Response Option:** An optional, asynchronous, untimed video question added at the end of the chat interview. Candidates record themselves at their convenience to showcase communication style, allowing hiring teams to review responses inside the platform without scheduling friction.
* **Key Stats:** 89%–97% completion rates (2x higher than traditional video interview tools); 92%+ candidate satisfaction; 2.5x higher completion rate for women compared to video-first platforms.

### B. JAS™ (Job Analysis Studio)
An embedded AI assistant that acts as a skills diagnostic and interview builder.
* **How it works:** Recruiters paste a Job Description into JAS. JAS analyses the JD, maps it against Sapia's validated competency framework, suggests the competencies that matter most, recommends custom weights, and generates a structured interview (questions and grading guides) in seconds.
* **Human-in-the-Loop:** Hiring teams review, adjust, and confirm the competencies and questions before deployment, combining AI efficiency with human expertise.

### C. SAIGE™ (Scoring & Grading Agent)
Sapia's proprietary AI scoring engine that evaluates candidate responses.
* **How it works:** SAIGE grades candidate text responses against the selected competencies on a behaviourally anchored 1–5 scale.
* **Explainable AI:** SAIGE generates natural language explanations detailing *why* a candidate received a specific score based on evidence in their responses. This eliminates "black box" decisions and provides audit trails for compliance.

### D. TIA™ (Talent Intelligence Agent)
A talent mobility and internal discovery tool.
* **How it works:** TIA allows organisations to build an internal talent taxonomy, run lookalike candidate scans ("find me candidates like Tom"), draft personalised onboarding plans, and build developmental pathways for employees based on their measured skills.
* **Accessibility:** Easily accessible in the flow of work via a Chrome browser extension or natively inside your ATS.

### E. Phai™ (Candidate Career Guidance Agent)
A generative AI agent that provides career guidance and talent mobility options to candidates and internal employees, helping them discover their strengths and find suitable internal roles.

### F. Live Interview™ (Interview Scheduler)
An AI-driven scheduling engine. Once a candidate is automatically shortlisted, Live Interview coordinates self-scheduling, syncing directly with hiring managers' calendars to book in-person or final-stage interviews without manual coordination.

### G. Discover Insights (Analytics Dashboards)
Embedded real-time reporting dashboards providing executive visibility into:
* **Funnel Performance:** Drop-off rates, completion times, and device usage.
* **Recruiter ROI:** Time-to-fill, cost savings, and recruiter efficiency.
* **Fairness & D&I:** Demographic representation at each stage of the funnel with live bias testing.
* **Candidate Sentiment:** Verbatim candidate feedback and Net Promoter Scores (CSAT).

---

### Artificially Generated Content (AGC) Management — 2026 Update
Sapia.ai has transitioned away from surfacing individual candidate AI-generated content (AGC) flags on Talent Insights reports and ATS views. Surfacing individual flags led to unintended consequences (such as auto-filtering before response review) and compliance risks under regulations like the EU AI Act due to false positives on academic writers. 

Sapia.ai now utilises a multi-layered, outcome-focused approach to manage AI-assisted responses:
* **Authenticity Safeguards:** Candidates receive upfront guidance encouraging them to write in their own words (establishing a "psychological contract" of mutual trust). Copy-paste blocking is enforced inside the chat interface to deter direct plagiarism.
* **Real-time Prompts:** Candidates receive a real-time, non-punitive prompt during the interview if AI-generated content is detected, offering them a chance to adjust and refine their response.
* **Macro-level Aggregate Reporting:** Customers receive macro-level aggregate reports in monthly or quarterly reviews showing AI usage patterns across their entire candidate pool, providing macro transparency without labeling individuals.
* **Detection Accuracy:** Sapia's updated detection model is **97% accurate** (with a false positive rate of <2% on human responses), ensuring highly reliable macro-level analytics.
* **Validation Tools:** To resolve any concerns about authenticity, recruiters are equipped with custom follow-up questions from **Talent Insights Pro** to probe and validate candidate responses in subsequent interview stages.

---

## 4. Science, Fairness & Bias Mitigation

Sapia.ai is built fairness-first, treating bias mitigation as a core success metric rather than a post-hoc compliance checklist.

### The Science
* **Measurement vs. Inference:** Legacy platforms infer skills from resumes, job titles, or social media profiles (which are subjective and favor privilege). Sapia *measures* actual behavioural traits and soft-skills (power skills) through natural language text responses.
* **HEXACO Alignment:** Language is used to score candidates against the scientifically validated HEXACO personality framework.

### Bias Mitigation Registry & Governance
* **Fairness by Design:** Evaluates candidate text responses only. Completely blind to gender, age, ethnicity, resume format, or disability.
* **Acceptable Risk Thresholds:**
  * **EEOC 4/5ths Rule (Recommendation Parity):** Sapia maintains a selection rate ratio of **&ge; 0.8** across demographic groups.
  * **Effect Size (Cohen's d):** Keeps group difference mean scores **< 0.7**, indicating minimal bias.
  * **Predictive Validity (r):** Achieves **&ge; 0.3**, indicating statistically significant prediction of post-hire performance.
* **Live Auditing:** Live testing (ANOVA, t-tests, and the 4/5ths rule) is conducted at the feature level and visible inside the Discover Insights dashboard.

---

## 5. Security, Infrastructure & Integrations

* **Enterprise Hosting:** Deployed on serverless AWS architecture. Offers sovereign hosting with regional data residency options in **Australia (AU), Europe (EU), and the United States (US)**.
* **Data Privacy:**
  * **AWS Bedrock Sovereignty:** Generative AI components (using Anthropic Claude) are hosted on AWS Bedrock. Zero data is shared with external LLM providers or used to train third-party models.
  * **No Candidate-Facing GenAI:** Conversational chats are fully structured and deterministic, preventing hallucinations, inappropriate prompts, or toxic interactions.
* **Certifications & Compliance:**
  * **ISO 27001 Certified** (Information Security Management)
  * **ISO 42001 Certified** (Artificial Intelligence Management System—Sapia.ai is a pioneer in achieving this standard)
  * **SOC 2 Type II Certified** (updated 2026-09-04, per rep confirmation; supersedes the earlier "Type I, Type II in progress" entry)
  * **GDPR Compliant** (Data Processing Agreements in place, 35-day data deletion cycles upon contract termination)
* **ATS Integrations:** Plug-and-play integrations with major platforms including **SAP SuccessFactors, PageUp, SmartRecruiters, Greenhouse, Tribepad, iCIMS, eArcu, TeamTailor, Avature, LiveHire, Dayforce, Workday, and Oracle HCM**. Can go live Standalone in under 2 hours, and ATS-integrated in weeks.

---

## 6. Messaging Hierarchy by Persona

* **To Chief HR Officers / People Officers (Focus: Attrition & Fairness):**
  * *"Sapia.ai uses ethical, text-only AI to replace manual screening. We deliver a measurable reduction in employee turnover within 12 months (e.g., cutting barista turnover by 56% at Starbucks AU and general carer churn by 56% at Regis Aged Care), saving millions in invisible recruitment and retraining costs."*
* **To Operations Leaders (COO, Retail Store Directors, Site Managers) (Focus: Speed & Staffing):**
  * *"Sapia.ai automates the first mile of hiring, slashing time-to-offer to under 24 hours. We give your store managers their time back so they can focus on customers, not sifting through hundreds of resumes."*
* **To Talent Acquisition Directors (Focus: Efficiency & Sourcing):**
  * *"Sapia.ai saves 13 hours per week per recruiter—equivalent to 2.2 Full-Time Employees (FTE) for a team of six. Reclaim over 60% of your screening week, eliminate manual phone tag, and empower your recruiters to act as strategic talent partners."*
* **To People & Culture Directors / Heads of / Managers (Focus: Retention & Employee Experience):**
  * *"Build a high-performance culture by starting with fit. Sapia.ai gives 100% of candidates personalised developmental feedback from day one, protecting your employer brand and boosting retention. We deliver a measurable and meaningful reduction in voluntary employee turnover within the first 12 months, building a stable, engaged frontline workforce and reducing the cultural drain of constant backfilling."*
* **To Heads of People Partners / Recruitment (Focus: Capacity & Strategic Business Partnering):**
  * *"Reclaim over 60% of your recruitment capacity by automating CV screening and initial phone screening. Enable your People Partners and recruiters to step away from the administrative 'hamster wheel' and act as strategic advisors to business units, armed with explainable soft-skills data to guide better hiring decisions."*
* **To Heads of People Services / People Services Managers & Directors (Focus: SLA Delivery & Service Standardisation):**
  * *"Sapia.ai standardises and accelerates your screening process across every business unit—cutting time-to-shortlist from weeks to days, reducing recruiter admin overload, and giving you real-time funnel reporting you can present upward. Your team stops firefighting volume and starts delivering a consistent, audit-ready hiring service at scale."*
