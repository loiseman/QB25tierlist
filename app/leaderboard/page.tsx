
'use client';
import { useEffect, useState } from 'react';

type Row = { qbId:string; name:string; team:string; avgTier:number|null; votesCount:number; finalTier:number|null };

export default function Leaderboard() {
  const [rows, setRows] = useState<Row[]>([]);
  const [tab, setTab] = useState<'global'|1|2|3|4|5>('global');

  const load = () => fetch('/api/leaderboard').then(r=>r.json()).then(setRows);

  useEffect(() => {
    load();
    const es = new EventSource('/api/stream');
    es.addEventListener('update', load);
    return () => es.close();
  }, []);

  const filtered = tab === 'global' ? rows : rows.filter(r => r.finalTier === tab);

  return (
    <main className="min-h-screen bg-field text-white p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold">Classement en temps réel</h1>

      <div className="flex gap-2 mt-4">
        {(['global',1,2,3,4,5] as const).map(t => (
          <button key={String(t)} onClick={()=>setTab(t)}
            className={`px-3 py-1 rounded border border-white/10 ${tab===t?'bg-nflBlue':'bg-black/30'}`}>
            {t==='global' ? 'Global' : `Tier ${t}`}
          </button>
        ))}
      </div>

      <div className="mt-4 rounded border border-white/10 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-black/40">
            <tr><th className="p-2">#</th><th>QB</th><th>Équipe</th><th>Moy.</th><th>Votes</th><th>Tier final</th></tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => (
              <tr key={r.qbId} className="odd:bg-black/20">
                <td className="p-2">{i+1}</td>
                <td>{r.name}</td>
                <td>{r.team}</td>
                <td>{r.avgTier ?? '—'}</td>
                <td>{r.votesCount}</td>
                <td>{r.finalTier ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
