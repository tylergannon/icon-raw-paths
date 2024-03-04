import fs from 'fs'
import { parse } from 'node-html-parser'

const output = ["export const Icons = {"];
const names = ["export const IconNames = ["];

for (const file of fs.readdirSync('./set-ui/icons')) {
    const name = file.split(".")[0]!
    const document = parse(fs.readFileSync(`./set-ui/icons/${name}.svg`, 'utf-8'))
    const svg = document.querySelector('svg')!.innerHTML
    output.push(`    '${name}': \`${svg}\`,`)
    names.push(`    "${name}",`)
}

output.push("} as const;\n");
names.push("] as const;\n");

fs.writeFileSync("./index.ts", output.join("\n"), "utf-8");
fs.writeFileSync("./names.ts", names.join("\n"), "utf-8");
