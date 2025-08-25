# NestJS CMS + Discovery (Fastify) — Monorepo Boilerplate

Two NestJS apps sharing one Postgres DB (TypeORM) and an external Search abstraction.
- Fastify platform
- CMS app (admin/write + reindex to search)
- Discovery app (public/read + search)
- Shared libs: common, database, search, events

## Quickstart
```bash
npm i
cp .env.sample .env
docker compose up -d
npm run typeorm:run
npm run start:cms        # http://localhost:${CMS_PORT:-3001}/docs
npm run start:discovery  # http://localhost:${DISCOVERY_PORT:-3002}/docs
```
