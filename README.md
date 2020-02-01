# Kamil Mielnik's Curriculum Vitae
https://cv.kamilmielnik.com/

## Setup
1. `npm install`
2. `cp .env.example .env`
3. Fill in missing values in `.env`

## Scripts

### `npm run build`
Generate CSS & JS bundles in `./build/`

### `npm run createPdf`
Generate PDF version of the CV based on files in `./build/`

### `npm run deploy`
Copy files from `./build/` to a remote server (setup via variables in `.env`)

### `npm run publish`
Run `build`, `createPdf` & `deploy` scripts one by one

### `npm start`
Run development server with hot-reload
