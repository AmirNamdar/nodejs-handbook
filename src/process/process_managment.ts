import process from 'process';

// effective group identity of the Node.js process
console.log(process.getegid());

// effective user identity of the process
console.log(process.geteuid());

// user identify of the process
console.log(process.getuid());

// list of group ids
console.log(process.getgroups());

// kill a process
//process.kill(666666);
// process.kill(666666, 'SIGKILL');

// change a process title
process.title = 'yoloProcess';
console.log(process.title);