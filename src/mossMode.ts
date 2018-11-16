/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

import { WorkerManager } from './workerManager';
import { MossWorker } from './mossWorker';
import { LanguageServiceDefaultsImpl } from './monaco.contribution';
import { tokenProvider, languageConf } from './mossLanguage'
import * as languageFeatures from './languageFeatures';

import Promise = monaco.Promise;
import Uri = monaco.Uri;
import IDisposable = monaco.IDisposable;

export function setupMode(defaults: LanguageServiceDefaultsImpl): void {

	let disposables: IDisposable[] = [];

	const client = new WorkerManager(defaults);
	disposables.push(client);

	const worker: languageFeatures.WorkerAccessor = (...uris: Uri[]): Promise<MossWorker> => {
		return client.getLanguageServiceWorker(...uris);
	};

	let languageId = defaults.languageId;

	disposables.push(monaco.languages.registerCompletionItemProvider(languageId, new languageFeatures.CompletionAdapter(worker)));
	disposables.push(monaco.languages.registerHoverProvider(languageId, new languageFeatures.HoverAdapter(worker)));
	disposables.push(monaco.languages.registerDocumentSymbolProvider(languageId, new languageFeatures.DocumentSymbolAdapter(worker)));
	disposables.push(monaco.languages.registerDocumentFormattingEditProvider(languageId, new languageFeatures.DocumentFormattingEditProvider(worker)));
	disposables.push(monaco.languages.registerDocumentRangeFormattingEditProvider(languageId, new languageFeatures.DocumentRangeFormattingEditProvider(worker)));
	disposables.push(new languageFeatures.DiagnosticsAdapter(languageId, worker, defaults));
	disposables.push(monaco.languages.setMonarchTokensProvider(languageId, tokenProvider as any));
	disposables.push(monaco.languages.setLanguageConfiguration(languageId, languageConf as any));
}