import nextEnv from "@next/env";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const { loadEnvConfig } = nextEnv;

loadEnvConfig(process.cwd());

const baseUrl = process.env.NEXT_PUBLIC_CMS_API_URL;
const apiKey = process.env.NEXT_PUBLIC_CMS_API_KEY;

if (!baseUrl || !apiKey) {
  throw new Error(
    "NEXT_PUBLIC_CMS_API_URL または NEXT_PUBLIC_CMS_API_KEY が設定されていません",
  );
}

const endpoint = new URL("fan-art", `${baseUrl.replace(/\/$/, "")}/`);
endpoint.searchParams.set("limit", "100");
endpoint.searchParams.set("fields", "id,image,url,title");

const response = await fetch(endpoint, {
  headers: { "X-MICROCMS-API-KEY": apiKey },
});

if (!response.ok) {
  throw new Error(
    `microCMS API error: ${response.status} ${response.statusText}`,
  );
}

const { contents = [] } = await response.json();
const outputDirectory = path.join(process.cwd(), "public", "data");
const outputPath = path.join(outputDirectory, "fan-art.json");

await mkdir(outputDirectory, { recursive: true });
await writeFile(outputPath, `${JSON.stringify(contents, null, 2)}\n`);

console.log(`Generated ${outputPath} (${contents.length} items)`);
