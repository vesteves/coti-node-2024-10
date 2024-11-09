export async function GET() {
  const res = await fetch('http://localhost:8000/user',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }
    }
  )
  const data = await res.json()
  
  return Response.json({ data })
}
