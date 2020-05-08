<<<<<<< HEAD:src/yaml-ast-parser-custom-tags/type/set.ts
'use strict';

=======
>>>>>>> 27b8e1bca91dac4064e513972d3f82f459ede4f4:src/yaml-ast-parser/type/set.ts
import { Type } from '../type';
import * as ast from '../yamlAST';

const _hasOwnProperty = Object.prototype.hasOwnProperty;

function resolveYamlSet(data) {
  if (null === data) {
    return true;
  }

  if (data.kind != ast.Kind.MAP) {
    return false;
  }

  return true;
}

function constructYamlSet(data) {
  return null !== data ? data : {};
}

export default new Type('tag:yaml.org,2002:set', {
  kind: 'mapping',
  resolve: resolveYamlSet,
  construct: constructYamlSet,
});
