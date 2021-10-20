import * as fs from 'fs';
const DATA_FILE =  './discord-data.json'

const discordData = require(DATA_FILE);

export const data = discordData;

export function update(newData: unknown) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(newData));
}
