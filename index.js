const fs = require('fs')
const path = require('path')

const file = fs.readFileSync(__dirname + '/assets/index.html', 'utf8');

console.log(file)

