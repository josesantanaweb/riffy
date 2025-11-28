-- Add numbers column as optional first
ALTER TABLE "Board" ADD COLUMN "numbers" JSONB;

-- Convert number from TEXT to INTEGER
-- First, ensure all number values can be converted to integers
ALTER TABLE "Board" ALTER COLUMN "number" TYPE INTEGER USING CASE
  WHEN "number" ~ '^[0-9]+$' THEN "number"::INTEGER
  ELSE NULL
END;

-- Handle duplicate numbers by updating them to be unique
-- This will assign sequential numbers starting from the max number + 1
DO $$
DECLARE
  max_num INTEGER;
  dup_record RECORD;
  new_num INTEGER;
BEGIN
  -- Get the maximum number
  SELECT COALESCE(MAX("number"), 0) INTO max_num FROM "Board";

  -- Update duplicate numbers
  FOR dup_record IN
    SELECT "id", "number", ROW_NUMBER() OVER (PARTITION BY "number" ORDER BY "id") as rn
    FROM "Board"
    WHERE "number" IN (
      SELECT "number"
      FROM "Board"
      GROUP BY "number"
      HAVING COUNT(*) > 1
    )
  LOOP
    IF dup_record.rn > 1 THEN
      max_num := max_num + 1;
      UPDATE "Board" SET "number" = max_num WHERE "id" = dup_record.id;
    END IF;
  END LOOP;
END $$;

-- Add unique constraint on number
ALTER TABLE "Board" ADD CONSTRAINT "Board_number_key" UNIQUE ("number");

