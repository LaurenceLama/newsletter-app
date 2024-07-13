import mailchimp from "@mailchimp/mailchimp_marketing";

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_SERVER, // e.g. us1
});

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email) new Response(JSON.stringify({ error: "Email is required" }));

  try {
    const res = await mailchimp.lists.addListMember(
      process.env.MAILCHIMP_AUDIENCE_ID!,
      { email_address: email, status: "subscribed" }
    );

    return new Response(JSON.stringify( res ));
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: JSON.parse(error.response.text) })
    );
  }
}
// import mailchimp from "@mailchimp/mailchimp_marketing";

// mailchimp.setConfig({
//   apiKey: process.env.MAILCHIMP_API_KEY,
//   server: process.env.MAILCHIMP_API_SERVER,
// });

// export async function POST(request: Request) {
//   const { email } = await request.json();

//   if (!email) {
//     return new Response(JSON.stringify({ error: "Email is required" }), {
//       status: 400, // Bad Request
//     });
//   }

//   try {
//     const res = await mailchimp.lists.addListMember(
//       process.env.MAILCHIMP_AUDIENCE_ID!,
//       { email_address: email, status: "subscribed" }
//     );

//     return new Response(JSON.stringify({ res }), {
//       status: 200, // Success
//     });
//   } catch (error: any) {
//     console.error("Mailchimp error:", error);

//     return new Response(
//       JSON.stringify({ error: error.message || "Unknown error occurred" }),
//       {
//         status: error.status || 500, // Default to Internal Server Error
//       }
//     );
//   }
// }
