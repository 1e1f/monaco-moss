/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Red Hat, Inc. All rights reserved.
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

import { JSONSchemaService } from "./services/jsonSchemaService";
import {
  TextDocument,
  Position,
  CompletionList,
  FormattingOptions,
  Diagnostic
} from "vscode-languageserver-types";
import { JSONWorkerContribution } from './jsonContributions';
import { JSONSchema } from "./jsonSchema";
import { MossDocumentSymbols } from "./services/documentSymbols";
import { MossCompletion } from "./services/mossCompletion";
import { MossFormatter } from './services/mossFormatter';
import { JSONDocument } from "vscode-json-languageservice";
import { MossHover } from "./services/mossHover";
import { MossValidation } from "./services/mossValidation";
import { parse as parseMoss } from "./parser/mossParser";
// import { parse as parseYaml } from "./parser/yamlParser";

export interface LanguageSettings {
  validate?: boolean; // Setting for whether we want to validate the schema
  hover?: boolean; // Setting for whether we want to have hover results
  completion?: boolean; // Setting for whether we want to have completion results
  isKubernetes?: boolean; // If true then its validating against kubernetes
  schemas?: any[]; // List of schemas,
  customTags?: string[]; // Array of Custom Tags
}

export type MossDocument = { documents: JSONDocument[] };

export interface Thenable<R> {
  /**
  * Attaches callbacks for the resolution and/or rejection of the Promise.
  * @param onfulfilled The callback to execute when the Promise is resolved.
  * @param onrejected The callback to execute when the Promise is rejected.
  * @returns A Promise for the completion of which ever callback is executed.
  */
  then<TResult>(
    onfulfilled?: (value: R) => TResult | Thenable<TResult>,
    onrejected?: (reason: any) => TResult | Thenable<TResult>
  ): Thenable<TResult>;
  then<TResult>(
    onfulfilled?: (value: R) => TResult | Thenable<TResult>,
    onrejected?: (reason: any) => void
  ): Thenable<TResult>;
}

export interface WorkspaceContextService {
  resolveRelativePath(relativePath: string, resource: string): string;
}
/**
 * The schema request service is used to fetch schemas. The result should the schema file comment, or,
 * in case of an error, a displayable error string
 */
export interface SchemaRequestService {
  (uri: string): Thenable<string>;
}

export interface SchemaConfiguration {
	/**
	 * The URI of the schema, which is also the identifier of the schema.
	 */
  uri: string;
	/**
	 * A list of file names that are associated to the schema. The '*' wildcard can be used. For example '*.schema.json', 'package.json'
	 */
  fileMatch?: string[];
	/**
	 * The schema for the given URI.
	 * If no schema is provided, the schema will be fetched with the schema request service (if available).
	 */
  schema?: JSONSchema;
}

export interface LanguageService {
  configure(settings): void;
  doComplete(document: TextDocument, position: Position, doc): Thenable<CompletionList>;
  doValidation(document: TextDocument, mossDocument): Thenable<Diagnostic[]>;
  doHover(document: TextDocument, position: Position, doc);
  findDocumentSymbols(document: TextDocument, doc);
  doResolve(completionItem);
  resetSchema(uri: string): boolean;
  doFormat(document: TextDocument, options: FormattingOptions, customTags: Array<String>);
  parseDocument(document: TextDocument): Promise<MossDocument>;
}

export function getLanguageService(
  schemaRequestService: SchemaRequestService,
  workspaceContext: WorkspaceContextService,
  contributions: JSONWorkerContribution[]
): LanguageService {
  const schemaService = new JSONSchemaService(
    schemaRequestService,
    workspaceContext
  );

  let completer = new MossCompletion(schemaService, contributions);
  let hover = new MossHover(schemaService, contributions);
  const mossDocumentSymbols = new MossDocumentSymbols(schemaService);
  const mossValidation = new MossValidation(schemaService);
  const mossFormatter = new MossFormatter();

  return {
    configure: settings => {
      schemaService.clearExternalSchemas();
      if (settings.schemas) {
        settings.schemas.forEach(settings => {
          schemaService.registerExternalSchema(
            settings.uri,
            settings.fileMatch,
            settings.schema
          );
        });
      }

      mossValidation.configure(settings);
      hover.configure(settings);
      completer.configure(settings);
      mossFormatter.configure(settings);
    },
    registerCustomSchemaProvider: (schemaProvider: CustomSchemaProvider) => {
      schemaService.registerCustomSchemaProvider(schemaProvider);
    },
    doComplete: completer.doComplete.bind(completer),
    doResolve: completer.doResolve.bind(completer),
    doValidation: mossValidation.doValidation.bind(mossValidation),
    doHover: hover.doHover.bind(hover),
    findDocumentSymbols: mossDocumentSymbols.findDocumentSymbols.bind(
      mossDocumentSymbols
    ),
    findDocumentColors: mossDocumentSymbols.findDocumentColors.bind(
      mossDocumentSymbols
    ),
    getColorPresentations: mossDocumentSymbols.getColorPresentations.bind(
      mossDocumentSymbols
    ),
    resetSchema: (uri: string) => schemaService.onResourceChange(uri),
    doFormat: mossFormatter.doFormat.bind(mossFormatter),
    parseMossDocument: (document: TextDocument) =>
      parseMoss(document.getText()),
  };
}

// export function getLanguageService(
//   schemaRequestService, 
//   workspaceContext, 
//   contributions, customSchemaProvider, promiseConstructor?): LanguageService {
//   let promise = promiseConstructor || Promise;

//   let schemaService = new JSONSchemaService(schemaRequestService, workspaceContext, customSchemaProvider);

//   let completer = new MossCompletion(schemaService, contributions, promise);
//   let hover = new MossHover(schemaService, contributions, promise);
//   let mossDocumentSymbols = new MossDocumentSymbols();
//   let mossValidation = new MossValidation(schemaService, promise);

//   return {
//     configure: (settings) => {
//       schemaService.clearExternalSchemas();
//       if (settings.schemas) {
//         settings.schemas.forEach(settings => {
//           schemaService.registerExternalSchema(settings.uri, settings.fileMatch, settings.schema);
//         });
//       }
//       mossValidation.configure(settings);
//       let customTagsSetting = settings && settings["customTags"] ? settings["customTags"] : [];
//       completer.configure(customTagsSetting);
//     },
//     doComplete: completer.doComplete.bind(completer),
//     doResolve: completer.doResolve.bind(completer),
//     doValidation: mossValidation.doValidation.bind(mossValidation),
//     doHover: hover.doHover.bind(hover),
//     findDocumentSymbols: mossDocumentSymbols.findDocumentSymbols.bind(mossDocumentSymbols),
//     resetSchema: (uri: string) => schemaService.onResourceChange(uri),
//     doFormat: format,
//     parseDocument: (document: TextDocument) => parseMoss(document.getText())
//   }
// }
