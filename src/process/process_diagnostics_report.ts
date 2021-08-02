import process from 'process';

// Get report object
    // @ts-ignore
const report = process.report.getReport();
// @ts-ignore
const report = process.report.getReport(new Error('custom error'));
// console.log(report);


// Write report to file system
    // @ts-ignore
process.report?.directory = './src/process';
const reportName = 'my_report.json';
process.report?.writeReport();


// Pass exception to report
try {
    process.chdir('/oops-i-did-it-again');
} catch (err) {
    // @ts-ignore
    process.report.writeReport(reportName, err);
}


// report trigger configuration
    // @ts-ignore
process.report.reportOnFatalError = true;
    // @ts-ignore
process.report.reportOnSignal = true;
    // @ts-ignore
process.report.reportOnUncaughtException = true;
// change the default signal 
    // @ts-ignore
process.report.signal = 'SIGQUIT';

