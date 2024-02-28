// print process.argv
/**
 * Normalize the URL
 * @param urlString
 * @returns {string}
 */
function normalizeURL(urlString) {
	const url = new URL(urlString);
	let str = url.hostname;
	if (url.pathname.at(-1) === '/') {
		str += url.pathname.slice(0, -1)
	} else {
		str += url.pathname
	}
	return str
}

module.exports = {
	normalizeURL
}
