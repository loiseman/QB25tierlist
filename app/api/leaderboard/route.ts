
import { prisma } from '../../../lib/prisma';

// .5 va vers le meilleur tier (3.5 -> 3)
function roundHalfDown(x:number){ const f=Math.floor(x), d=x-f; return Math.abs(d-0.5)<1e-9 ? f : (d<0.5?f:f+1); }

export async function GET() {
  const rows = await prisma.$queryRawUnsafe<any[]>(`
    select q.id as id, q.name, q.team,
           avg(bi.tier)::float as avg, count(bi.id)::int as cnt
    from "QB" q
    left join "BallotItem" bi on bi."qbId" = q.id
    where q.active = true
    group by q.id, q.name, q.team
  `);

  const data = rows.map(r => ({
    qbId: r.id,
    name: r.name,
    team: r.team,
    avgTier: r.cnt ? Number(r.avg.toFixed(2)) : null,
    votesCount: r.cnt,
    finalTier: r.cnt ? roundHalfDown(r.avg) : null,
  })).sort((a,b)=> (a.avgTier ?? 99) - (b.avgTier ?? 99));

  return Response.json(data);
}
