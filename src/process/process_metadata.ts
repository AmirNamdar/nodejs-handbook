import process from 'process';

// high resolution time of the system
console.log(process.hrtime());          // [seconds, nanoseconds]
console.log(process.hrtime.bigint())    // time represented to the limit of a big int

// get pid
console.log(process.pid);

// get parent pid
console.log(process.ppid);

// get platform
console.log(process.platform);

// get uptime
console.log(process.uptime());