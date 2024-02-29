const { getURLsFromHTML } = require('./getURLsFromHTML');
const url = require('url');
const { normalizeURL } = require('./normalizeURL');

/**
 * Fetches a webpage and returns ...
 * @param baseURL string
 * @param currentURL
 * @param pages
 * @returns {*}
 */
async function crawlPage(baseURL, currentURL, pages) {
    if (new URL(currentURL).hostname !== new URL(baseURL).hostname) {
        return;
    }
    const normalized = normalizeURL(currentURL, baseURL);
    if (pages[normalized] !== undefined) {
        if (baseURL !== currentURL) {
            pages[normalized] += 1;
        }
        return;
    } else if (baseURL === currentURL) {
        pages[normalized] = 0;
    } else {
        pages[normalized] = 1;
    }
    try {
        const result = await fetch(normalized, {
            signal: AbortSignal.timeout(5000),
        });
        if (result.status >= 400) {
            console.error('Not found: ' + currentURL);
            return;
        } else if (
            result.headers.has('content-type') &&
            result.headers.get('content-type') === 'text/html'
        ) {
            console.error('Not HTML: ' + currentURL);
            return;
        }
        const html = await result.text();
        for await (let url of getURLsFromHTML(html, baseURL)) {
            await crawlPage(baseURL, url, pages);
        }
    } catch (e) {
        console.error(currentURL + ' : ' + e);
    }
    return pages;
}

module.exports = {
    crawlPage,
};
