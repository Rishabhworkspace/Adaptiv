const fs = require('fs');
const pdf = require('pdf-parse');

const filePath = process.argv[2];

if (!filePath || typeof filePath !== 'string') {
    process.stderr.write('Usage: node parse-pdf.js <file>\n');
    process.exit(1);
}

if (!fs.existsSync(filePath)) {
    process.stderr.write(`Error: File not found: ${filePath}\n`);
    process.exit(1);
}

const dataBuffer = fs.readFileSync(filePath);

pdf(dataBuffer).then(function (data) {
    console.log(data.text);
}).catch(err => console.error(err));
