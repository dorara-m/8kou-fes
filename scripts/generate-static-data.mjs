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

const staticDataSources = [
  {
    endpoint: "fan-art",
    fileName: "fan-art.json",
    fields: "id,image,url,title",
  },
  {
    endpoint: "captain",
    fileName: "captain.json",
    fields: "id,image,name,team,comment,x_url,youtube_url,voice_url",
  },
  {
    endpoint: "player",
    fileName: "player.json",
    fields: "id,icon,name,kana,youtube_url,voice_url,x_url,team",
  },
  {
    endpoint: "staff",
    fileName: "staff.json",
    fields: "id,image,image2,name,comment,x_url,youtube_url,voice_url",
  },
];

const outputDirectory = path.join(process.cwd(), "public", "data");
await mkdir(outputDirectory, { recursive: true });

for (const { endpoint: endpointName, fileName, fields } of staticDataSources) {
  const endpoint = new URL(
    endpointName,
    `${baseUrl.replace(/\/$/, "")}/`,
  );
  endpoint.searchParams.set("limit", "100");
  endpoint.searchParams.set("fields", fields);

  const response = await fetch(endpoint, {
    headers: { "X-MICROCMS-API-KEY": apiKey },
  });

  if (!response.ok) {
    throw new Error(
      `${endpointName}: microCMS API error: ${response.status} ${response.statusText}`,
    );
  }

  const { contents = [] } = await response.json();
  const outputPath = path.join(outputDirectory, fileName);
  await writeFile(outputPath, `${JSON.stringify(contents, null, 2)}\n`);

  console.log(`Generated ${outputPath} (${contents.length} items)`);
}
