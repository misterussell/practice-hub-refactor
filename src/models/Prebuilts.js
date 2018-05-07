// These are methods used solely by the prebuilt options.
// They do not directly change props.
// Imported directly into the ConfigPreview for array manipulations.

export default class Prebuilts {

  rowPadding = [];
  columnPadding = [];

  static isEven(n) {
    return n === parseFloat(n) ? !(n % 2) : undefined;
  }

  getRowPadding(rowLength, maxLength) {
    if (rowLength > maxLength) {
      throw new Error(`This prebuilt is too large. Expected row length <= ${maxLength}`);
    } else if (rowLength <= 0 || maxLength <= 0) {
      throw new Error(`Expected rowLength and maxLength >= 0, received rowLength:${rowLength}, maxLength:${maxLength}`);
    } else if (typeof rowLength !== 'number') {
      throw new Error(`Expected rowLength to be a number but received ${typeof rowLength}`);
    } else if (typeof maxLength !== 'number') {
      throw new Error(`Expected maxLength to be a number but received ${typeof maxLength}`);
    }
    let rowPadding = [0, 0];
    const alpha = maxLength - rowLength;
    if (alpha > 1) {
      rowPadding = Prebuilts.findSides(rowLength, maxLength);
    } else {
      rowPadding = [1, 0];
    }
    this.rowPadding = rowPadding;
  }

  static findSides(a, b) {
    const isEven = Prebuilts.isEven(a);
    const alpha = b - a;
    if (isEven) {
      return [((alpha - 1) / 2) + 1, ((alpha - 1) / 2)];
    }
    return [(b - a) / 2, (b - a) / 2];
  }

  static getColHeight(arr, rowLength) {
    let count = 0;
    for (let i = 0; i < arr.length; i += rowLength) {
      count += 1;
    }
    return count;
  }
}
