var app = require('app') // Module to control application life.
var Menu = require('menu') // Control the menubar of the program.
var browser = require('./browser.js')

// Report crashes
require('crash-reporter').start()
// Keep a global reference of the window object, if you don't, the window will be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null

// Quit when all windows are closed.
app.on('window-all-closed', function() {
	// On OS X it is common for applications and their menu bar to stay active until the user quits explicitly with Cmd + Q
	if (process.platform != 'darwin') {
		app.quit()
	}
})

// This method will be called when Electron has finished initialization and is ready to create browser windows.
app.on('ready', function() {
	// Create the browser window.
	mainWindow = browser.openUrl('https://tweetdeck.twitter.com', true, true)
})
