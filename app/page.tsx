
'use client';
import { useEffect, useState } from 'react';

type QB = { id:string; name:string; team:string };

export default function VotePage() {
  const [name, setName] = useState('');
  const [qbs, setQbs] = useState<QB[]>([]);
  const [choices, setChoices] = useState<Record<string, number>>({}); // qbId -> tier 1..5
  const ready = name.trim().length >= 2 && qbs.length > 0 && Object.keys(choices).length === qbs.length;

  useEffect(() => { fetch('/api/qbs').then(r=>r.json()).then(setQbs); }, []);

  const submit = async () => {
    const items = qbs.map(q => ({ qbId: q.id, tier: choices[q.id] }));
    const res = await fetch('/api/ballots', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ voterName: name, items })
    });
    if (!res.ok) alert(await res.text());
    else window.location.href = '/leaderboard';
  };

  return (
    <main className="min-h-screen bg-field text-white p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold">Classement des QB par tiers — Saison 2025</h1>
      <p className="text-white/70 mt-1">Choisis un tier (T1 à T5) pour chaque QB. Un seul bulletin par nom.</p>

      <div className="mt-4">
        <label className="block text-sm mb-2">Ton nom (obligatoire)</label>
        <input value={name} onChange={e=>setName(e.target.value)} className="w-full rounded bg-black/40 border border-white/10 px-3 py-2" placeholder="Ex: Julie Dupont" />
      </div>

      <div className="grid md:grid-cols-2 gap-3 mt-6">
        {qbs.map(q => (
          <div key={q.id} className="rounded border border-white/10 p-3 bg-black/30">
            <div className="font-semibold">{q.name} <span className="text-white/60">— {q.team}</span></div>
            <div className="flex gap-2 mt-2">
              {[1,2,3,4,5].map(t => (
                <button key={t}
                  onClick={()=>setChoices({...choices, [q.id]: t})}
                  className={`px-3 py-1 rounded border ${choices[q.id]===t ? 'bg-nflBlue' : 'bg-black/40'} border-white/10`}>
                  T{t}
                </button>
              ))}
            </div>
            {choices[q.id] && <div className="mt-2 text-sm text-white/70">Choisi: T{choices[q.id]}</div>}
          </div>
        ))}
      </div>

      <button onClick={submit} disabled={!ready}
        className={`mt-6 px-5 py-3 rounded font-semibold ${ready ? 'bg-nflRed' : 'bg-white/20 cursor-not-allowed'}`}>
        Envoyer mon bulletin
      </button>
    </main>
  );
}
