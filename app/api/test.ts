// app/api/test.ts
export async function POST(request: Request) {
  console.log('pls work right now')
    return new Response(JSON.stringify({ message: "Test route working" }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  