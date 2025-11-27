-- Populate NULL values in numbers column with generated card numbers
-- This uses a simple JSON structure: [[B1,I1,N1,G1,O1], [B2,I2,N2,G2,O2], ...]
-- For now, we'll use a placeholder structure that can be updated later
UPDATE "Board"
SET "numbers" = '[[1,16,31,46,61],[2,17,32,47,62],[3,18,-1,48,63],[4,19,34,49,64],[5,20,35,50,65]]'::jsonb
WHERE "numbers" IS NULL;

-- Make numbers column required
ALTER TABLE "Board" ALTER COLUMN "numbers" SET NOT NULL;

