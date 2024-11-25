import { $ } from "bun";
import os from "os";
import fs from "fs";
import { generatePassword, generateStr } from "./generate-str";

if (fs.existsSync('./pocketbase')) {
  console.log('PocketBase already exist!');
  process.exit(0);
}

console.log(`Platform check: `, os.arch(), os.platform())
let platform = os.platform();
let arch = os.arch();
if (platform === 'linux' && arch === 'x64') arch = 'amd64';
const version = `0.23.1`;
const dl =`https://github.com/pocketbase/pocketbase/releases/download`;
const pb = `${dl}/v${version}/pocketbase_${version}_${platform}_${arch}`;

try {
  await $`wget ${pb}.zip -O _pb.zip`;
  console.log('PocketBase downloaded. Will attempt to extract ...');
} catch (err) {
  console.log('Issue downloading PocketBase!');
  console.log('See https://github.com/pocketbase/pocketbase/releases .');
  process.exit(0);  
}

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