import { cookies } from "next/headers";

export async function POST(req) {
  const { email, password } = await req.json();

  try {
    const response = await fetch(
      "https://api-yeshtery.dev.meetusvr.com/v1/yeshtery/token",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, isEmployee: true }),
      }
    );

    if (!response.ok) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: response.status,
      });
    }

    const data = await response.json();

    cookies().set("token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
