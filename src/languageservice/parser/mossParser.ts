/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Red Hat, Inc. All rights reserved.
 *  Copyright (c) Adam Voss. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

import { ASTNode, ErrorCode, BooleanASTNode, NullASTNode, ArrayASTNode, NumberASTNode, ObjectASTNode, PropertyASTNode, StringASTNode, IApplicableSchema, JSONDocument } from './jsonParser';

import * as nls from 'vscode-nls';
const localize = nls.loadMessageBundle();

import { Schema, Type } from 'js-yaml';
import * as Yaml from '../../yaml-ast-parser/index'

import { getLineStartPositions, getPosition } from '../utils/documentPositionCalculator'
import { parse as parseYaml, YAMLDocument, recursivelyBuildAst, SingleYAMLDocument } from './yamlParser';

// import { amap } from 'typed-json-transform';
import { load } from 'js-moss';

function convertError(e: any) {
	return { message: `${e.reason}`, location: { start: e.mark.position, end: e.mark.position + e.mark.column, code: ErrorCode.Undefined } }
}

export enum MossErrorCode {
	Undefined = 0,
	Test = 1
}

export class MossDocument {
	public documents: JSONDocument[]
	public errors;
	public warnings;

	constructor(documents: JSONDocument[]) {
		this.documents = documents;
		this.errors = [];
		this.warnings = [];
	}
}

export async function createJSONDocument(root: any, startPositions: number[], text: string) {
	let _doc = new SingleYAMLDocument(startPositions);
	_doc.root = root;

	try {
		const parsed = await load(text);
	}
	catch (e) {
		_doc.errors.push(e);
	}

	return _doc;
}

export async function parse(text: string, customTags = []): Promise<YAMLDocument> {

	const startPositions = getLineStartPositions(text)
	// This is documented to return a YAMLNode even though the
	// typing only returns a YAMLDocument
	const yamlDocs = []

	let schemaWithAdditionalTags = Schema.create(customTags.map((tag) => {
		const typeInfo = tag.split(' ');
		return new Type(typeInfo[0], { kind: typeInfo[1] || 'scalar' });
	}));

	//We need compiledTypeMap to be available from schemaWithAdditionalTags before we add the new custom properties
	customTags.map((tag) => {
		const typeInfo = tag.split(' ');
		schemaWithAdditionalTags.compiledTypeMap[typeInfo[0]] = new Type(typeInfo[0], { kind: typeInfo[1] || 'scalar' });
	});

	let additionalOptions: Yaml.LoadOptions = {
		schema: schemaWithAdditionalTags
	}

	Yaml.loadAll(text, doc => yamlDocs.push({ doc }), additionalOptions);

	// const yamlResult = new YAMLDocument(yamlDocs.map(doc => createJSONDocument(doc, startPositions, text)));

	// const yamlResult = parseYaml(text, customTags);

	// const { documents, errors } = yamlResult;
	// async (doc) => mossDocs.push(doc), additionalOptions);

	// const res = new MossDocument(mossDocs);

	let res = [];
	for (const yamlDoc of yamlDocs) {

		// let _doc = new SingleYAMLDocument(startPositions);
		const root = recursivelyBuildAst(null, yamlDoc)

		// return new YAMLDocument(yamlDocs.map(doc => createJSONDocument(doc, startPositions, text)));
		res.push(await createJSONDocument(root, startPositions, text))
		// return jsDoc;
		// docs.push(parsed.data);
	}

	return res as any;
}