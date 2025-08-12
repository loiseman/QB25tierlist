
import { prisma } from '../../../lib/prisma';

export async function POST(req: Request) {
  const { voterName, items } = await req.json() as {
    voterName: string, items: { qbId: string, tier: number }[]
  };

  if (!voterName || voterName.trim().length < 2) return new Response('Nom invalide', { status: 400 });
  if (!Array.isArray(items) || items.length !== 32) return new Response('Il faut 32 choix (un par QB)', { status: 400 });
  if (items.some(i => !i.qbId || i.tier < 1 || i.tier > 5)) return new Response('Choix invalides', { status: 400 });

  // 1 bulletin par nom (insensible à la casse)
  const exists = await prisma.ballot.findFirst({
    where: { voterName: { equals: voterName, mode: 'insensitive' } },
    select: { id: true }
  });
  if (exists) return new Response('Ce nom a déjà voté', { status: 409 });

  await prisma.$transaction(async tx => {
    const ballot = await tx.ballot.create({ data: { voterName: voterName.trim() } });
    await tx.ballotItem.createMany({ data: items.map(i => ({ ballotId: ballot.id, qbId: i.qbId, tier: i.tier })) });
  });

  (globalThis as any).__notify?.(); // push SSE
  return Response.json({ ok: true });
}
