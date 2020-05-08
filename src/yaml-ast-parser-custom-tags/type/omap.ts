<<<<<<< HEAD:src/yaml-ast-parser-custom-tags/type/omap.ts
'use strict';

=======
>>>>>>> 27b8e1bca91dac4064e513972d3f82f459ede4f4:src/yaml-ast-parser/type/omap.ts
import { Type } from '../type';

const _hasOwnProperty = Object.prototype.hasOwnProperty;
const _toString = Object.prototype.toString;

function resolveYamlOmap(data) {
  if (null === data) {
    return true;
  }

<<<<<<< HEAD:src/yaml-ast-parser-custom-tags/type/omap.ts
  var objectKeys = [],
=======
  let objectKeys = [],
>>>>>>> 27b8e1bca91dac4064e513972d3f82f459ede4f4:src/yaml-ast-parser/type/omap.ts
    index,
    length,
    pair,
    pairKey,
    pairHasKey,
    object = data;

  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];
    pairHasKey = false;

    if ('[object Object]' !== _toString.call(pair)) {
      return false;
    }

    for (pairKey in pair) {
      if (_hasOwnProperty.call(pair, pairKey)) {
        if (!pairHasKey) {
          pairHasKey = true;
        } else {
          return false;
        }
      }
    }

    if (!pairHasKey) {
      return false;
    }

    if (-1 === objectKeys.indexOf(pairKey)) {
      objectKeys.push(pairKey);
    } else {
      return false;
    }
  }

  return true;
}

function constructYamlOmap(data) {
  return null !== data ? data : [];
}

export default new Type('tag:yaml.org,2002:omap', {
  kind: 'sequence',
  resolve: resolveYamlOmap,
  construct: constructYamlOmap,
});
