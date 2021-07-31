import constants    from '../../common/constants';
import stream       from 'stream';

const writeableStream   = new stream.Writable();
const readableStream    = new stream.Readable();

function fillReadableWithBeepBoop(readable: stream.Readable) {
    readable.push('beep\n');
    readable.push('boop\n');
    readable.push('beep\n');
    readable.push('boop\n');
    readable.push('beep\n');
    readable.push('boop\n');
    readable.push(null);
}


function registerListenersOnWritable(writable: stream.Writable) {
    writable.on(constants.writable_stream_event_close, () => {
        console.log(``);
    });

    writable.on(constants.writable_stream_event_drain, () => {
        console.log(``);
    });

    writable.on(constants.writable_stream_event_finish, () => {
        console.log(`Writable: all data has been flished to underlying resouce`);
    });

    writable.on(constants.writable_stream_event_pipe, (readable) => {
        console.log(`Writable: writable has been added as a destination of a readable. ${readable}`);
    });

    writable.on(constants.writable_stream_event_unpipe, (readable) => {
        console.log(`Writable: writable has been removed from a readable destination. ${readable}`);
    });


    writable.on(constants.writable_stream_event_close, () => {
        console.log(``);
    });

    writable.on(constants.writable_stream_event_drain, () => {
        console.log(`Writable: available to writing data again.`);
    });

    writable.on(constants.writable_stream_event_close, () => {
        console.log(`Writable: underlying resource of writable is closed.`);
    });

    writable.on(constants.stream_event_error, (err => {
        console.error(`Writable: error occured while writing data. ${err}`);
    }))
}
registerListenersOnWritable(writeableStream);
// fillReadableWithBeepBoop(readableStream);
readableStream.push('beep\n');
readableStream.push('boop\n');
readableStream.push('beep\n');
readableStream.push('boop\n');
readableStream.push('beep\n');
readableStream.push('boop\n');
readableStream.push(null);
readableStream.pipe(writeableStream);
// readableStream.unpipe(writeableStream);