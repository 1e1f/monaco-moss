/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

<<<<<<< HEAD:src/yaml.worker.ts
import * as worker from 'monaco-editor/esm/vs/editor/editor.worker';
import { YAMLWorker } from './yamlWorker';

self.onmessage = () => {
  // ignore the first message
  worker.initialize((ctx, createData) => {
    return new YAMLWorker(ctx, createData);
  });
=======
import * as worker from 'monaco-editor-core/esm/vs/editor/editor.worker';
import { MossWorker } from './mossWorker';

self.onmessage = () => {
	worker.initialize((ctx, data) => {
		return new MossWorker(ctx, data);
	});
>>>>>>> 27b8e1bca91dac4064e513972d3f82f459ede4f4:src/moss.worker.ts
};
