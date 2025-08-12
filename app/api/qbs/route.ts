export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const runtime = 'nodejs';

import { prisma } from '../../../lib/prisma';
export async function GET() {
  const qbs = await prisma.qB.findMany({ where: { active: true }, orderBy: { team: 'asc' } });
  return Response.json(qbs);
}
