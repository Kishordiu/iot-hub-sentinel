![IOT HUB SENTINEL — bespoke brushed-metal project artwork](./assets/readme-metal-hero.svg)

# IOT HUB SENTINEL

**A connected-device dashboard frontend that separates the operator experience from its API service.**

IoT Hub Sentinel provides a React/TypeScript application for showing device inventory, status summaries, alerts, and device details. Its dashboard loads data through the API wrappers in `src/services/endpoints`. The UI reports a connection error when the backend is unavailable or `VITE_API_URL` is not configured.

## Request path

```text
Dashboard / device pages
          │
          ▼
src/services/endpoints
          │
          ▼
Configured API (VITE_API_URL)
          │
          ├──► Dashboard statistics
          ├──► Device records
          └──► Alert records
```

## What is included

- **Operational dashboard:** Device totals and status/alert summaries returned by the API.
- **Device detail:** A route for examining an individual device record.
- **Account screens:** Login and password-reset interface routes.
- **Loading and error states:** The dashboard distinguishes a pending request from an unavailable backend.

## Stack

React · TypeScript · Vite · React Router · Framer Motion · typed API wrappers

## Run locally

**Requirements:** Node.js and npm.

```bash
git clone https://github.com/Kishordiu/iot-hub-sentinel.git
cd iot-hub-sentinel
npm ci
# Create a local .env file and set VITE_API_URL to your actual API base URL.
```

Set `VITE_API_URL` to the intended API base URL in the local environment file, then run:

```bash
npm run dev
npm run lint
npm test
npm run build
```

## Backend and security boundary

This repository is the frontend; a successful UI build does not mean a device backend is running. Confirm API authentication, authorization, input validation, event provenance, tenant isolation, and the handling of secrets on the server. Do not treat sample/empty API responses as evidence that a real device is online or secure.

---

<p align="center"><sub>DIU FOUNDRY · CONNECTED SYSTEMS / API-DRIVEN OPERATIONS</sub></p>
