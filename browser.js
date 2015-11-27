var openExternal = require("open") // To open the default browser.
var BrowserWindow = require('browser-window')	// Module to create native browser window.


var browserWindows = [] // An array of internal browser windows.

function cleanUp(window) {
	var position

	if (browserWindows[window] !== undefined) { position = window }
	else { position = browserWindows.indexOf(window) }

	if (position === -1) {
		throw new Error("Cannot clean up a browser window that is not in the browser window list")
	} else {
		browserWindows[position] = undefined
	}
}


// Our default web preferences
var defaultWebPreferences = {
	"node-integration": false,
	"web-security": true,
	"allow-displaying-insecure-content": false,
	"allow-running-insecure-content": false
}

function openTrusted(url) {
	var newWindow = new BrowserWindow({"web-preferences": defaultWebPreferences})

	newWindow.webContents.on('new-window', function(event, url, frameName, disposition, options) {
		openUrl(url)
		event.preventDefault()
	})

	newWindow.on('close', function() {
		cleanUp(newWindow)
	})

	newWindow.loadUrl(url)

	browserWindows[browserWindows.push(newWindow)-1] // Save the window
	return newWindow
}


// Open the window either with an external browser or the built in one.
// Note that secure only applies when internal is true.
// trusted is used for things like twitter's settings pages
function openUrl(url, internal, trusted) {
	if (internal === undefined) {
		// TODO: Use a regex to decide if the "internal" or external browser should be used.
		internal = false;
	}

	if (!internal) {
		openExternal(url)
	} else if (trusted) {
		openTrusted(url)
	} else {
		// TODO: Make an internal web browser for non trusted pages
		throw new Error("Internal web browser for untrusted pages is not yet implemented.")
	}
}

// Export the functions
module.exports = {
	"openUrl": openUrl,
	"cleanUp": cleanUp
}
