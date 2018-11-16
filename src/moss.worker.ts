/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

import * as worker from 'monaco-editor-core/esm/vs/editor/editor.worker';
import { MossWorker } from './mossWorker';

self.onmessage = (e) => {
	// console.log('Message received from main script', e);
	// if (e.data === "console") {
	// 	// Define the console object
	// 	(<any>self).console = {
	// 		_port: e.ports[0],           // Remember the port we log to
	// 		log: function log() {        // Define console.log()
	// 			// Copy the arguments into a real array
	// 			var args = Array.prototype.slice.call(arguments);
	// 			// Send the arguments as a message, over our side channel
	// 			(<any>console)._port.postMessage(args);
	// 		}
	// 	};

	// 	// Get rid of this event handler
	// 	onmessage = null;

	// 	// Now run the script that was originally passed to Worker()
	// 	var url = location.hash.substring(1); // Get the real URL to run
	// 	(<any>self).importScripts(url);                   // Load and run it now
	// }
	// ignore the first message
	worker.initialize((ctx, createData) => {
		return new MossWorker(ctx, createData)
	});
};
