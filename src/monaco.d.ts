/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

declare namespace monaco.languages.moss {
  export interface DiagnosticsOptions {
    /**
     * If set, the validator will be enabled and perform syntax validation as well as schema based validation.
     */
    readonly validate?: boolean;

    /**
     * A list of known schemas and/or associations of schemas to file names.
     */
    readonly schemas?: Array<{
      /**
       * The URI of the schema, which is also the identifier of the schema.
       */
      readonly uri: string;
      /**
       * A list of file names that are associated to the schema. The '*' wildcard can be used. For example '*.schema.json', 'package.json'
       */
      readonly fileMatch?: string[];
      /**
       * The schema for the given URI.
       */
      readonly schema?: any;
    }>;

    /**
     *  If set, the schema service would load schema content on-demand with 'fetch' if available
     */
    readonly enableSchemaRequest?: boolean;
  }

  export interface LanguageServiceDefaults {
    readonly onDidChange: IEvent<LanguageServiceDefaults>;
    readonly diagnosticsOptions: DiagnosticsOptions;
    setDiagnosticsOptions(options: DiagnosticsOptions): void;
  }

  export const mossDefaults: LanguageServiceDefaults;
}
