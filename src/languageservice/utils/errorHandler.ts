/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Red Hat, Inc. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
export class ErrorHandler {
<<<<<<< HEAD
  private errorResultsList;
  private textDocument;

  constructor(textDocument) {
    this.errorResultsList = [];
    this.textDocument = textDocument;
  }

  public addErrorResult(errorNode, errorMessage, errorType) {
    this.errorResultsList.push({
      severity: errorType,
      range: {
        start: this.textDocument.positionAt(errorNode.startPosition),
        end: this.textDocument.positionAt(errorNode.endPosition),
      },
      message: errorMessage,
    });
  }

  public getErrorResultsList() {
    return this.errorResultsList;
  }
}
=======
    private errorResultsList;
    private textDocument;
  
    constructor(textDocument) {
      this.errorResultsList = [];
      this.textDocument = textDocument;
    }
  
    public addErrorResult(errorNode, errorMessage, errorType) {
      this.errorResultsList.push({
        severity: errorType,
        range: {
          start: this.textDocument.positionAt(errorNode.startPosition),
          end: this.textDocument.positionAt(errorNode.endPosition),
        },
        message: errorMessage,
      });
    }
  
    public getErrorResultsList() {
      return this.errorResultsList;
    }
  }
>>>>>>> 27b8e1bca91dac4064e513972d3f82f459ede4f4
