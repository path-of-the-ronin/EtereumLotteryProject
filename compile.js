const path = require('path');
const fs = require('fs');
const solc = require('solc');

const lotteryPath = path.resolve(__dirname, 'contracts', 'Lottery.sol');
const source = fs.readFileSync(lotteryPath, 'UTF-8');

// The digit 1 is indicative of the number of smart contracts compiled.
console.log(solc.compile(source, 1));

// For exporting the object
module.exports = solc.compile(source, 1).contracts[':Lottery'];