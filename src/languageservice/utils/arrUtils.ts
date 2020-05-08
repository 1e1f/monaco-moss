import { SingleYAMLDocument, YAMLDocument } from '../yamlLanguageTypes';

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Red Hat, Inc. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
<<<<<<< HEAD
import { SingleYAMLDocument } from '../parser/yamlParser04';

=======
>>>>>>> 27b8e1bca91dac4064e513972d3f82f459ede4f4
export function removeDuplicates(arr, prop) {
  const new_arr = [];
  const lookup = {};

  for (const i in arr) {
    lookup[arr[i][prop]] = arr[i];
  }

  for (const i in lookup) {
    new_arr.push(lookup[i]);
  }

  return new_arr;
}

export function getLineOffsets(textDocString: String): number[] {
  const lineOffsets: number[] = [];
  const text = textDocString;
  let isLineStart = true;
  for (let i = 0; i < text.length; i++) {
    if (isLineStart) {
      lineOffsets.push(i);
      isLineStart = false;
    }
    const ch = text.charAt(i);
    isLineStart = ch === '\r' || ch === '\n';
    if (ch === '\r' && i + 1 < text.length && text.charAt(i + 1) === '\n') {
      i++;
    }
  }
  if (isLineStart && text.length > 0) {
    lineOffsets.push(text.length);
  }
<<<<<<< HEAD

  return lineOffsets;
}

export function removeDuplicatesObj(objArray) {
  const nonDuplicateSet = new Set();
  const nonDuplicateArr = [];
  for (const obj in objArray) {
    const currObj = objArray[obj];
    const stringifiedObj = JSON.stringify(currObj);
    if (!nonDuplicateSet.has(stringifiedObj)) {
      nonDuplicateArr.push(currObj);
      nonDuplicateSet.add(stringifiedObj);
    }
  }

  return nonDuplicateArr;
}

export function matchOffsetToDocument(offset: number, jsonDocuments) {
  for (const jsonDoc in jsonDocuments.documents) {
    const currJsonDoc: SingleYAMLDocument = jsonDocuments.documents[jsonDoc];
    if (
      currJsonDoc.root &&
      currJsonDoc.root.end >= offset &&
      currJsonDoc.root.start <= offset
    ) {
      return currJsonDoc;
    }
  }

  // TODO: Fix this so that it returns the correct document
  return jsonDocuments.documents[0];
}

export function matchOffsetToDocument2(offset: number, jsonDocuments) {
  for (const jsonDoc of jsonDocuments.documents) {
    if (
      jsonDoc.root &&
      jsonDoc.root.offset <= offset &&
      jsonDoc.root.length + jsonDoc.root.offset >= offset
    ) {
      return jsonDoc;
    }
  }

  // TODO: Fix this so that it returns the correct document
  return null;
}

export function filterInvalidCustomTags(customTags: String[]): String[] {
  const validCustomTags = ['mapping', 'scalar', 'sequence'];

  return customTags.filter(tag => {
    if (typeof tag === 'string') {
      const typeInfo = tag.split(' ');
      const type = (typeInfo[1] && typeInfo[1].toLowerCase()) || 'scalar';

      // We need to check if map is a type because map will throw an error within the yaml-ast-parser
      if (type === 'map') {
        return false;
      }

      return validCustomTags.indexOf(type) !== -1;
    }
    return false;
  });
}
=======

  return lineOffsets;
}

export function removeDuplicatesObj(objArray) {
  const nonDuplicateSet = new Set();
  const nonDuplicateArr = [];
  for (const obj in objArray) {
    const currObj = objArray[obj];
    const stringifiedObj = JSON.stringify(currObj);
    if (!nonDuplicateSet.has(stringifiedObj)) {
      nonDuplicateArr.push(currObj);
      nonDuplicateSet.add(stringifiedObj);
    }
  }

  return nonDuplicateArr;
}

export function matchOffsetToDocument(
  offset: number,
  doc: YAMLDocument
): SingleYAMLDocument {
  for (const currDoc of doc.documents) {
    if (
      currDoc.root &&
      currDoc.root.length + currDoc.root.offset >= offset &&
      currDoc.root.offset <= offset
    ) {
      return currDoc;
    }
  }
  return null;
}
>>>>>>> 27b8e1bca91dac4064e513972d3f82f459ede4f4
