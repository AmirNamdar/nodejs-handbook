import fs           from 'fs';
import zlib         from 'zlib'
import { pipeline } from 'stream';

// A Utility function from the 'stream' package
// Handle multiple aspects of working with streams: 
    // 1. Pipe between streams and genrators
    // 2. error handling
    // 3. cleanup
    // 4. call callback when pipeline is done

//pipeline to gzip a potentially huge tar file efficiently
pipeline(
    // open a read stream
    fs.createReadStream('archive.tar'),
    // transform chunks of data
    zlib.createGzip(),
    // write the transformed chunk
    fs.createWriteStream('archive.tar.gz'),
    // handle succesful / failed execution
    (err) => {
        if (err) {
            console.error('Pipeline failed', err);
        } else {
            console.log('Pipeline succeeded');
        }
    }
);
