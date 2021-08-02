import process from 'process';

process.on('uncaughtException', (err: Error, origin: string) => {
    console.error(`Caught exception:\n${err}\nException origin: ${origin}`
    );
});

//@ts-ignore
evilNotExsistingFuntion();
