import { Database } from "https://deno.land/x/sqlite3/mod.ts";
import { assert } from "https://deno.land/std/testing/asserts.ts";
const dataPath = '../nmap-datenfiles';
const db = new Database("nmap_data.db");
const data = './out.csv';

async function createTable() {
    //    await db.query(`
    //  CREATE TABLE IF NOT EXISTS scans (
    //    id INTEGER PRIMARY KEY AUTOINCREMENT,
    //    date DATETIME,
    //    host TEXT,
    //    mac TEXT
    //  )
    //`);
}
function parseDate(dateStr: string): Date {
    const p = dateStr.split('_');
    return new Date(`${p[0]}:${p[1]}:${p[2]}+${p[3]}:${p[4]}`);
}

async function main() {
    await createTable();
    let outputData = "";
    try {
        const dirEntries = await Deno.readDir(dataPath);
        //const promiseArray = [];
        for await (const dirEntry of dirEntries) {
            if (!dirEntry.isFile) {
                continue;
            }
            let date;
            try {
                date = parseDate(dirEntry.name);
            } catch (err) {
                assert(err instanceof Error);
                console.error('Error parsing date:', dirEntry.name, err.message);
                continue;
            }
            const filePath = `${dataPath}/${dirEntry.name}`;
            let host = undefined;
            let mac = undefined;
            for (const line of (await Deno.readTextFile(filePath)).split('\n')) {
                const clean = line.replace (/\r/g, '' );
                if (clean.trim() === '' || clean.startsWith('Starting Nmap')
                    || clean.startsWith('Nmap done') || clean.startsWith('Host is up')) {
                    continue;
                }
                if (clean.startsWith('Nmap scan report for ')) {
                    host = clean.split(' ')[4];
                    continue;
                }
                if (clean.startsWith('MAC Address: ')) {
                    mac = clean.split(' ')[2].toLowerCase();
                    //console.log(`${date.toISOString()};${host};${mac}`);
                    /* promiseArray.push(db.query("INSERT INTO scans (date, host, mac) VALUES (?, ?, ?)", [
                         date.toISOString(),
                         host,
                         mac,
                     ]));
                     promiseArray.length === 7 && console.log(promiseArray);*/
                     outputData += '${data.toISOString()};{host};${mac}\n';
                    console.log(`${date.toISOString()};${host};${mac}`);
                }
            }
        }
        await Deno.writeTextFile(data, outputData);
        //console.log(`waiting for Insertion ${promiseArray.length} rows`);
        //await Promise.all(promiseArray);
        //console.log(`Inserted ${promiseArray.length} rows`);
    } catch (err) {
        console.error('Error reading the file:', err);
    }
}
await main();;