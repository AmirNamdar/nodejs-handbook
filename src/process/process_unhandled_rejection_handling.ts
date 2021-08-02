import process from 'process';

process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});

async function rejectDaPromise() {
    return await new Promise((resolve, reject) => {
        //@ts-ignore
        resolve(boop());
    });
}

rejectDaPromise();