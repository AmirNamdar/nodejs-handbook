import process from 'process';

process.on('multipleResolves', (type, promise, reason) => {
    console.error(`duplicate promise resolution occured.`);
    console.error(`resolution: ${type}`);
    console.error(`promise first resolution: ${promise}`);
    console.error(`promise last resolution: ${reason}`);
    process.exit(1);
});

async function main() {

    try {
        return await new Promise((resolve, reject) => {
            resolve('First resolve');
            reject(new Error('Third swallowed reject'));
        });
    } catch {
        throw new Error('Failed');
    }
}

main().then();