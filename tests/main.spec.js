const {describe, expect, test} = require("@jest/globals");
const {normalizeURL} = require("../main.js");

describe('main module', () => {
		const normalized = "blog.boot.dev/path";
	test('Function normalizes urls', () => {
		expect(normalizeURL("https://blog.boot.dev/path/wow")).toBe(normalized + '/wow');
	});
	test('Function normalizes urls', () => {
		expect(normalizeURL("https://blog.boot.dev/path/")).toBe(normalized);
	});
	test('Function normalizes urls', () => {
		expect(normalizeURL("http://blog.boot.dev/path/")).toBe(normalized);
	});
	test('Function normalizes urls', () => {
		expect(normalizeURL("http://blog.boot.dev/path")).toBe(normalized);
	});
	test('Function normalizes urls', () => {
		expect(normalizeURL("http://blog.boot.dev")).toBe("blog.boot.dev");
	});
	test('Throws on bad URL', () => {
		expect(() => {normalizeURL("")}).toThrowError("Invalid URL");
	})
});
