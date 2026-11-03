-- Bootstrap only. Application tables and roles belong in future Alembic migrations.
-- Use UTC storage; store-local timezone conversion belongs in the analytics layer.
ALTER SYSTEM SET timezone = 'UTC';
SELECT pg_reload_conf();
