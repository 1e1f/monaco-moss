<<<<<<< HEAD:src/yaml-ast-parser-custom-tags/type/js/function.ts
'use strict';
declare function require(N: string): any;
var esprima = require('esprima');
=======
declare var esprima: any;
>>>>>>> 27b8e1bca91dac4064e513972d3f82f459ede4f4:src/yaml-ast-parser/type/js/function.ts

// Browserified version does not have esprima
//
// 1. For node.js just require module as deps
// 2. For browser try to require mudule via external AMD system.
//    If not found - try to fallback to window.esprima. If not
//    found too - then fail to parse.
//

import { Type } from '../../type';

function resolveJavascriptFunction(data) {
  if (null === data) {
    return false;
  }

  try {
    let source = '(' + data + ')',
      ast = esprima.parse(source, { range: true }),
      params = [],
      body;

    if (
      'Program' !== ast.type ||
      1 !== ast.body.length ||
      'ExpressionStatement' !== ast.body[0].type ||
<<<<<<< HEAD:src/yaml-ast-parser-custom-tags/type/js/function.ts
      'FunctionExpression' !== ast.body[0]['expression'].type
=======
      'FunctionExpression' !== ast.body[0].expression.type
>>>>>>> 27b8e1bca91dac4064e513972d3f82f459ede4f4:src/yaml-ast-parser/type/js/function.ts
    ) {
      return false;
    }

    return true;
  } catch (err) {
    return false;
  }
}

function constructJavascriptFunction(data) {
  /*jslint evil:true*/

  let source = '(' + data + ')',
    ast = esprima.parse(source, { range: true }),
    params: string[] = [],
    body;

  if (
    'Program' !== ast.type ||
    1 !== ast.body.length ||
    'ExpressionStatement' !== ast.body[0].type ||
<<<<<<< HEAD:src/yaml-ast-parser-custom-tags/type/js/function.ts
    'FunctionExpression' !== ast.body[0]['expression'].type
=======
    'FunctionExpression' !== ast.body[0].expression.type
>>>>>>> 27b8e1bca91dac4064e513972d3f82f459ede4f4:src/yaml-ast-parser/type/js/function.ts
  ) {
    throw new Error('Failed to resolve function');
  }

<<<<<<< HEAD:src/yaml-ast-parser-custom-tags/type/js/function.ts
  ast.body[0]['expression'].params.forEach(function(param) {
=======
  ast.body[0].expression.params.forEach(function(param) {
>>>>>>> 27b8e1bca91dac4064e513972d3f82f459ede4f4:src/yaml-ast-parser/type/js/function.ts
    params.push(param.name);
  });

  body = ast.body[0].expression.body.range;

  // Esprima's ranges include the first '{' and the last '}' characters on
  // function expressions. So cut them out.
  /*eslint-disable no-new-func*/
  return new (Function as any)(params, source.slice(body[0] + 1, body[1] - 1));
}

function representJavascriptFunction(object /*, style*/) {
  return object.toString();
}

function isFunction(object) {
  return '[object Function]' === Object.prototype.toString.call(object);
}

export default new Type('tag:yaml.org,2002:js/function', {
  kind: 'scalar',
  resolve: resolveJavascriptFunction,
  construct: constructJavascriptFunction,
  predicate: isFunction,
  represent: representJavascriptFunction,
});
