// Standard YAML's JSON schema.
// http://www.yaml.org/spec/1.2/spec.html#id2803231
//
// NOTE: JS-YAML does not support schema-specific tag resolution restrictions.
// So, this schema is not such strict as defined in the YAML specification.
// It allows numbers in binary notaion, use `Null` and `NULL` as `null`, etc.

'use strict';
import { Schema } from '../schema';
import failsafe from './failsafe';
<<<<<<< HEAD:src/yaml-ast-parser-custom-tags/schema/json.ts
import typeNull from '../type/null';
import typeBool from '../type/bool';
import typeInt from '../type/int';
import typeFloat from '../type/float';

export default new Schema({
  include: [failsafe],
  implicit: [typeNull, typeBool, typeInt, typeFloat],
=======

import BoolType from '../type/bool';
import FloatType from '../type/float';
import IntType from '../type/int';
import NullType from '../type/null';

export default new Schema({
  include: [failsafe],
  implicit: [NullType, BoolType, IntType, FloatType],
>>>>>>> 27b8e1bca91dac4064e513972d3f82f459ede4f4:src/yaml-ast-parser/schema/json.ts
});
