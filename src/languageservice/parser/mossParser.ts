/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Red Hat, Inc. All rights reserved.
 *  Copyright (c) Adam Voss. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';


import * as Yaml from '../../yaml-ast-parser/index';

import { Schema } from '../../yaml-ast-parser/schema';
import { Type } from '../../yaml-ast-parser/type';
import { ASTNode, ErrorCode, PropertyASTNode } from '../jsonLanguageTypes';
import { getLineStartPositions } from '../utils/documentPositionCalculator';
import { SingleYAMLDocument, YAMLDocument } from '../yamlLanguageTypes';
import {
	ArrayASTNodeImpl,
	BooleanASTNodeImpl,
	NullASTNodeImpl,
	NumberASTNodeImpl,
	ObjectASTNodeImpl,
	PropertyASTNodeImpl,
	StringASTNodeImpl,
} from './jsonParser';
import { parseYamlBoolean } from './scalar-type';
import { DiagnosticSeverity } from 'vscode-languageserver-types';
import * as nls from 'vscode-nls';
const localize = nls.loadMessageBundle();


// import { amap } from 'typed-json-transform';
import { Async } from 'js-moss';

function recursivelyBuildAst(parent: ASTNode, node: Yaml.YAMLNode): ASTNode {
	if (!node) {
		return;
	}

	switch (node.kind) {
		case Yaml.Kind.MAP: {
			const instance = node as Yaml.YamlMap;

			const result = new ObjectASTNodeImpl(
				parent,
				node.startPosition,
				node.endPosition - node.startPosition
			);

			for (const mapping of instance.mappings) {
				result.properties.push(recursivelyBuildAst(
					result,
					mapping
				) as PropertyASTNode);
			}

			return result;
		}
		case Yaml.Kind.MAPPING: {
			const instance = node as Yaml.YAMLMapping;
			const key = instance.key;

			const result = new PropertyASTNodeImpl(
				parent as ObjectASTNodeImpl,
				key.startPosition,
				instance.endPosition - key.startPosition
			);

			result.colonOffset = key.colonPosition;

			// Technically, this is an arbitrary node in YAML
			// I doubt we would get a better string representation by parsing it
			const keyNode = new StringASTNodeImpl(
				result,
				key.startPosition,
				key.endPosition - key.startPosition
			);
			keyNode.value = key.value;
			keyNode.isKey = true;

			// TODO: calculate the correct NULL range.
			const valueNode = instance.value
				? recursivelyBuildAst(result, instance.value)
				: new NullASTNodeImpl(result, instance.endPosition);

			result.keyNode = keyNode;
			result.valueNode = valueNode;

			return result;
		}
		case Yaml.Kind.SEQ: {
			const instance = node as Yaml.YAMLSequence;

			const result = new ArrayASTNodeImpl(
				parent,
				instance.startPosition,
				instance.endPosition - instance.startPosition
			);

			const count = 0;
			for (const item of instance.items) {
				if (item === null && count === instance.items.length - 1) {
					break;
				}

				// Be aware of https://github.com/nodeca/js-yaml/issues/321
				// Cannot simply work around it here because we need to know if we are in Flow or Block
				const itemNode =
					item === null
						? new NullASTNodeImpl(
							parent,
							instance.startPosition,
							instance.endPosition - instance.startPosition
						)
						: recursivelyBuildAst(result, item);

				result.items.push(itemNode);
			}

			return result;
		}
		case Yaml.Kind.SCALAR: {
			const instance = node as Yaml.YAMLScalar;
			const type = Yaml.determineScalarType(instance);

			// The name is set either by the sequence or the mapping case.
			const name = null;
			const value = instance.value;

			// This is a patch for redirecting values with these strings to be boolean nodes because its not supported in the parser.
			const possibleBooleanValues = [
				'y',
				'Y',
				'yes',
				'Yes',
				'YES',
				'n',
				'N',
				'no',
				'No',
				'NO',
				'on',
				'On',
				'ON',
				'off',
				'Off',
				'OFF',
			];
			if (
				instance.plainScalar &&
				possibleBooleanValues.indexOf(value.toString()) !== -1
			) {
				return new BooleanASTNodeImpl(
					parent,
					parseYamlBoolean(value),
					node.startPosition,
					node.endPosition - node.startPosition
				);
			}

			switch (type) {
				case Yaml.ScalarType.null: {
					return new NullASTNodeImpl(
						parent,
						instance.startPosition,
						instance.endPosition - instance.startPosition
					);
				}
				case Yaml.ScalarType.bool: {
					return new BooleanASTNodeImpl(
						parent,
						Yaml.parseYamlBoolean(value),
						node.startPosition,
						node.endPosition - node.startPosition
					);
				}
				case Yaml.ScalarType.int: {
					const result = new NumberASTNodeImpl(
						parent,
						node.startPosition,
						node.endPosition - node.startPosition
					);
					result.value = Yaml.parseYamlInteger(value);
					result.isInteger = true;
					return result;
				}
				case Yaml.ScalarType.float: {
					const result = new NumberASTNodeImpl(
						parent,
						node.startPosition,
						node.endPosition - node.startPosition
					);
					result.value = Yaml.parseYamlFloat(value);
					result.isInteger = false;
					return result;
				}
				case Yaml.ScalarType.string: {
					const result = new StringASTNodeImpl(
						parent,
						node.startPosition,
						node.endPosition - node.startPosition
					);
					result.value = node.value;
					return result;
				}
			}

			break;
		}
		case Yaml.Kind.ANCHOR_REF: {
			const instance = (node as Yaml.YAMLAnchorReference).value;

			return (
				recursivelyBuildAst(parent, instance) ||
				new NullASTNodeImpl(
					parent,
					node.startPosition,
					node.endPosition - node.startPosition
				)
			);
		}
		case Yaml.Kind.INCLUDE_REF: {
			const result = new StringASTNodeImpl(
				parent,
				node.startPosition,
				node.endPosition - node.startPosition
			);
			result.value = node.value;
			return result;
		}
	}
}

function convertError(e: any) {
	return { message: `${e.reason}`, location: { start: e.mark.position, end: e.mark.position + e.mark.column, code: ErrorCode.Undefined } }
}

export enum MossErrorCode {
	Undefined = 0,
	Test = 1
}

export class MossDocument {
	public documents: MossDocument[]
	public errors;
	public warnings;

	constructor(documents: MossDocument[]) {
		this.documents = documents;
		this.errors = [];
		this.warnings = [];
	}
}

export async function createJSONDocument(root: any, startPositions: number[], text: string) {
	let _doc = new SingleYAMLDocument(startPositions);
	_doc.root = root;

	try {
		const parsed = await Async.load(text);
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