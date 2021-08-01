import { finished }         from "stream";
import { createReadStream } from "fs";

const readStream = createReadStream('./src/executers/readable/archive.tar');

const removeListeners = finished(readStream, (err) => {
    if (err) {
        console.error('Stream failed.', err);
    } else {
        console.log('Stream is done reading.');
    }
});

readStream.resume(); // Drain the stream

removeListeners(); // if not called, error events handlers will keep listening to pervent the process from crashing