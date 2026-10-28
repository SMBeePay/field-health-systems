-- Additive-only schema changes applied on every Vercel deploy.
-- RULES: only ADD statements guarded by IF NOT EXISTS. Never DROP, ALTER TYPE,
-- or anything that can lose data. Destructive changes are run by hand.

-- 2026-10-27: capital planning — estimated replacement cost per field
ALTER TABLE fields ADD COLUMN IF NOT EXISTS "replacementCost" DOUBLE PRECISION;
