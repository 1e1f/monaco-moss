<<<<<<< HEAD:src/yaml-ast-parser-custom-tags/type/merge.ts
'use strict';

=======
>>>>>>> 27b8e1bca91dac4064e513972d3f82f459ede4f4:src/yaml-ast-parser/type/merge.ts
import { Type } from '../type';

function resolveYamlMerge(data) {
  return '<<' === data || null === data;
}

export default new Type('tag:yaml.org,2002:merge', {
  kind: 'scalar',
  resolve: resolveYamlMerge,
});
