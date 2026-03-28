CREATE TABLE IF NOT EXISTS host (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  frpass VARCHAR(17) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS prizev (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  host_id UUID NOT NULL REFERENCES host(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL DEFAULT 'New event',
  people TEXT NOT NULL,
  bonus TEXT[] NOT NULL,
  dstart TEXT NOT NULL,
  dend TEXT NOT NULL,
  tstart TEXT NOT NULL,
  tend TEXT NOT NULL,
  place TEXT NOT NULL, 
  descri TEXT NOT NULL,
  rules TEXT[] NOT NULL,
  slogan TEXT NOT NULL,
  logo TEXT NOT NULL,
  picture TEXT ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS candidates(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prizev_id UUID NOT NULL REFERENCES prizev(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  invpass VARCHAR(15) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS winners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  candidates_id UUID NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  prize TEXT NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_prizev_host_id ON prizev(host_id);
CREATE INDEX IF NOT EXISTS idx_candidates_prizev_id ON candidates(prizev_id);
CREATE INDEX IF NOT EXISTS idx_winners_candidates_id ON winners(candidates_id);
