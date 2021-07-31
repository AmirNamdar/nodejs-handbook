import constants    from '../common/constants';

import http         from 'http';
import stream       from 'stream';

const port = 1313;

const acceptableEncoding = constants.encoding_utf8 as BufferEncoding; // List of supported encodings: https://github.com/nodejs/node/blob/master/lib/buffer.js

const serverCallback = ((req: http.IncomingMessage | stream.Readable , res: http.ServerResponse | stream.Writable) => {
    let rawBody = '';

    req.on(constants.stream_event_data, (chunk) => { //todo use type
        console.log(`accepted new chunk of data: ${chunk}`);
        const chunkString = chunk.toString(acceptableEncoding);
        rawBody += chunkString;
    })

    req.on(constants.stream_event_end, () => {
        try {
            const requestBody = JSON.parse(rawBody);
            console.log(`request body: ${requestBody}`);
            res.end('Thanks!'); // WritableStream interface
            process.exit();
        }
        catch (e) {
            res.statusCode = 400;
            res.end('invalid input, expecting JSON'); // WritableStream interface
            process.exit();
        }
    });
});

const server = http.createServer(serverCallback);
server.listen(port);
console.log(`server is listening on localhost:${port}`);