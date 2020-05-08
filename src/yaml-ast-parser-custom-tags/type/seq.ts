<<<<<<< HEAD:src/yaml-ast-parser-custom-tags/type/seq.ts
'use strict';

=======
>>>>>>> 27b8e1bca91dac4064e513972d3f82f459ede4f4:src/yaml-ast-parser/type/seq.ts
import { Type } from '../type';

export default new Type('tag:yaml.org,2002:seq', {
  kind: 'sequence',
<<<<<<< HEAD:src/yaml-ast-parser-custom-tags/type/seq.ts
  construct: function(data) {
=======
  construct(data) {
>>>>>>> 27b8e1bca91dac4064e513972d3f82f459ede4f4:src/yaml-ast-parser/type/seq.ts
    return null !== data ? data : [];
  },
});
