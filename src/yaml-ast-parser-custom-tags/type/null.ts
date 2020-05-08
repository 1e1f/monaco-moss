<<<<<<< HEAD:src/yaml-ast-parser-custom-tags/type/null.ts
'use strict';

=======
>>>>>>> 27b8e1bca91dac4064e513972d3f82f459ede4f4:src/yaml-ast-parser/type/null.ts
import { Type } from '../type';

function resolveYamlNull(data) {
  if (null === data) {
    return true;
  }

  const max = data.length;

  return (
    (max === 1 && data === '~') ||
    (max === 4 && (data === 'null' || data === 'Null' || data === 'NULL'))
  );
}

function constructYamlNull() {
  return null;
}

function isNull(object) {
  return null === object;
}

export default new Type('tag:yaml.org,2002:null', {
  kind: 'scalar',
  resolve: resolveYamlNull,
  construct: constructYamlNull,
  predicate: isNull,
  represent: {
<<<<<<< HEAD:src/yaml-ast-parser-custom-tags/type/null.ts
    canonical: function() {
      return '~';
    },
    lowercase: function() {
      return 'null';
    },
    uppercase: function() {
      return 'NULL';
    },
    camelcase: function() {
=======
    canonical() {
      return '~';
    },
    lowercase() {
      return 'null';
    },
    uppercase() {
      return 'NULL';
    },
    camelcase() {
>>>>>>> 27b8e1bca91dac4064e513972d3f82f459ede4f4:src/yaml-ast-parser/type/null.ts
      return 'Null';
    },
  },
  defaultStyle: 'lowercase',
});
