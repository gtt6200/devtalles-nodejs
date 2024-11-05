import { yarg } from "./config/plugins/args.plugin";


import fs from "fs";

const { b: base, l: limit, s: showTable } = yarg;

let header: string = `
==========================
    TABLA DEL ${base}
==========================\n
`;

let outputMessage: string = "";
for (let i = 1; i <= limit; i++) {
    outputMessage += `${base} X ${i} = ${base * i}\n`;
}

outputMessage = header + outputMessage;


//console.log(outputMessage);

const outputPath: string = "outputs"
fs.mkdirSync(outputPath, { recursive: true });

function saveAndShowFileSync(): void {
    console.log(outputMessage);
    fs.writeFileSync(`${outputPath}/tabla del ${base}.txt`, outputMessage);
    console.log("File created succefull");
}

showTable == true ? saveAndShowFileSync() : false;
