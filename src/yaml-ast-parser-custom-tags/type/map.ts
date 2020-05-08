<<<<<<< HEAD:src/yaml-ast-parser-custom-tags/type/map.ts
'use strict';

=======
>>>>>>> 27b8e1bca91dac4064e513972d3f82f459ede4f4:src/yaml-ast-parser/type/map.ts
import { Type } from '../type';

export default new Type('tag:yaml.org,2002:map', {
  kind: 'mapping',
<<<<<<< HEAD:src/yaml-ast-parser-custom-tags/type/map.ts
  construct: function(data) {
=======
  construct(data) {
>>>>>>> 27b8e1bca91dac4064e513972d3f82f459ede4f4:src/yaml-ast-parser/type/map.ts
    return null !== data ? data : {};
  },
});
