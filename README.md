# Design Gallery Coding Challenge

## Challenge Overview

Implement new features for a design gallery application to enhance user interaction and content relevance.

## Tasks

### 1. Design Labels

- Add labels to designs (e.g., "new", "personalisable")
- Personalisable should be prioritised over new.
- Labels should be visible in the UI
- See current site for visual reference

### 2. Heart/Like System

- Allow users to heart/like designs
- Must scale for many users

### 3. Trending Sort

- Implement sorting by trending designs
- Trending calculation based on:
  - Recent usage metrics
  - Heart count momentum
  - Rate of change (e.g., rapid increase from zero)
- Requirements:
  - Define trending score algorithm
  - Efficient sorting implementation
  - Handle large design collections
