import process from 'process';

// not fired by process.exit()
process.on('beforeExit', (code) => {
    console.log('Process: going to exit with code: ', code);
});

process.on('exit', (code) => {
    console.log('Process: exiting with code: ', code);
});

process.exitCode = 2;