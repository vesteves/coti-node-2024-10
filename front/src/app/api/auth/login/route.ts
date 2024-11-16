export async function POST(req: Request) {
  const res = await fetch('http://localhost:8000/auth/login',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(await req.json())
    }
  )

  const data = await res.json()
  
  return Response.json({ data })
}
