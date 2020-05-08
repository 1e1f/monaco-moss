'use strict';

import YAMLException from './exception';

const TYPE_CONSTRUCTOR_OPTIONS = [
  'kind',
  'resolve',
  'construct',
  'instanceOf',
  'predicate',
  'represent',
  'defaultStyle',
  'styleAliases',
];

<<<<<<< HEAD:src/yaml-ast-parser-custom-tags/type.ts
var YAML_NODE_KINDS = ['scalar', 'sequence', 'mapping'];
=======
const YAML_NODE_KINDS = ['scalar', 'sequence', 'mapping'];
>>>>>>> 27b8e1bca91dac4064e513972d3f82f459ede4f4:src/yaml-ast-parser/type.ts

function compileStyleAliases(map) {
  const result = {};

  if (null !== map) {
    Object.keys(map).forEach(function(style) {
      map[style].forEach(function(alias) {
        result[String(alias)] = style;
      });
    });
  }

  return result;
}

export class Type {
<<<<<<< HEAD:src/yaml-ast-parser-custom-tags/type.ts
  tag;
  kind;
  resolve;
  construct;
  instanceOf;
  predicate;
  represent;
  defaultStyle;
  styleAliases;
  loadKind;
=======
  public tag;
  public kind;
  public resolve;
  public construct;
  public instanceOf;
  public predicate;
  public represent;
  public defaultStyle;
  public styleAliases;
  public loadKind;
>>>>>>> 27b8e1bca91dac4064e513972d3f82f459ede4f4:src/yaml-ast-parser/type.ts

  constructor(tag, options) {
    options = options || {};

    Object.keys(options).forEach(function(name) {
      if (-1 === TYPE_CONSTRUCTOR_OPTIONS.indexOf(name)) {
        throw new YAMLException(
          'Unknown option "' +
            name +
            '" is met in definition of "' +
            tag +
            '" YAML type.'
        );
      }
    });

    // TODO: Add tag format check.
    this.tag = tag;
<<<<<<< HEAD:src/yaml-ast-parser-custom-tags/type.ts
    this.kind = options['kind'] || null;
    this.resolve =
      options['resolve'] ||
=======
    this.kind = options.kind || null;
    this.resolve =
      options.resolve ||
>>>>>>> 27b8e1bca91dac4064e513972d3f82f459ede4f4:src/yaml-ast-parser/type.ts
      function() {
        return true;
      };
    this.construct =
<<<<<<< HEAD:src/yaml-ast-parser-custom-tags/type.ts
      options['construct'] ||
      function(data) {
        return data;
      };
    this.instanceOf = options['instanceOf'] || null;
    this.predicate = options['predicate'] || null;
    this.represent = options['represent'] || null;
    this.defaultStyle = options['defaultStyle'] || null;
    this.styleAliases = compileStyleAliases(options['styleAliases'] || null);
=======
      options.construct ||
      function(data) {
        return data;
      };
    this.instanceOf = options.instanceOf || null;
    this.predicate = options.predicate || null;
    this.represent = options.represent || null;
    this.defaultStyle = options.defaultStyle || null;
    this.styleAliases = compileStyleAliases(options.styleAliases || null);
>>>>>>> 27b8e1bca91dac4064e513972d3f82f459ede4f4:src/yaml-ast-parser/type.ts

    if (-1 === YAML_NODE_KINDS.indexOf(this.kind)) {
      throw new YAMLException(
        'Unknown kind "' +
          this.kind +
          '" is specified for "' +
          tag +
          '" YAML type.'
      );
    }
  }
}
