import process, { getegid } from 'process';

// command-line options passed when the Node.js process was launched
console.log(process.argv);

// Node.js executable location
console.log(process.execPath)