// app/api/test.ts
export async function GET(request: Request) {
    return new Response(JSON.stringify({ message: "Test route working" }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  