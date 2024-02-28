/**
 * Fetches a webpage and returns ...
 * @param baseURL string
 * @param currentURL
 * @param pages
 * @returns {*}
 */
async function crawlPage(baseURL, currentURL, pages) {
	try {
		const result = await fetch(baseURL);
		if (result.status >= 400) {
			console.error('Not found error')
			return;
		} else if (result.headers.has("content-type") && result.headers.get("content-type") === 'text/html') {
			console.error('Not HTML')
			return;
		}
		const thing = await result.text();
		console.log(thing)

	} catch (e) {
		console.error(e)
	}
}

module.exports = {
	crawlPage
}
