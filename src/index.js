const fs = require('fs')
const path = require('path')

const file = fs.readFileSync(path.join(__dirname, '..', 'assets', 'index.html'), 'utf8');
const fileLog = String(fs.readFileSync(path.join(__dirname, 'log.txt')));

console.log(file)
console.log(fileLog)

