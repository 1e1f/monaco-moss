<<<<<<< HEAD:src/yaml-ast-parser-custom-tags/type/bool.ts
declare function require(n: string): any;

'use strict';

=======
>>>>>>> 27b8e1bca91dac4064e513972d3f82f459ede4f4:src/yaml-ast-parser/type/bool.ts
import { Type } from '../type';

function resolveYamlBoolean(data) {
  if (null === data) {
    return false;
  }

  const max = data.length;

  return (
    (max === 4 && (data === 'true' || data === 'True' || data === 'TRUE')) ||
    (max === 5 && (data === 'false' || data === 'False' || data === 'FALSE'))
  );
}

function constructYamlBoolean(data) {
  return data === 'true' || data === 'True' || data === 'TRUE';
}

function isBoolean(object) {
  return '[object Boolean]' === Object.prototype.toString.call(object);
}

export default new Type('tag:yaml.org,2002:bool', {
  kind: 'scalar',
  resolve: resolveYamlBoolean,
  construct: constructYamlBoolean,
  predicate: isBoolean,
  represent: {
<<<<<<< HEAD:src/yaml-ast-parser-custom-tags/type/bool.ts
    lowercase: function(object) {
      return object ? 'true' : 'false';
    },
    uppercase: function(object) {
      return object ? 'TRUE' : 'FALSE';
    },
    camelcase: function(object) {
=======
    lowercase(object) {
      return object ? 'true' : 'false';
    },
    uppercase(object) {
      return object ? 'TRUE' : 'FALSE';
    },
    camelcase(object) {
>>>>>>> 27b8e1bca91dac4064e513972d3f82f459ede4f4:src/yaml-ast-parser/type/bool.ts
      return object ? 'True' : 'False';
    },
  },
  defaultStyle: 'lowercase',
});
