const fs = require("fs");
const path = require("path");

// Read env variables
let supabaseUrl = "";
let supabaseKey = "";

const envPath = path.join(__dirname, "..", ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  const lines = envContent.split("\n");
  for (const line of lines) {
    if (line.startsWith("NEXT_PUBLIC_SUPABASE_URL=")) {
      supabaseUrl = line.split("=")[1].trim().replace(/"/g, "");
    }
    if (line.startsWith("NEXT_PUBLIC_SUPABASE_ANON_KEY=")) {
      supabaseKey = line.split("=")[1].trim().replace(/"/g, "");
    }
  }
}

console.log("URL:", supabaseUrl);
console.log("Key:", supabaseKey ? supabaseKey.substring(0, 10) + "..." : "missing");

// Import supabase from local node_modules
const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  try {
    const { data, count, error } = await supabase.from("colleges").select("*", { count: "exact" });
    if (error) {
      console.error("Supabase error:", error);
    } else if (data) {
      console.log("Total rows in colleges table:", data.length);
      console.log("Colleges:", data);
    }
  } catch (err) {
    console.error("Execution error:", err);
  }
}

check();
