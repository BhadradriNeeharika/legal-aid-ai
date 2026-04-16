# Legal Aid Assistant

## Overview

A full-stack NLP-based Legal Aid Assistant web application for women and marginalized communities in India. Users can ask legal questions in plain English and receive clear, actionable guidance along with relevant helplines, NGOs, and legal clinics.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite (artifacts/legal-aid-assistant)
- **API framework**: Express 5 (artifacts/api-server)
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Features

1. **Chat Interface**: Conversational chat bubbles UI where users ask legal questions
2. **Rule-based Legal Knowledge**: Hardcoded responses for domestic violence, POSH Act, dowry harassment, women's safety laws
3. **Text-to-Speech**: Browser Web Speech API to read responses aloud
4. **Database**: PostgreSQL with helplines, NGOs, and legal clinics seeded with real Indian data
5. **Emergency Helplines**: Always-visible sidebar with numbers like 181, 112, 100
6. **Browse Pages**: Dedicated pages for helplines, NGOs, and legal clinics

## Legal Topics Covered

- Domestic Violence (PWDVA 2005)
- Sexual Harassment at Workplace (POSH Act 2013)
- Dowry Harassment (Section 498A IPC, Dowry Prohibition Act 1961)
- Women's Safety Laws (rape, assault, stalking)
- Property Rights & Inheritance
- Divorce, Maintenance & Child Custody
- Maternity Rights (Maternity Benefit Act 2017)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

## Architecture

```
artifacts/
  api-server/         — Express 5 backend
    src/
      routes/         — chat.ts, helplines.ts, ngos.ts, legal-clinics.ts
      lib/
        legal-knowledge.ts — Rule-based responses by keyword
  legal-aid-assistant/ — React + Vite frontend

lib/
  api-spec/openapi.yaml — Single source of truth for API contracts
  api-client-react/     — Generated React Query hooks
  api-zod/              — Generated Zod validation schemas
  db/
    src/schema/         — helplines.ts, ngos.ts, legal-clinics.ts, chat-messages.ts
```

## Database Tables

- `helplines` — name, phone, category (15 Indian helplines seeded)
- `ngos` — name, service, contact (12 NGOs seeded)
- `legal_clinics` — name, location, contact (12 legal clinics seeded)
- `chat_messages` — role, content, category, created_at

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
