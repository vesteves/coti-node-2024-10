export async function POST(req: Request) {
  const res = await fetch('https://3e6d-200-159-140-2.ngrok-free.app/auth/login',
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
