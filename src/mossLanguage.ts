export const languageConf = {
  comments: {
    lineComment: '#'
  },
  brackets: [
    ['${', '}'],
    ['={', '}'],
    ['{', '}'],
    ['[', ']'],
    ['(', ')']
  ],
  autoClosingPairs: [{
    open: '${',
    close: '}'
  },
  {
    open: '={',
    close: '}'
  },
  {
    open: '[',
    close: ']'
  },
  {
    open: '(',
    close: ')'
  },
  {
    open: '"',
    close: '"'
  },
  {
    open: '\'',
    close: '\''
  },
  ],
  surroundingPairs: [{
    open: '${',
    close: '}'
  },
  {
    open: '={',
    close: '}'
  },
  {
    open: '{',
    close: '}'
  },
  {
    open: '[',
    close: ']'
  },
  {
    open: '(',
    close: ')'
  },
  {
    open: '"',
    close: '"'
  },
  {
    open: '\'',
    close: '\''
  },
  ],
  folding: {
    offSide: true
  }
};

const keywords = ['true', 'True', 'TRUE', 'false', 'False', 'FALSE', 'null', 'Null', 'Null', '~'];

export const tokenProvider = {
  tokenPostfix: '.moss',

  brackets: [{
    token: 'delimiter.interpolate',
    open: '${',
    close: '}'
  },
  {
    token: 'delimiter.explicitMathJS',
    open: '={',
    close: '}'
  },
  {
    token: 'delimiter.bracket',
    open: '{',
    close: '}'
  },
  {
    token: 'delimiter.square',
    open: '[',
    close: ']'
  },
  ],

  keywords,
  numberInteger: /(?:0|[+-]?[0-9]+)/,
  numberFloat: /(?:0|[+-]?[0-9]+)(?:\.[0-9]+)?(?:e[-+][1-9][0-9]*)?/,
  numberOctal: /0o[0-7]+/,
  numberHex: /0x[0-9a-fA-F]+/,
  numberInfinity: /[+-]?\.(?:inf|Inf|INF)/,
  numberNaN: /\.(?:nan|Nan|NAN)/,
  numberDate: /\d{4}-\d\d-\d\d([Tt ]\d\d:\d\d:\d\d(\.\d+)?(( ?[+-]\d\d?(:\d\d)?)|Z)?)?/,

  escapes: /\\(?:[btnfr\\"']|[0-7][0-7]?|[0-3][0-7]{2})/,

  mathjs_keywords: [
    'boolean', 'break', 'byte', 'case', 'catch', 'char', 'class', 'const', 'continue', 'debugger',
    'default', 'delete', 'do', 'double', 'else', 'enum', 'export', 'extends', 'false', 'final',
    'finally', 'float', 'for', 'function', 'goto', 'if', 'implements', 'import', 'in',
    'instanceof', 'int', 'interface', 'long', 'native', 'new', 'null', 'package', 'private',
    'protected', 'public', 'return', 'short', 'static', 'super', 'switch', 'synchronized', 'this',
    'throw', 'throws', 'transient', 'true', 'try', 'typeof', 'var', 'void', 'volatile', 'while',
    'with'
  ],

  mathjs_builtins: [
    'define', 'require', 'window', 'document', 'undefined'
  ],

  mathjs_operators: [
    '=', '>', '<', '!', '~', '?', ':',
    '==', '<=', '>=', '!=', '&&', '||', '++', '--',
    '+', '-', '*', '/', '&', '|', '^', '%', '<<',
    '>>', '>>>', '+=', '-=', '*=', '/=', '&=', '|=',
    '^=', '%=', '<<=', '>>=', '>>>='
  ],

  // define our own brackets as '<' and '>' do not match in javascript
  mathjs_brackets: [
    ['(', ')', 'bracket.parenthesis'],
    ['{', '}', 'bracket.curly'],
    ['[', ']', 'bracket.square']
  ],

  // common regular expressions
  mathjs_symbols: /[~!@#%\^&*-+=|\\:`<>.?\/]+/,
  mathjs_escapes: /\\(?:[btnfr\\"']|[0-7][0-7]?|[0-3][0-7]{2})/,
  mathjs_exponent: /[eE][\-+]?[0-9]+/,

  mathjs_regexpctl: /[(){}\[\]\$\^|\-*+?\.]/,
  mathjs_regexpesc: /\\(?:[bBdDfnrstvwWn0\\\/]|@mathjs_regexpctl|c[A-Z]|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4})/,

  tokenizer: {
    root: [{
      include: '@whitespace'
    },
    {
      include: '@comment'
    },

    // Directive
    [/%[^ ]+.*$/, 'meta.directive'],

    // Document Markers
    [/---/, 'operators.directivesEnd'],
    [/\.{3}/, 'operators.documentEnd'],

    // Block Structure Indicators
    [/[-?:](?= )/, 'operators'],

    {
      include: '@anchor'
    },
    {
      include: '@tagHandle'
    },
    {
      include: '@flowCollections'
    },
    {
      include: '@blockStyle'
    },
    // Numbers
    [/@numberInteger(?![ \t]*\S+)/, 'number'],
    [/@numberFloat(?![ \t]*\S+)/, 'number.float'],
    [/@numberOctal(?![ \t]*\S+)/, 'number.octal'],
    [/@numberHex(?![ \t]*\S+)/, 'number.hex'],
    [/@numberInfinity(?![ \t]*\S+)/, 'number.infinity'],
    [/@numberNaN(?![ \t]*\S+)/, 'number.nan'],
    [/@numberDate(?![ \t]*\S+)/, 'number.date'],
    // Key:Value pair

    [/(".*?"|'.*?'|.*?)([ \t]*)(:)( |$)/, [{
      cases: {
        '.*<>?': 'function',
        '.*>': 'key',
        '\\$.*': 'variable',
        '<[=\\-+\\*\\^\\|&].*': 'selector',
        '-[a-z]': 'key',
        '@default': 'key'
      }
    }, 'white', 'operators', 'white']],
    {
      include: '@flowScalars'
    },
    { include: '@flowFunctions' },
    [keywords.join('|'), 'keyword'],
    [/\$.*/, 'variable'],
    // String nodes
    [/[.a-zA-Z0-9\"]+$/, { cases: { '@keywords': 'keyword', '@default': 'string' } }],
    [/(.+)(?=\${)/, { cases: { '@keywords': 'keyword', '@default': 'string' } }]
    ],
    ////
    // Flow Collection: Flow Mapping
    ////
    object: [{
      include: '@whitespace'
    },
    {
      include: '@comment'
    },

    // Flow Mapping termination
    [/\}/, '@brackets', '@pop'],

    // Flow Mapping delimiter
    [/,/, 'delimiter.comma'],

    // Flow Mapping Key:Value delimiter
    [/:(?= )/, 'operators'],

    // Flow Mapping Key:Value key
    [/(?:".*?"|'.*?'|[^,\{\[]+?)(?=: )/, {
      cases: {
        '.*<>?': 'number',
        '.*>': 'key',
        '\\$.*': 'key',
        '@default': 'key'
      }
    }],

    // Start Flow Style
    {
      include: '@flowCollections'
    },
    {
      include: '@flowScalars'
    },
    {
      include: '@flowFunctions'
    },
    // Scalar Data types
    {
      include: '@tagHandle'
    },
    {
      include: '@anchor'
    },
    {
      include: '@flowNumber'
    },
    [keywords.join('|'), 'keyword'],
      // [/\$[a-z]*/, 'string'],
      // [/$[0-9]*/, 'number']
      // [/.*?/, 'string']
      // [/./, 'string']
    ],




    ////
    // Flow Sequence: Flow Mapping
    ////

    array: [{
      include: '@whitespace'
    },
    {
      include: '@comment'
    },

    // Flow Sequence termination
    [/\]/, '@brackets', '@pop'],

    // Flow Sequence delimiter
    [/,/, 'delimiter.comma'],

    // Start Flow Style
    {
      include: '@flowCollections'
    },
    {
      include: '@flowScalars'
    },
    {
      include: '@flowFunctions'
    },
    // Scalar Data types
    {
      include: '@tagHandle'
    },
    {
      include: '@anchor'
    },
    {
      include: '@flowNumber'
    },
    [/./, 'string']

    ],

    // Flow Scalars (quoted strings)
    string: [
      [/\${/, '@brackets', '@explicitInterpolate'],
      [/={/, '@brackets', '@explicitMathJS'],
      [/@escapes/, 'string.escape'],
      [/\\./, 'string.escape.invalid'],
      [/["']/, {
        cases: {
          '$#==$S2': {
            token: 'string',
            next: '@pop'
          },
          '@default': 'string'
        }
      }],
      [/./, 'string']
    ],

    // First line of a Block Style
    multiString: [
      [/^( +).+$/, 'string', '@multiStringContinued.$1']
    ],

    // Further lines of a Block Style
    //   Workaround for indentation detection
    multiStringContinued: [
      [/^( *).+$/, {
        cases: {
          '$1==$S2': 'string',
          '@default': {
            token: '@rematch',
            next: '@popall'
          }
        }
      }]
    ],

    whitespace: [
      [/[ \t\r\n]+/, 'white']
    ],

    // Only line comments
    comment: [
      [/#.*$/, 'comment']
    ],

    // Start Flow Collections
    flowCollections: [
      [/\[/, '@brackets', '@array'],
      [/\{/, '@brackets', '@object']
    ],

    // Moss
    explicitInterpolate: [
      {
        include: '@inStringFunctions'
      },
      [/[^}]/, 'variable'],
      [/\}/, '@brackets', '@pop'],
    ],

    explicitMathJS: [
      // Flow Mapping termination
      // Scalar Data types
      [/\}/, '@brackets', '@pop'],
      [/\${/, '@brackets', '@explicitInterpolate'],
      {
        include: '@mathjs'
      }
    ],

    inStringFunctions: [
      [/\${/, '@brackets', '@explicitInterpolate'],
      [/={/, '@brackets', '@explicitMathJS'],
    ],

    implicitMathJS: [
      [/^( *).+$/, '@rematch', '@popall'],
      [/\${/, '@brackets', '@explicitInterpolate'],
      {
        include: '@mathjs'
      }
    ],

    flowFunctions: [{
      include: '@inStringFunctions'
    },
    [/=/, {
      token: 'bracket',
      next: '@implicitMathJS',
    }],
    ],
    // Start Flow Scalars (quoted strings)
    flowScalars: [
      [/"/, 'string', '@string."'],
      [/'/, 'string', '@string.\'']
    ],

    // Start Block Scalar
    blockStyle: [
      [/[>|][0-9]*[+-]?$/, 'operators', '@multiString']
    ],

    // Numbers in Flow Collections (terminate with ,]})
    flowNumber: [
      [/@numberInteger(?=[ \t]*[,\]\}])/, 'number'],
      [/@numberFloat(?=[ \t]*[,\]\}])/, 'number.float'],
      [/@numberOctal(?=[ \t]*[,\]\}])/, 'number.octal'],
      [/@numberHex(?=[ \t]*[,\]\}])/, 'number.hex'],
      [/@numberInfinity(?=[ \t]*[,\]\}])/, 'number.infinity'],
      [/@numberNaN(?=[ \t]*[,\]\}])/, 'number.nan'],
      [/@numberDate(?=[ \t]*[,\]\}])/, 'number.date']
    ],

    tagHandle: [
      [/\![^ ]*/, 'tag']
    ],

    anchor: [
      [/[&*][^ ]+/, 'namespace']
    ],

    mathjs: [
      [/([a-zA-Z_\$][\w\$]*)(\s*)(:?)/, {
        cases: {
          '$1@mathjs_keywords': ['keyword', 'white', 'delimiter'],
          '$3': ['key.identifier', 'white', 'delimiter'], // followed by :
          '$1@mathjs_builtins': ['predefined.identifier', 'white', 'delimiter'],
          '@default': ['variable', 'white', 'delimiter']
        }
      }],


      // regular expression: ensure it is terminated before beginning (otherwise it is an opeator)
      [/\/(?=([^\\\/]|\\.)+\/)/, {
        token: 'regexp.slash',
        bracket: '@open',
        next: '@mathjs_regexp'
      }],

      // delimiters and operators
      [/[{}()\[\]]/, '@mathjs_brackets'],
      [/[;,.]/, 'delimiter'],
      [/@mathjs_symbols/, {
        cases: {
          '@mathjs_operators': 'operator',
          '@default': ''
        }
      }],

      // numbers
      [/\d+\.\d*(@mathjs_exponent)?/, 'number.float'],
      [/\.\d+(@mathjs_exponent)?/, 'number.float'],
      [/\d+@mathjs_exponent/, 'number.float'],
      [/0[xX][\da-fA-F]+/, 'number.hex'],
      [/0[0-7]+/, 'number.octal'],
      [/\d+/, 'number'],

      // strings: recover on non-terminated strings
      [/"([^"\\]|\\.)*$/, 'string.invalid'], // non-teminated string
      [/'([^'\\]|\\.)*$/, 'string.invalid'], // non-teminated string
      [/"/, 'string', '@string."'],
      [/'/, 'string', '@string.\''],
    ],

    mathjs_whitespace: [
      [/[ \t\r\n]+/, 'white'],
      [/\/\*/, 'comment', '@comment'],
      [/\/\/.*$/, 'comment'],
    ],

    mathjs_comment: [
      [/[^\/*]+/, 'comment'],
      // [/\/\*/, 'comment', '@push' ],    // nested comment not allowed :-(
      [/\/\*/, 'comment.invalid'],
      ["\\*/", 'comment', '@pop'],
      [/[\/*]/, 'comment']
    ],

    // We match regular expression quite precisely
    mathjs_regexp: [
      [/(\{)(\d+(?:,\d*)?)(\})/, ['@mathjs_brackets.regexp.escape.control', 'regexp.escape.control', '@mathjs_brackets.regexp.escape.control']],
      [/(\[)(\^?)(?=(?:[^\]\\\/]|\\.)+)/, ['@mathjs_brackets.regexp.escape.control', {
        token: 'regexp.escape.control',
        next: '@mathjs_regexrange'
      }]],
      [/(\()(\?:|\?=|\?!)/, ['@mathjs_brackets.regexp.escape.control', 'regexp.escape.control']],
      [/[()]/, '@mathjs_brackets.regexp.escape.control'],
      [/@mathjs_regexpctl/, 'regexp.escape.control'],
      [/[^\\\/]/, 'regexp'],
      [/@mathjs_regexpesc/, 'regexp.escape'],
      [/\\\./, 'regexp.invalid'],
      ['/', {
        token: 'regexp.slash',
        bracket: '@close'
      }, '@pop'],
    ],

    mathjs_regexrange: [
      [/-/, 'regexp.escape.control'],
      [/\^/, 'regexp.invalid'],
      [/@mathjs_regexpesc/, 'regexp.escape'],
      [/[^\]]/, 'regexp'],
      [/\]/, '@mathjs_brackets.regexp.escape.control', '@pop'],
    ]
  }
};
