# AZ-900 Quest

A browser-based adaptive, gamified study app for **Microsoft Azure Fundamentals (AZ-900)**, aligned to Microsoft's **July 20, 2026** skills outline.

## Study modes

- **Learn** — adaptive retrieval, confidence rating, immediate teaching feedback, misconception capture, transfer prompts, and a teach-back checkpoint.
- **Review Due** — spaced repetition focused on concepts that are becoming weak or are due for retrieval.
- **Flashcards** — Again / Hard / Good / Easy grading directly adjusts the next review interval.
- **Exam Simulation** — 40 questions in 45 minutes, weighted across the current AZ-900 domains, with feedback hidden during the test.
- **Gauntlet** — intentionally harder than normal AZ-900 practice, using dense scenarios, closer distractors, and cross-concept reasoning.
- **World Bosses** — unlock at 55% mastery in each learning world and test multiple related ideas together.

## Gamification that reinforces learning

- XP and levels reward correct retrieval, difficult questions, spaced review, misconception repair, and teach-back practice.
- Daily quests encourage review, interleaving across domains, misconception correction, and Feynman-style explanation.
- Focus Shield falls after misses—especially confident misses—and can be repaired by explicitly correcting the faulty mental model.
- Streak Shields protect a study streak after sustained consistency.
- Achievements reward meaningful milestones such as mastery, boss victories, strong exam simulations, and Gauntlet performance.
- Six learning worlds provide a skill-tree style progression: Cloud Foundations, Compute Forge, Network Frontier, Storage Vault, Identity Citadel, and Governance Tower.

## Adaptive learning engine

Each concept moves through **New → Learning → Review → Mastered**. Mastery is confidence-sensitive, false-confidence misses receive extra priority, and effective mastery slowly decays when a concept has not been retrieved for several days. The scheduler uses those signals to choose what appears next.

The current bank contains **100+ questions** across standard, hard, and boss difficulty tiers.

## Run

Use GitHub Pages:

https://gigavan.github.io/challenge-code-quiz/

Progress, XP, achievements, misconception notes, and review schedules are stored locally in the browser with `localStorage`; no backend is required.
