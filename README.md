# Banking QE Framework

Playwright + TypeScript test automation framework for a public demo banking
application ([ParaBank](https://parabank.parasoft.com)). Built to practise and
demonstrate web and API automation, CI/CD and AI-assisted defect analysis.

> Uses only a public demo app and dummy data. No employer code or data.

[![Playwright Tests](https://github.com/bkavatgi-bit/banking-qe-framework/actions/workflows/playwright.yml/badge.svg)](https://github.com/bkavatgi-bit/banking-qe-framework/actions/workflows/playwright.yml)

## Roadmap
- [x] Phase 1: UI automation with page objects and fixtures (registration, login, open account, funds transfer with balance checks)
- [x] Phase 2: API automation (Playwright API tests, hybrid API+UI test, Postman collection)
- [ ] Phase 3: GitHub Actions CI with HTML report, traces and screenshots
- [ ] Phase 4: AI-assisted failure analysis (group failures, suggest root causes)

## Project structure
```
src/pages/      Page objects (one class per page)
src/api/        REST client wrapping the bank API
src/types/      Types for API responses
src/fixtures/   Custom Playwright fixtures wiring pages, API client and test data
src/utils/      Test data builders and helpers
tests/ui/       UI specs, tagged @smoke / @regression
tests/api/      API specs, tagged @api
tests/hybrid/   Tests that act through the API and verify in the UI
postman/        Postman collection for manual and exploratory API checks
```

## Getting started
```bash
npm install
npx playwright install chromium
npm test                # run everything
npm run test:ui         # UI tests only
npm run test:api        # API tests only
npm run test:hybrid     # API + UI tests
npm run test:smoke      # only @smoke tests
npm run test:headed     # watch the browser
npm run report          # open the HTML report
```
Override the target with `BASE_URL=https://your-host/parabank/ npm test`.

## Postman collection
Import `postman/ParaBank.postman_collection.json`, set the `username` and `password`
variables to a customer you registered on the ParaBank site, then run requests 1 to 5 in order.
Each request has assertions and passes ids to the next request through collection variables.

## Design notes
- Every test registers its own unique user, so tests are independent and parallel-safe.
- ParaBank has no registration API, so API tests create the customer through the UI form and then look it up through the REST login endpoint.
- Balance checks read the values before and after a transfer instead of hard-coding amounts, so they survive changes in the demo data.
- Locators prefer roles and visible text, with IDs only where the app gives no better hook.
- Traces, screenshots and videos are kept on failure for troubleshooting.
- ParaBank is a shared public demo, so tests use unique users, 2 workers and one retry to stay stable. A test that only passes on retry is reported as flaky in the HTML report.
