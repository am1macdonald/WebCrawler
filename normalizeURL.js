// print process.argv
/**
 * Normalize the URL
 * @param urlString
 * @returns {string}
 */
function normalizeURL(urlString, baseUrl) {
    const url = new URL(baseUrl);
    if (urlString[0] == '/') {
        url.pathname = urlString;
    } else {
        url.href = urlString;
    }

    let str = url.origin;
    if (url.pathname.at(-1) === '/') {
        str += url.pathname.slice(0, -1);
    } else {
        str += url.pathname;
    }
    return str;
}

module.exports = {
    normalizeURL,
};
