<<<<<<< HEAD:src/yaml-ast-parser-custom-tags/type/js/regexp.ts
'use strict';

=======
>>>>>>> 27b8e1bca91dac4064e513972d3f82f459ede4f4:src/yaml-ast-parser/type/js/regexp.ts
import { Type } from '../../type';

function resolveJavascriptRegExp(data) {
  if (null === data) {
    return false;
  }

  if (0 === data.length) {
    return false;
  }

  let regexp = data,
    tail = /\/([gim]*)$/.exec(data),
    modifiers = '';

  // if regexp starts with '/' it can have modifiers and must be properly closed
  // `/foo/gim` - modifiers tail can be maximum 3 chars
  if ('/' === regexp[0]) {
    if (tail) {
      modifiers = tail[1];
    }

    if (modifiers.length > 3) {
      return false;
    }
    // if expression starts with /, is should be properly terminated
    if (regexp[regexp.length - modifiers.length - 1] !== '/') {
      return false;
    }

    regexp = regexp.slice(1, regexp.length - modifiers.length - 1);
  }

  try {
    const dummy = new RegExp(regexp, modifiers);
    return true;
  } catch (error) {
    return false;
  }
}

function constructJavascriptRegExp(data) {
  let regexp = data,
    tail = /\/([gim]*)$/.exec(data),
    modifiers = '';

  // `/foo/gim` - tail can be maximum 4 chars
  if ('/' === regexp[0]) {
    if (tail) {
      modifiers = tail[1];
    }
    regexp = regexp.slice(1, regexp.length - modifiers.length - 1);
  }

  return new RegExp(regexp, modifiers);
}

function representJavascriptRegExp(object /*, style*/) {
  let result = '/' + object.source + '/';

  if (object.global) {
    result += 'g';
  }

  if (object.multiline) {
    result += 'm';
  }

  if (object.ignoreCase) {
    result += 'i';
  }

  return result;
}

function isRegExp(object) {
  return '[object RegExp]' === Object.prototype.toString.call(object);
}

export default new Type('tag:yaml.org,2002:js/regexp', {
  kind: 'scalar',
  resolve: resolveJavascriptRegExp,
  construct: constructJavascriptRegExp,
  predicate: isRegExp,
  represent: representJavascriptRegExp,
});