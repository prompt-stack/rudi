
-- Optional SQL helpers (run via a SQL migration) to maintain aggregates.

-- Recompute component aggregates (asset_count, total_size_bytes)
CREATE OR REPLACE FUNCTION refresh_component_aggregates(p_component_id text) RETURNS void AS $$
BEGIN
  UPDATE "components" c
  SET "asset_count" = sub.cnt,
      "total_size_bytes" = sub.total
  FROM (
    SELECT COUNT(*) AS cnt, COALESCE(SUM("size_bytes"),0) AS total
    FROM "assets" a WHERE a."component_id" = p_component_id
  ) sub
  WHERE c."id" = p_component_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION trg_assets_agg() RETURNS trigger AS $$
BEGIN
  PERFORM refresh_component_aggregates(COALESCE(NEW."component_id", OLD."component_id"));
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS assets_after_ins ON "assets";
DROP TRIGGER IF EXISTS assets_after_upd ON "assets";
DROP TRIGGER IF EXISTS assets_after_del ON "assets";

CREATE TRIGGER assets_after_ins AFTER INSERT ON "assets"
  FOR EACH ROW EXECUTE FUNCTION trg_assets_agg();

CREATE TRIGGER assets_after_upd AFTER UPDATE ON "assets"
  FOR EACH ROW WHEN (OLD."component_id" IS DISTINCT FROM NEW."component_id" OR OLD."size_bytes" IS DISTINCT FROM NEW."size_bytes")
  EXECUTE FUNCTION trg_assets_agg();

CREATE TRIGGER assets_after_del AFTER DELETE ON "assets"
  FOR EACH ROW EXECUTE FUNCTION trg_assets_agg();
