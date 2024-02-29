const { JSDOM } = require('jsdom');
const { argv } = require('node:process');
const { crawlPage } = require('./crawl');
const { printReport } = require('./report');

function main() {
    if (argv.length < 3) {
        console.error('No args...');
    } else if (argv.length > 3) {
        console.error('Too many arguments.');
    } else {
        const url = argv[2];
        console.log(`Starting crawl at ${url}`);
        crawlPage(url, url, {}).then((res) => printReport(res));
    }
}

main();
