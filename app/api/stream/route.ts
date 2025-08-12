export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const runtime = 'nodejs';

const clients = new Set<WritableStreamDefaultWriter>();
(globalThis as any).__notify = () => {
  const msg = `event: update\ndata: {}\n\n`;
  for (const w of clients) w.write(new TextEncoder().encode(msg));
};

export async function GET() {
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();
  clients.add(writer);
  const interval = setInterval(()=>writer.write(new TextEncoder().encode(`event: ping\ndata: {}\n\n`)), 25000);
  const headers = new Headers({ 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache, no-transform', 'Connection': 'keep-alive' });

  (stream.readable as any).closed?.finally(()=>{ clearInterval(interval); clients.delete(writer); writer.close(); });
  return new Response(stream.readable, { headers });
}
