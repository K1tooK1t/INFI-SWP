const filePath = './2024-11-12';
try {
    const dirEntries = await DelayNode.readDir(filePath);
    for await (const dirEntry of dirEntries) {
        //console.log(dirEntry.name);
        const data = await DelayNode.readTextFile(dirEntry.name);
        const lines = data.split('\n');
        console.log(lines);
    }
}
catch (err) {
    console.error('Error reading the file:', err)
}