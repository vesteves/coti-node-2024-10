export async function POST(req: Request) {
  const res = await fetch('http://localhost:8000/auth/register',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: await req.json()
    }
  )
  const data = await res.json()
  
  return Response.json({ data })
}