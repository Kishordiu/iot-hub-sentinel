![IOT HUB SENTINEL — bespoke brushed-metal project artwork](./assets/readme-metal-hero.svg)

> **CONNECTED SYSTEM SECURITY.**

## THE PREMISE

IoT Hub Sentinel explores the operational layer around connected devices: a command-oriented dashboard where presence, state and system health can be understood without digging through implementation details.

## THE EXPERIENCE

**Turn device noise into hierarchy.**  
**Keep operational state visible.**  
**Leave room for realtime data when the system grows.**

## THE SYSTEM

React/TypeScript provides the application surface; Framer Motion handles motion, Supabase and Socket.IO keep the data layer extensible, and Recharts supports telemetry-style views.

## THE STACK

React 18 · TypeScript · Vite · Tailwind CSS · shadcn/ui · Framer Motion · Supabase · Socket.IO · Recharts

## RUN

Requirements: Node.js and npm.

```bash
npm ci
npm run dev
```

Vite prints the development URL. Before shipping, run:

```bash
npm run build
npm run lint
npm test
```

This is a prototype interface; connected-device security enforcement must be verified in the backend and device firmware, not inferred from UI states.

## PROJECT STATE

**Prototype / active development**

The repository documents the capabilities that are actually implemented; future integrations are intentionally separated from the current product surface.

---

<p align="center"><strong>K. KISHOR KUMAR</strong><br><sub>ENGINEERING / PRODUCT / SYSTEMS</sub></p>
