create unique index if not exists ballots_votername_ci_idx on "Ballot" (lower("voterName"));
