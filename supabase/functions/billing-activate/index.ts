import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { email, status } = await req.json();

    if (!email || status !== "verified") {
      return new Response(
        JSON.stringify({ error: "Invalid activation parameters" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Find contractor by email and activate
    const findRes = await fetch(`${supabaseUrl}/rest/v1/contractors?email=eq.${encodeURIComponent(email)}&select=id,user_id`, {
      headers: {
        "apikey": serviceRoleKey,
        "Authorization": `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json",
      },
    });

    const contractors = await findRes.json();
    if (!contractors || contractors.length === 0) {
      return new Response(
        JSON.stringify({ error: "Contractor not found for this email" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const contractorId = contractors[0].id;

    // Update billing status to active and plan to pro
    const updateRes = await fetch(`${supabaseUrl}/rest/v1/contractors?id=eq.${contractorId}`, {
      method: "PATCH",
      headers: {
        "apikey": serviceRoleKey,
        "Authorization": `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json",
        "Prefer": "return=representation",
      },
      body: JSON.stringify({
        billing_status: "active",
        plan: "pro",
      }),
    });

    if (!updateRes.ok) {
      const errBody = await updateRes.text();
      throw new Error(`Failed to update contractor: ${errBody}`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Account activated successfully",
        contractor_id: contractorId,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    // Log error to error_logs table
    try {
      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
      await fetch(`${supabaseUrl}/rest/v1/error_logs`, {
        method: "POST",
        headers: {
          "apikey": serviceRoleKey,
          "Authorization": `Bearer ${serviceRoleKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          error_type: "edge_function_error",
          message: error instanceof Error ? error.message : String(error),
          stack_trace: error instanceof Error ? error.stack : null,
          path: "/api/billing/activate",
          metadata: { function: "billing-activate" },
        }),
      });
    } catch {
      // Silent fail
    }

    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
