# Kamil Mielnik's Curriculum Vitae
https://cv.kamilmielnik.com/

![ESLint](https://github.com/kamilmielnik/cv/workflows/ESLint/badge.svg)

## Setup
1. `npm install`
2. `cp .env.example .env`
3. Fill in missing values in `.env`

## Scripts

### `npm run build`
Run production build and place the output in `./build/`

### `npm run clean`
Remove `./build/` directory

### `npm run deploy`
Copy files from `./build/` to a remote server (setup via variables in `.env`)

### `npm run publish`
Run `clean`, `build`, & `deploy` scripts one by one

### `npm start`
Run development server with hot-reload
