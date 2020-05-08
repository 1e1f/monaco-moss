'use strict';

<<<<<<< HEAD:src/yaml-ast-parser-custom-tags/mark.ts
import * as common from './common';

class Mark {
  constructor(
    public name: string,
    public buffer: string,
    public position: number,
    public line: number,
    public column: number
  ) {}

  filePath: string;
=======
export default class Mark {
  public filePath: string;

  public toLineEnd: boolean;
>>>>>>> 27b8e1bca91dac4064e513972d3f82f459ede4f4:src/yaml-ast-parser/mark.ts

  constructor(
    public name: string,
    public buffer: string,
    public position: number,
    public line: number,
    public column: number
  ) {}

  public getSnippet(indent: number = 0, maxLength: number = 75) {
    let head, start, tail, end, snippet;

    if (!this.buffer) {
      return null;
    }

    indent = indent || 4;
    maxLength = maxLength || 75;

    head = '';
    start = this.position;

    while (
      start > 0 &&
      -1 === '\x00\r\n\x85\u2028\u2029'.indexOf(this.buffer.charAt(start - 1))
    ) {
      start -= 1;
      if (this.position - start > maxLength / 2 - 1) {
        head = ' ... ';
        start += 5;
        break;
      }
    }

    tail = '';
    end = this.position;

    while (
      end < this.buffer.length &&
      -1 === '\x00\r\n\x85\u2028\u2029'.indexOf(this.buffer.charAt(end))
    ) {
      end += 1;
      if (end - this.position > maxLength / 2 - 1) {
        tail = ' ... ';
        end -= 5;
        break;
      }
    }

    snippet = this.buffer.slice(start, end);

    return (
      common.repeat(' ', indent) +
      head +
      snippet +
      tail +
      '\n' +
      common.repeat(' ', indent + this.position - start + head.length) +
      '^'
    );
  }

<<<<<<< HEAD:src/yaml-ast-parser-custom-tags/mark.ts
  toString(compact: boolean = true) {
    var snippet,
=======
  public toString(compact: boolean = true) {
    let snippet,
>>>>>>> 27b8e1bca91dac4064e513972d3f82f459ede4f4:src/yaml-ast-parser/mark.ts
      where = '';

    if (this.name) {
      where += 'in "' + this.name + '" ';
    }

    where += 'at line ' + (this.line + 1) + ', column ' + (this.column + 1);

    if (!compact) {
      snippet = this.getSnippet();

      if (snippet) {
        where += ':\n' + snippet;
      }
    }

    return where;
  }
}
<<<<<<< HEAD:src/yaml-ast-parser-custom-tags/mark.ts
export default Mark;
=======
>>>>>>> 27b8e1bca91dac4064e513972d3f82f459ede4f4:src/yaml-ast-parser/mark.ts