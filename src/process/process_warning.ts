import process from 'process';

process.on('warning', (warning) => {
    console.warn('warning caught!');
});



function emitMyWarning() {
    //@ts-ignore
    if (!emitMyWarning.warned) {
        process.emitWarning('OH NO', {
            'code': 'EVERYTHING_IS_ON_FIRE',
            'detail': 'Something went wrong you should really check it out'
        });
        //@ts-ignore
        emitMyWarning.warned = true;
    }
}

emitMyWarning(); // warns
emitMyWarning(); // doesn't warn