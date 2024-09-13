import { prisma } from "@/lib/prisma";
import type { APIRoute } from "astro";

export async function GET({}) {
  // const gemini_api = import.meta.env.GEMINI_API_KEY;
  return new Response(
    JSON.stringify({ msg: "Welcome to Crest Properties, the builders" }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const email = body.email;

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      const profile = await prisma.profile.create({
        data: {
          bio: "My bio",
          userId: existingUser.id,
        },
      });
      console.log(profile);
    }

    return new Response(JSON.stringify({ reply: "text", existingUser }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error processing the AI response:", error);

    return new Response(
      JSON.stringify({ error: "Failed to process the AI response" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
};
