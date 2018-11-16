const requirejs = require('requirejs');
const path = require('path');
const fs = require('fs');
const UglifyES = require("uglify-es");
const helpers = require('monaco-plugin-helpers');

const REPO_ROOT = path.resolve(__dirname, '..');

const sha1 = helpers.getGitVersion(REPO_ROOT);
const semver = require('../package.json').version;
const headerVersion = semver + '(' + sha1 + ')';

const BUNDLED_FILE_HEADER = [
	'/*!-----------------------------------------------------------------------------',
	' * Copyright (c) Microsoft Corporation. All rights reserved.',
	' * monaco-moss version: ' + headerVersion,
	' * Released under the MIT license',
	' * https://github.com/1e1f/monaco-moss/blob/master/LICENSE.md',
	' *-----------------------------------------------------------------------------*/',
	''
].join('\n');

bundleOne('monaco.contribution');
bundleOne('mossMode');
bundleOne('mossWorker');

function bundleOne(moduleId, exclude) {
	requirejs.optimize({
		baseUrl: 'out/amd/',
		name: 'vs/language/moss/' + moduleId,
		out: 'release/dev/' + moduleId + '.js',
		exclude: exclude,
		paths: {
			'vs/language/moss': REPO_ROOT + '/out/amd'
		},
		optimize: 'none',
		packages: [
			{
				name: 'js-yaml',
				location: path.join(REPO_ROOT, 'node_modules/js-yaml/dist'),
				main: 'js-yaml'
			},
			{
				name: 'js-moss',
				location: path.join(REPO_ROOT, 'node_modules/js-moss/dist'),
				main: 'index'
			},
			// The following is required by YAML language service
			{
				name: 'jsonc-parser',
				location: path.join(REPO_ROOT, 'node_modules/jsonc-parser/lib/umd'),
				main: 'main'
			}, {
				name: 'vscode-json-languageservice/lib',
				location: path.join(REPO_ROOT, 'node_modules/vscode-json-languageservice/lib/umd')
			},

			{
				name: 'vscode-languageserver-types',
				location: path.join(REPO_ROOT, 'node_modules/vscode-languageserver-types/lib/umd'),
				main: 'main'
			}, {
				name: 'vscode-uri',
				location: path.join(REPO_ROOT, 'node_modules/vscode-uri/lib/umd'),
				main: 'index'
			}, {
				name: 'vscode-nls',
				location: path.join(REPO_ROOT, '/out/amd/fillers'),
				main: 'vscode-nls'
			}]
	}, function () {
		const devFilePath = path.join(REPO_ROOT, 'release/dev/' + moduleId + '.js');
		const minFilePath = path.join(REPO_ROOT, 'release/min/' + moduleId + '.js');
		const fileContents = fs.readFileSync(devFilePath).toString();
		console.log();
		console.log(`Minifying ${devFilePath}...`);
		const result = UglifyES.minify(fileContents, {
			output: {
				comments: 'some'
			}
		});
		console.log(`Done.`);
		try { fs.mkdirSync(path.join(REPO_ROOT, 'release/min')) } catch (err) { }
		fs.writeFileSync(minFilePath, BUNDLED_FILE_HEADER + result.code);
	})
}
