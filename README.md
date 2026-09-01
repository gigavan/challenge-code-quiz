# AZ-900 Adaptive Trainer

A browser-based adaptive study app for **Microsoft Azure Fundamentals (AZ-900)**, aligned to Microsoft's **July 20, 2026** skills outline.

## Study modes

- **Learn Mode** — adaptive questions, confidence rating, immediate teaching feedback, misconception capture, transfer prompts and a Feynman checkpoint.
- **Review Due** — targets concepts that are due under the spaced-repetition scheduler, weak, or associated with high-confidence misses.
- **Flashcards** — rapid retrieval with Again / Hard / Good / Easy grading that directly updates the review schedule.
- **Exam Mode** — a 40-question, 45-minute weighted simulation with feedback hidden until completion.

## Adaptive learning engine

The trainer tracks learning at the **concept** level rather than simply memorizing question IDs.

Each concept can be classified as:

- New
- Learning
- Review
- Mastered

Question priority takes into account:

- Current concept mastery
- Whether review is due
- High-confidence wrong answers
- New/unseen concepts
- Interleaving across exam domains

The app also includes:

- Active recall / generation effect
- Confidence scoring
- High-confidence misconception detection
- Error-driven explanations
- Personal misconception notes
- Scenario-transfer prompts
- Spaced repetition
- Feynman explain-it-yourself checkpoints
- Daily study streak
- Domain mastery dashboard
- Exam-readiness status
- Persistent progress using `localStorage`

## Current AZ-900 domains

- Describe cloud concepts — **25–30%**
- Describe Azure architecture and services — **35–40%**
- Describe Azure management and governance — **30–35%**

The expanded question bank covers the current objective families including cloud models and service types, Azure architecture, compute, networking, storage, identity and security, cost management, governance, deployment tooling, and monitoring.

## Run

Open `index.html` locally or use GitHub Pages:

https://gigavan.github.io/challenge-code-quiz/

No backend is required. Progress is stored in the browser.