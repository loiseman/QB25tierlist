
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const qbs = [
  // AFC EAST
  { name: 'Josh Allen', team: 'BUF' },
  { name: 'Tua Tagovailoa', team: 'MIA' },
  { name: 'Drake Maye', team: 'NE' },
  { name: 'Justin Fields', team: 'NYJ' },
  // AFC NORTH
  { name: 'Lamar Jackson', team: 'BAL' },
  { name: 'Joe Burrow', team: 'CIN' },
  { name: 'Joe Flacco', team: 'CLE' },
  { name: 'Aaron Rodgers', team: 'PIT' },
  // AFC SOUTH
  { name: 'C.J. Stroud', team: 'HOU' },
  { name: 'Daniel Jones', team: 'IND' },
  { name: 'Trevor Lawrence', team: 'JAX' },
  { name: 'Cameron Ward', team: 'TEN' },
  // AFC WEST
  { name: 'Bo Nix', team: 'DEN' },
  { name: 'Patrick Mahomes', team: 'KC' },
  { name: 'Geno Smith', team: 'LV' },
  { name: 'Justin Herbert', team: 'LAC' },
  // NFC EAST
  { name: 'Dak Prescott', team: 'DAL' },
  { name: 'Russell Wilson', team: 'NYG' },
  { name: 'Jalen Hurts', team: 'PHI' },
  { name: 'Jayden Daniels', team: 'WAS' },
  // NFC NORTH
  { name: 'Caleb Williams', team: 'CHI' },
  { name: 'Jared Goff', team: 'DET' },
  { name: 'Jordan Love', team: 'GB' },
  { name: 'J.J. McCarthy', team: 'MIN' },
  // NFC SOUTH
  { name: 'Michael Penix Jr.', team: 'ATL' },
  { name: 'Bryce Young', team: 'CAR' },
  { name: 'Spencer Rattler', team: 'NO' },
  { name: 'Baker Mayfield', team: 'TB' },
  // NFC WEST
  { name: 'Kyler Murray', team: 'ARI' },
  { name: 'Matthew Stafford', team: 'LAR' },
  { name: 'Brock Purdy', team: 'SF' },
  { name: 'Sam Darnold', team: 'SEA' },
];

async function main() {
  for (const qb of qbs) {
    await prisma.qB.upsert({
      where: { name_team: { name: qb.name, team: qb.team } as any },
      update: {},
      create: qb,
    });
  }
}

main().then(()=>process.exit(0)).catch(e=>{ console.error(e); process.exit(1); });
