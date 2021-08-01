import constants    from '../common/constants';
import stream       from 'stream';
import fs, { read }           from 'fs';

const readFilePath      = './src/executers/readable/beepboop.txt';
const writeFilePath     = './src/executers/readable/yoloFile.txt';
const writableStream    = fs.createWriteStream(writeFilePath);
const readableStream    = fs.createReadStream(readFilePath);

function registerListenersOnReadable(readable: stream.Readable) {
    
    readable.on(constants.readable_stream_event_readable, (data) => {
        console.log(`>>Readable: data is ready to consume`);
        data = readableStream.read();
        if (data) {
            writableStream.write(data);
        }
    });

    readable.on(constants.stream_event_end, () => {
        console.log(`>>Readable: no more data to be consumed from the stream`);
    });

    readable.on(constants.stream_event_close, () => {
        console.log(`>>Readable: underlying resource of readable is closed.`);
    });

    readable.on(constants.readable_stream_event_pause, () => {
        console.log(`>>Readable: switched to not flowing state - PAUSED`);
    });

    readable.on(constants.readable_stream_event_resume, () => {
        console.log(`>>Readable: switched flowing state`);
    });

    readable.on(constants.stream_event_error, (err => {
        console.error(`>>Readable: error occured while reading data. ${err}`);
    }));
}


readableStream.setEncoding('utf8'); // if not set, data will be emitted as a Buffer object
registerListenersOnReadable(readableStream);


console.log(`reading in chunks of ${Math.floor(readableStream.readableHighWaterMark / 1000)}KB~`);
console.log(`encoding data chunks to ${readableStream.readableEncoding}`);