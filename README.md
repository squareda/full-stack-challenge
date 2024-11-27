# Design Gallery Coding Challenge

## Run the project

The project should be self contained running a virtual mongodb instance in memory so the only requirement should be installing node/yarn.

```bash
yarn install

yarn start
```

The frontend should be available at `http://localhost:3002` and the backend at `http://localhost:5001`.

### DB Issues

The db runs in memory but is persisted to the `backend/test-db` folder so that it's easier to test changes. If you want to reset the db or there is an issue just delete the folder or run `yarn clean-db`.

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
