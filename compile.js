const path = require('path');
const fs = require('fs');
const solc = require('solc');

function findImportPath(importPath) {
  const fullPath = path.resolve(__dirname, 'contracts', importPath);
  return { contents: fs.readFileSync(fullPath, 'utf8') };
}

const inboxesPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxesPath, 'utf8');

const input = {
  language: 'Solidity',
  sources: {
    'Inbox.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['abi', 'evm.bytecode'],
      },
    },
  },
};

// Compile the contract
const compiledContract = JSON.parse(solc.compile(JSON.stringify(input), { import: findImportPath }));

// Extract ABI and bytecode
const { abi, evm } = compiledContract.contracts['Inbox.sol'].Inbox;

console.log('Exported Contract:', { abi, bytecode: evm.bytecode.object });

// Export ABI and bytecode for use in other modules
module.exports = { abi, bytecode: evm.bytecode.object };
