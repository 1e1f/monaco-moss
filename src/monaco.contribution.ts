/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

import * as mode from './mossMode';

import Emitter = monaco.Emitter;
import IEvent = monaco.IEvent;

declare var require: <T>(moduleId: [string], callback: (module: T) => void) => void;

// --- YAML configuration and defaults ---------

export class LanguageServiceDefaultsImpl implements monaco.languages.moss.LanguageServiceDefaults {

	private _onDidChange = new Emitter<monaco.languages.moss.LanguageServiceDefaults>();
	private _diagnosticsOptions: monaco.languages.moss.DiagnosticsOptions;
	private _languageId: string;

	constructor(languageId: string, diagnosticsOptions: monaco.languages.moss.DiagnosticsOptions) {
		this._languageId = languageId;
		this.setDiagnosticsOptions(diagnosticsOptions);
	}

	get onDidChange(): IEvent<monaco.languages.moss.LanguageServiceDefaults> {
		return this._onDidChange.event;
	}

	get languageId(): string {
		return this._languageId;
	}

	get diagnosticsOptions(): monaco.languages.moss.DiagnosticsOptions {
		return this._diagnosticsOptions;
	}

	setDiagnosticsOptions(options: monaco.languages.moss.DiagnosticsOptions): void {
		this._diagnosticsOptions = options || Object.create(null);
		this._onDidChange.fire(this);
	}
}

const diagnosticDefault: monaco.languages.moss.DiagnosticsOptions = {
	validate: true,
	schemas: []
}

const mossDefaults = new LanguageServiceDefaultsImpl('moss', diagnosticDefault);


// Export API
function createAPI(): typeof monaco.languages.moss {
	return {
		mossDefaults
	}
}
monaco.languages.moss = createAPI();

// --- Registration to monaco editor ---

function withMode(callback: (module: typeof mode) => void): void {
	require<typeof mode>(['vs/language/moss/mossMode'], callback);
}

monaco.languages.register({
	id: 'moss',
	extensions: ['.moss'],
	aliases: ['MOSS', 'moss'],
	mimetypes: ['application/x-moss']
});
monaco.languages.onLanguage('moss', () => {
	withMode(mode => mode.setupMode(mossDefaults));
});
