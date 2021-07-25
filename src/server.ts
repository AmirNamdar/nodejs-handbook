import express from 'express';
import fs from 'fs';

const app   = express()
const port  = 80


app.get('/not_streamed_text', (req, res) => {
    fs.readFile('assets/SampleText-1-905mb.txt', function (err, data) {
        res.end(data);
        const memoryUsed = process.memoryUsage().heapUsed / 1024 / 1024;
        console.log(`The script uses approximately ${Math.round(memoryUsed * 100) / 100} MB`);
    });
});


app.get('/streamed_text', (req, res) => {
    var stream = fs.createReadStream('assets/SampleText-1-905mb.txt');
    stream.pipe(res);
    const memoryUsed = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`The script uses approximately ${Math.round(memoryUsed * 100) / 100} MB`);
});


app.listen(port, () => {
    console.log(`Streaming app listening at http://localhost:${port}`)
});