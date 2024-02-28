const {JSDOM} = require("jsdom");


function getURLsFromHTML(htmlBody, baseURL) {
	const dom = new JSDOM(htmlBody);
	const links = []
	dom.window.document.querySelectorAll('a').forEach(a => {
		links.push(baseURL + a.href)
	})
	return links
}

module.exports = {
	getURLsFromHTML
}
