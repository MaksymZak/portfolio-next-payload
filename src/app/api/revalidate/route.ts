import { revalidateEntireSite } from '@/server/cache/revalidate-all'

export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET

  if (!secret) {
    return Response.json({ ok: false, error: 'REVALIDATE_SECRET is not configured' }, { status: 503 })
  }

  if (request.headers.get('x-revalidate-secret') !== secret) {
    return Response.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  revalidateEntireSite()

  return Response.json({ ok: true })
}
