# TDS Analytics

A student-built analytics dashboard for the 
**Tools in Data Science** course at IIT Madras.

**Live → [tds-analytics](https://aloktripathi1.github.io/tds-analytics)**

---

## What this is

Performance data across 4 terms (2025-01 through 2026-01), 
covering graded assignments (GA1–GA8), reports of evaluation (ROE), 
and projects — visualized as a clean, browsable dashboard.

Built because the data exists, and patterns are worth seeing.

---

## What it shows

- Score distributions and completion rates per assignment
- Question-level heatmaps (which questions most students scored on)
- Submission timing patterns
- Student retention across assignments
- Cross-term difficulty trends
- Submission anomaly patterns
- ROE deep-dive with AI solvability context

---

## What it doesn't do

- No individual student data is stored or displayed
- No recommendations or judgments — only what the data shows
- Raw submission files never leave the local machine

---

## Stack

React · Vite · Recharts

---

## Run locally

git clone https://github.com/[username]/tds-analytics
cd tds-analytics
npm install
npm run dev

---

## Data

Aggregated stats only — processed from autograder submission logs
into compact JSON summaries. Raw files are not in this repo.

---

*Built by a student, for students — past, present, and future.*