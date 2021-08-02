   import process from 'process';

// add a callback to a queue the will will be cleared first thing in the next event loop cycle
// useful when developing API in order to give use option to run callback after an object has been constructed but before any I/O has occurred:
console.log('first');
process.nextTick(() => {
    console.log(`Hoola`);
});
console.log('second');

//executes immediately after process.nextTick()
queueMicrotask(() => {
    console.log(`Hoola`);
});