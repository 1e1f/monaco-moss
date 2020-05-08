<<<<<<< HEAD:src/yaml-ast-parser-custom-tags/exception.ts
import Mark from './mark';
=======
>>>>>>> 27b8e1bca91dac4064e513972d3f82f459ede4f4:src/yaml-ast-parser/exception.ts
'use strict';
class YAMLException {
  message: string;
  reason: string;
  name: string;
  mark: Mark;
  isWarning: boolean;

<<<<<<< HEAD:src/yaml-ast-parser-custom-tags/exception.ts
  private static CLASS_IDENTIFIER = 'yaml-ast-parser.YAMLException';

=======
import Mark from './mark';

export default class YAMLException {
>>>>>>> 27b8e1bca91dac4064e513972d3f82f459ede4f4:src/yaml-ast-parser/exception.ts
  public static isInstance(instance: any): instance is YAMLException {
    if (
      instance != null &&
      instance.getClassIdentifier &&
      typeof instance.getClassIdentifier == 'function'
    ) {
<<<<<<< HEAD:src/yaml-ast-parser-custom-tags/exception.ts
      for (let currentIdentifier of instance.getClassIdentifier()) {
        if (currentIdentifier == YAMLException.CLASS_IDENTIFIER) return true;
=======
      for (const currentIdentifier of instance.getClassIdentifier()) {
        if (currentIdentifier == YAMLException.CLASS_IDENTIFIER) {
          return true;
        }
>>>>>>> 27b8e1bca91dac4064e513972d3f82f459ede4f4:src/yaml-ast-parser/exception.ts
      }
    }

    return false;
  }

  private static CLASS_IDENTIFIER = 'yaml-ast-parser.YAMLException';
  public message: string;
  public reason: string;
  public name: string;
  public mark: Mark;
  public isWarning: boolean;

  constructor(reason: string, mark: Mark = null, isWarning = false) {
    this.name = 'YAMLException';
    this.reason = reason;
    this.mark = mark;
    this.message = this.toString(false);
    this.isWarning = isWarning;
  }

  public getClassIdentifier(): string[] {
    const superIdentifiers = [];

    return superIdentifiers.concat(YAMLException.CLASS_IDENTIFIER);
  }

  public toString(compact: boolean = false) {
    let result;

    result = 'JS-YAML: ' + (this.reason || '(unknown reason)');

    if (!compact && this.mark) {
      result += ' ' + this.mark.toString();
    }

    return result;
  }
}
export default YAMLException;
