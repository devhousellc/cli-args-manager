'use strict';
class ArgsManager {
  constructor(args) {
    this.args = args;
  }

  static removeQuotes(string) {
    return string.replace(/"/g, '').replace(/'/g, '');
  }

  /**
   * look up the argument in the argument list
   * @param {string} argName the name of the argument
   * @returns {boolean} true of argument found, false otherwise
   */
  findArg(argName) {
    let found = false;

    for (let i = 0; i < this.args.length; i++) {

      if (this.args[i].includes('=')) { //if --blala=pathto  format
        found = this.args[i].includes(argName) || found;
      } else {
        found = this.args[i].trim() === argName || found;
      }

    }

    return found;
  }

  findKey(argName) {
    for (let i = 0; i < this.args.length; i++) {
      if (this.args[i].includes('=') && this.args[i].includes(argName)) {

        let arg = this.args[i].replace(argName + '=', '');
        return ArgsManager.removeQuotes(arg);

      } else if (this.args[i] === argName) {

        if (i + 1 === this.args.length) {
          return undefined;
        } else {
          if (this.args[i + 1].includes('--')) {
            return undefined;
          }
          return ArgsManager.removeQuotes(this.args[i + 1]);
        }

      }
    }
  }
}

module.exports = ArgsManager;
