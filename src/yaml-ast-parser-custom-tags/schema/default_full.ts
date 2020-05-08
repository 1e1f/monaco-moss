// JS-YAML's default schema for `load` function.
// It is not described in the YAML specification.
//
// This schema is based on JS-YAML's default safe schema and includes
// JavaScript-specific types: !!js/undefined, !!js/regexp and !!js/function.
//
// Also this schema is used as default base schema at `Schema.create` function.

'use strict';
import { Schema } from '../schema';
<<<<<<< HEAD:src/yaml-ast-parser-custom-tags/schema/default_full.ts
import defaultSafe from './default_safe';
import jsUndefined from '../type/js/undefined';
import jsRegexp from '../type/js/regexp';

var schema = new Schema({
  include: [defaultSafe],
  explicit: [jsUndefined, jsRegexp],
});

=======

import DefaultSafe from './default_safe';

import RegexpType from '../type/js/regexp';
import UndefinedType from '../type/js/undefined';

const schema = new Schema({
  include: [DefaultSafe],
  explicit: [UndefinedType, RegexpType],
});
>>>>>>> 27b8e1bca91dac4064e513972d3f82f459ede4f4:src/yaml-ast-parser/schema/default_full.ts
Schema.DEFAULT = schema;
export default schema;
