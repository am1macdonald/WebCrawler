const { JSDOM } = require('jsdom');
const { normalizeURL } = require('./normalizeURL');

function getURLsFromHTML(htmlBody, baseURL) {
    const dom = new JSDOM(htmlBody);
    const links = [];
    let nav = dom.window.document.querySelector('nav');
    dom.window.document.querySelectorAll('a').forEach((a) => {
        try {
            links.push(normalizeURL(a.href, baseURL));
        } catch (e) {
            console.error('NOTHING WORKS!!! ' + a.href);
        }
    });
    return links;
}

module.exports = {
    getURLsFromHTML,
};
