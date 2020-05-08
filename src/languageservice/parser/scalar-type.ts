/**
 * Parse a boolean according to the specification
 *
 * Return:
 *  true if its a true value
 *  false if its a false value
 */
export function parseYamlBoolean(input: string): boolean {
<<<<<<< HEAD
  if (
    [
      'true',
      'True',
      'TRUE',
      'y',
      'Y',
      'yes',
      'Yes',
      'YES',
      'on',
      'On',
      'ON',
    ].lastIndexOf(input) >= 0
  ) {
    return true;
  } else if (
    [
      'false',
      'False',
      'FALSE',
      'n',
      'N',
      'no',
      'No',
      'NO',
      'off',
      'Off',
      'OFF',
    ].lastIndexOf(input) >= 0
  ) {
    return false;
  }
  throw `Invalid boolean "${input}"`;
}
=======
    if (
      [
        'true',
        'True',
        'TRUE',
        'y',
        'Y',
        'yes',
        'Yes',
        'YES',
        'on',
        'On',
        'ON',
      ].lastIndexOf(input) >= 0
    ) {
      return true;
    } else if (
      [
        'false',
        'False',
        'FALSE',
        'n',
        'N',
        'no',
        'No',
        'NO',
        'off',
        'Off',
        'OFF',
      ].lastIndexOf(input) >= 0
    ) {
      return false;
    }
    throw new Error(`Invalid boolean "${input}"`);
  }
  
>>>>>>> 27b8e1bca91dac4064e513972d3f82f459ede4f4
