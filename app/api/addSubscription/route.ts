import { MembersSuccessResponse } from "@/types";
import { lists, ErrorResponse } from "@mailchimp/mailchimp_marketing";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const { email }: { email: string } = await request.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
    const API_KEY = process.env.MAILCHIMP_API_KEY;
    const DATACENTER = process.env.MAILCHIMP_API_SERVER;

    if (!AUDIENCE_ID || !API_KEY || !DATACENTER) {
      throw new Error("Mailchimp configuration is missing");
    }

    // Again here, we are using lists.AddListMemberBody from the Mailchimp SDK to define the dataToSend object. This object contains the proper structure for the request body so we never make a mistake in sending the data to the Mailchimp API.
    const dataToSend: lists.AddListMemberBody = {
      email_address: email,
      status: "subscribed",
    };

    const res = await fetch(
      `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`,
      {
        body: JSON.stringify(dataToSend),
        headers: {
          Authorization: `apikey ${API_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
      }
    );

    // The response from the Mailchimp API is parsed as JSON and stored in the data variable. If the response is not successful, an error is thrown with the error message from the response. If the response is successful, the data is cast to the MembersSuccessResponse type and returned as a JSON response with a status of 200.
    const data: MembersSuccessResponse | ErrorResponse = await res.json();

    if (!res.ok) {
      const errorData = data as ErrorResponse;
      throw new Error(errorData.detail);
    }

    const successData = data as MembersSuccessResponse;

    console.log(`Mailchimp response: ${JSON.stringify(successData)}`);

    return NextResponse.json(successData, { status: 200 });
  } catch (error) {
    console.error("Error adding member to Mailchimp:", error);

    return NextResponse.json(
      { error: (error as Error).message || "An unknown error occurred" },
      { status: 500 }
    );
  }
}
