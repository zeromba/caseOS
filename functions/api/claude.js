// Cloudflare Pages Function — proxies chat requests to the Anthropic API.
// Keeps your ANTHROPIC_API_KEY server-side; the browser never sees it.
//
// Set the secret before deploying:
//   npx wrangler pages secret put ANTHROPIC_API_KEY --project-name=caseos
// (or add it under Cloudflare dashboard → your Pages project → Settings → Environment variables)

export async function onRequestPost(context) {
  const { request, env } = context;

  if (!env.ANTHROPIC_API_KEY) {
    return new Response(
      JSON.stringify({ error: "Server is missing ANTHROPIC_API_KEY. Set it as a Cloudflare Pages secret." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Only forward the fields the frontend actually sends — don't let callers override the model or inject arbitrary params.
  const { system, messages, max_tokens } = body;
  if (!Array.isArray(messages)) {
    return new Response(JSON.stringify({ error: "messages array is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const payload = {
    model: "claude-sonnet-4-6",
    max_tokens: typeof max_tokens === "number" ? max_tokens : 1000,
    messages,
  };
  if (system) payload.system = system;

  try {
    const upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(payload),
    });

    const data = await upstream.text();
    return new Response(data, {
      status: upstream.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Upstream request failed", detail: String(err) }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// Reject anything that isn't POST
export async function onRequestGet() {
  return new Response(JSON.stringify({ error: "Use POST" }), {
    status: 405,
    headers: { "Content-Type": "application/json" },
  });
}
