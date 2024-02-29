/**
 * @param siteMap
 */
function printReport(siteMap) {
    const links = [];
    console.log('----- Start Report -----');
    Object.entries(siteMap)
        .sort((a, b) => b[1] - a[1])
        .forEach(([key, value]) => {
            console.log(`Found ${value} internal links to ${key}`);
        });
    console.log('----- End Report -----');
}

module.exports = {
    printReport,
};
