// Downloads the notebook's fonts into public/fonts before `npm run dev` and `npm run build`.
// Neither may be redistributed through a public repository, so they are fetched here and
// kept out of git (see .gitignore). If a download fails, the site falls back to Patrick Hand
// (loaded by next/font) and the system sans.
//
// - General Sans (Fontshare, ITF Free Font License): the "printed" type on the notebook.
// - GingerInk by yebhutype (FontSpace, free for personal, non-commercial use only; a
//   commercial licence is sold at https://yebhutype.gumroad.com/l/GingerInk): the titles.
import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { inflateRawSync } from "node:zlib";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dir = path.join(root, "public", "fonts");
const exists = (file) => access(file).then(() => true, () => false);

async function generalSans() {
  const files = { 400: "GeneralSans-Regular.woff2", 500: "GeneralSans-Medium.woff2" };
  const wanted = Object.values(files).map((name) => path.join(dir, name));
  if ((await Promise.all(wanted.map(exists))).every(Boolean)) return;
  const css = await (await fetch("https://api.fontshare.com/v2/css?f[]=general-sans@400,500&display=swap")).text();
  let saved = 0;
  for (const block of css.split("@font-face").slice(1)) {
    const weight = block.match(/font-weight:\s*(\d+)/)?.[1];
    const url = block.match(/url\('([^']+\.woff2)'\)/)?.[1];
    if (!weight || !url || !files[weight]) continue;
    const response = await fetch(url.startsWith("//") ? `https:${url}` : url);
    if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`);
    await writeFile(path.join(dir, files[weight]), Buffer.from(await response.arrayBuffer()));
    saved++;
  }
  if (saved < Object.keys(files).length) throw new Error(`found ${saved} General Sans weights`);
}

/** Pulls one file out of a zip archive held in memory. */
function unzip(zip, test) {
  const eocd = zip.lastIndexOf(Buffer.from([0x50, 0x4b, 0x05, 0x06]));
  if (eocd < 0) throw new Error("not a zip archive");
  let offset = zip.readUInt32LE(eocd + 16);
  const entries = zip.readUInt16LE(eocd + 10);
  for (let i = 0; i < entries; i++) {
    const method = zip.readUInt16LE(offset + 10);
    const size = zip.readUInt32LE(offset + 20);
    const nameLength = zip.readUInt16LE(offset + 28);
    const skip = nameLength + zip.readUInt16LE(offset + 30) + zip.readUInt16LE(offset + 32);
    const local = zip.readUInt32LE(offset + 42);
    const name = zip.toString("utf8", offset + 46, offset + 46 + nameLength);
    if (test(name)) {
      const start = local + 30 + zip.readUInt16LE(local + 26) + zip.readUInt16LE(local + 28);
      const data = zip.subarray(start, start + size);
      return method === 8 ? inflateRawSync(data) : data;
    }
    offset += 46 + skip;
  }
  throw new Error("file not found in the archive");
}

async function gingerInk() {
  const file = path.join(dir, "GingerInk.woff2");
  if (await exists(file)) return;
  const response = await fetch("https://www.fontspace.com/get/family/m1doe", { headers: { "user-agent": "Mozilla/5.0" } });
  if (!response.ok) throw new Error(`HTTP ${response.status} from FontSpace`);
  const font = unzip(Buffer.from(await response.arrayBuffer()), (name) => /gingerink.*\.woff2$/i.test(name));
  await writeFile(file, font);
}

await mkdir(dir, { recursive: true });
for (const [name, task] of [["General Sans", generalSans], ["GingerInk", gingerInk]]) {
  try {
    await task();
  } catch (error) {
    console.warn(`fetch-fonts: could not download ${name} (${error.message}); the site will fall back.`);
  }
}
