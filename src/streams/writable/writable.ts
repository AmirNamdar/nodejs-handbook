import constants    from '../common/constants';
import stream       from 'stream';
import fs           from 'fs';

const readFilePath      = './src/executers/writable/beepboop.txt';
const writeFilePath     = './src/executers/writable/yoloFile.txt';
const writableStream    = fs.createWriteStream(writeFilePath);
const readableStream    = fs.createReadStream(readFilePath);

function registerListenersOnWritable(writable: stream.Writable) {
    writable.on(constants.writable_stream_event_finish, () => {
        console.log(`>>Writable: all data has been flushed to underlying resource`);
    });

    writable.on(constants.writable_stream_event_pipe, (readable) => {
        console.log(`>>Writable: writable has been added as a destination of a readable. ${readable.path}`);
    });

    writable.on(constants.writable_stream_event_unpipe, (readable) => {
        console.log(`>>Writable: writable has been removed from a readable destination. ${readable.path}`);
    });

    writable.on(constants.stream_event_close, () => {
        console.log(`>>Writable: underlying resource of writable is closed.`);
    });

    writable.on(constants.writable_stream_event_drain, () => {
        console.log(`>>Writable: available to writing data again.`);
    });

    writable.on(constants.stream_event_error, (err => {
        console.error(`>>Writable: error occured while writing data. ${err}`);
    }))
}

function writeToWritableNTimes(writable: stream.Writable, callAmount: number) {
    let writesLeft = callAmount;
    writeToWritable();

    function writeToWritable() {
        let statusOk = true;
        do {
            writesLeft -= 1;
            const contentToWrite = `${writesLeft.toString()}\n`;
            const isLastRound = writesLeft == 0;
            if (isLastRound) {
                // call callback after writing
                writable.write(contentToWrite, () => {
                    writableStream.end(); // Trigger 'finish' event
                })
            }
            statusOk = writable.write(contentToWrite)
        } while(writesLeft > 0 && statusOk);

        if(writesLeft > 0) {
            writable.once(constants.writable_stream_event_drain, writeToWritable);
        }
    }
}

registerListenersOnWritable(writableStream);
const pipeConfig = {
    'end': false    // It's crucial to leave the stream open after the pipe has finished
};

readableStream.pipe(writableStream, pipeConfig); 

readableStream.on(constants.stream_event_end, () => {
    readableStream.unpipe(writableStream);          // Trigger 'unpipe' event
    writeToWritableNTimes(writableStream, 10000);   // Clog the writable to trigger 'drain' event
    writableStream.close();
    writableStream.write('bye');                    // write to a closed stream to trigger 'error' event
});