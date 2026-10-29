# Banking QE Framework

Playwright + TypeScript test automation framework for a public demo banking
application ([ParaBank](https://parabank.parasoft.com)). Built to practise and
demonstrate web and API automation, CI/CD and AI-assisted defect analysis.

> Uses only a public demo app and dummy data. No employer code or data.

## Roadmap
- [x] Phase 1: UI automation with page objects and fixtures (registration, login, open account, funds transfer with balance checks)
- [ ] Phase 2: API automation (Playwright API testing + Postman/Bruno collection)
- [ ] Phase 3: GitHub Actions CI with HTML report, traces and screenshots
- [ ] Phase 4: AI-assisted failure analysis (group failures, suggest root causes)

## Project structure
```
src/pages/      Page objects (one class per page)
src/fixtures/   Custom Playwright fixtures wiring pages and test data
src/utils/      Test data builders and helpers
tests/ui/       UI specs, tagged @smoke / @regression
```

## Getting started
```bash
npm install
npx playwright install chromium
npm test                # run everything
npm run test:smoke      # only @smoke tests
npm run test:headed     # watch the browser
npm run report          # open the HTML report
```
Override the target with `BASE_URL=https://your-host/parabank/ npm test`.

## Design notes
- Every test registers its own unique user, so tests are independent and parallel-safe.
- Balance checks read the values before and after a transfer instead of hard-coding amounts, so they survive changes in the demo data.
- Locators prefer roles and visible text, with IDs only where the app gives no better hook.
- Traces, screenshots and videos are kept on failure for troubleshooting.
