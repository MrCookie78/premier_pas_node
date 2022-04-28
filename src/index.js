const fs = require('fs')
const path = require('path')

const file = fs.readFileSync(path.join(__dirname, '..', 'assets', 'index.html'), 'utf8');
const fileLog = fs.readFileSync(path.join(__dirname, 'log.txt'), 'utf8');

console.log(file)
console.log(fileLog)

