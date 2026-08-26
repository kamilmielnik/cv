<div align="center">
  <h1>Kamil Mielnik's Curriculum Vitae</h1>

  <p>
    <img src="https://img.shields.io/github/package-json/v/kamilmielnik/cv" alt="Version" />
    <img src="https://img.shields.io/badge/node-%3E=24-brightgreen.svg" alt="Node >= 24" />
    <img src="https://github.com/kamilmielnik/cv/actions/workflows/oxfmt.yml/badge.svg" alt="Format" />
  </p>

  <p>
    <a href="https://kamilmielnik.com">https://kamilmielnik.com</a>
  </p>

  <hr />
</div>

## Setup

```Shell
npm install
npm run dev
```

## How it works

- `/` serves `src/index.html` with `src/style.css` inlined and minified; the duration of the current position is computed per request.
- `/pdf` serves `KamilMielnik.pdf`, rendered from `/` with Puppeteer at startup and once a day.
- `/track/:action` appends visits and button clicks to `tracking.jsonl`.
- The *Deploy* workflow pulls the chosen branch on the server and restarts `cv.service`.
