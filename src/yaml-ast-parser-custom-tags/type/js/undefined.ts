<<<<<<< HEAD:src/yaml-ast-parser-custom-tags/type/js/undefined.ts
'use strict';

=======
>>>>>>> 27b8e1bca91dac4064e513972d3f82f459ede4f4:src/yaml-ast-parser/type/js/undefined.ts
import { Type } from '../../type';

function resolveJavascriptUndefined() {
  return true;
}

function constructJavascriptUndefined() {
  /*eslint-disable no-undefined*/
  return undefined;
}

function representJavascriptUndefined() {
  return '';
}

function isUndefined(object) {
  return 'undefined' === typeof object;
}

export default new Type('tag:yaml.org,2002:js/undefined', {
  kind: 'scalar',
  resolve: resolveJavascriptUndefined,
  construct: constructJavascriptUndefined,
  predicate: isUndefined,
  represent: representJavascriptUndefined,
});
