var openExternal = require("open"); // To open the default browser.
var BrowserWindow = require('browser-window');	// Module to create native browser window.

// Our default web preferences
var defaultWebPreferences = {
	"node-integration": false,
	"web-security": true,
	"allow-displaying-insecure-content": false,
	"allow-running-insecure-content": false
}

var browserWindows = [] // An array of internal browser windows.

function openInternal(url) {
	var newWindow = new BrowserWindow({"web-preferences": defaultWebPreferences})
	browserWindows[browserWindows.push(newWindow)-1].loadUrl(url)
	return newWindow
}

// Open the window either with an external browser or the built in one.
function openUrl(url, internal) {
	if (internal === undefined) {
		// TODO: Use a regex to decide if the "internal" or external browser should be used.
		internal = false;
	}
	if (internal) {
		return openInternal(url);
	} else {
		openExternal(url, function(error) {
			if(error) { // If the browser didn't open for some reason, then we need to open it in our own window. TODO: stop it from popping up an error message box?
				openUrl(url, true)
			}
		});
	}
}

// Export the functions
module.exports = {
	"openUrl": openUrl
}