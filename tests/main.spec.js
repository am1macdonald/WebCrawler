const { describe, expect, test } = require('@jest/globals');
const { JSDOM } = require('jsdom');
const { normalizeURL } = require('../normalizeURL');
const { getURLsFromHTML } = require('../getURLsFromHTML');

describe('Main can normalize URLS', () => {
    const base = 'http://boot.dev';
    const normalized = 'http://blog.boot.dev/path';
    test('Function normalizes urls', () => {
        expect(normalizeURL('http://blog.boot.dev/path/wow', base)).toBe(
            normalized + '/wow'
        );
    });
    test('Function normalizes urls', () => {
        expect(normalizeURL('http://blog.boot.dev/path/', base)).toBe(
            normalized
        );
    });
    test('Function normalizes urls', () => {
        expect(normalizeURL('http://blog.boot.dev', base)).toBe(
            'http://blog.boot.dev'
        );
    });
    test('Throws on bad URL', () => {
        expect(() => {
            normalizeURL('', base);
        }).toThrowError('Invalid URL');
    });
});

describe('Can get anchors from htmml', () => {
    const base = 'https://blog.boot.dev';
    test('It can get an array of items', () => {
        expect(getURLsFromHTML('<a></a>', base)).toHaveLength(1);
    });
    test('It can get an <a> tag', () => {
        expect(
            getURLsFromHTML(
                `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<a href="/test"></a>
</body>
</html>
		`,
                base
            )[0]
        ).toEqual(base + '/test');
    });
    test('Gets multiple a tags from a proper HTML', () => {
        const dom = new JSDOM();
        expect(
            getURLsFromHTML(
                `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<a href="/test"></a>
<a href="/test2"></a>
</body>
</html>
		`,
                base
            )
        ).toHaveLength(2);
    });
});
