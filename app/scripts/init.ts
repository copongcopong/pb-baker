import { $ } from "bun";
import os from "os";
import fs from "fs";
import { generatePassword, generateStr } from "./generate-str";

if (fs.existsSync('./pocketbase')) {
  console.log('PocketBase already exist!');
  process.exit(0);
}

console.log(os.arch(), os.platform())
const version = `0.23.1`;
const dl =`https://github.com/pocketbase/pocketbase/releases/download`;
const pb = `${dl}/v${version}/pocketbase_${version}_${os.platform()}_${os.arch()}`;

await $`wget ${pb}.zip -O _pb.zip`;
console.log('PocketBase downloaded. Will attempt to extract ...');
try {
  await $`unzip _pb.zip`;
  console.log('PocketBase extracted.');
  const pass = generatePassword(20);
  const user = `app@app-${generateStr(5)}.app`;
  await $`./pocketbase superuser upsert ${user} ${pass}`;
  console.log(`Superuser credentials below:`);
  console.log(`email: ${user}`);
  console.log(`pass: ${pass}`);
  
} catch (error) {
  console.log(`Issue extracting zip file.`)
}

process.exit(0);