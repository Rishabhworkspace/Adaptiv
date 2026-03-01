const fs = require('fs');
const path = require('path');

const filePath = process.argv[2] || path.resolve(__dirname, '..', 'required', 'resume.json', 'Rishabh_Tripathi_Resume-2.json');

if (!fs.existsSync(filePath)) {
    process.stderr.write(`Error: File not found: ${filePath}\n`);
    process.exit(1);
}

let data;
try {
    const raw = fs.readFileSync(filePath, 'utf8');
    data = JSON.parse(raw);
} catch (err) {
    process.stderr.write(`Error reading or parsing JSON from ${filePath}: ${err.message}\n`);
    process.exit(1);
}

if (!data?.formImage?.Pages || !Array.isArray(data.formImage.Pages)) {
    process.stderr.write('Error: Parsed JSON does not contain a valid data.formImage.Pages array.\n');
    process.exit(1);
}

function safeDecode(encoded) {
    try {
        return decodeURIComponent(encoded);
    } catch {
        return encoded;
    }
}

let text = '';
data.formImage.Pages.forEach(p => {
    p.Texts.forEach(t => {
        t.R.forEach(r => {
            text += safeDecode(r.T) + ' ';
        });
    });
    text += '\n';
});
console.log(text);
