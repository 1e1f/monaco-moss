/**
 * Created by kor on 06/05/15.
 */

export { load, loadAll, safeLoad, safeLoadAll, LoadOptions } from './loader';
export { dump, safeDump } from './dumper';

<<<<<<< HEAD:src/yaml-ast-parser-custom-tags/index.ts
import Mark from './mark';
=======
>>>>>>> 27b8e1bca91dac4064e513972d3f82f459ede4f4:src/yaml-ast-parser/index.ts
import YAMLException from './exception';
import Mark from './mark';

export * from './yamlAST';

export type Error = YAMLException;

function deprecated(name) {
  return function() {
    throw new Error('Function ' + name + ' is deprecated and cannot be used.');
  };
}

export * from './scalarInference';
