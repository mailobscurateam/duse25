const fs = require('fs');
const path = require('path');

const rootDir = './public'; // The folder you want to index

function dirToJSON(dir) {
    const stats = fs.statSync(dir);
    const item = { name: path.basename(dir), path: dir.replace('public', ''), type: stats.isDirectory() ? 'dir' : 'file' };

    if (stats.isDirectory()) {
        item.children = fs.readdirSync(dir).map(child => dirToJSON(path.join(dir, child)));
    }
    return item;
}

const structure = dirToJSON(rootDir);
fs.writeFileSync('public/structure.json', JSON.stringify(structure, null, 2));
