// These are methods used solely by the prebuilt options.
// They do not directly change props.
// Imported directly into the ConfigPreview for array manipulations.

export default class Prebuilts {

  rowPadding = [];
  columnPadding = [];

  static isEven(n) {
    return n === parseFloat(n) ? !(n % 2) : undefined;
  }

  static findPadding(a, b) {
    const isEven = Prebuilts.isEven(a);
    const alpha = b - a;
    if (isEven) {
      return [((alpha - 1) / 2) + 1, ((alpha - 1) / 2)];
    }
    return [(b - a) / 2, (b - a) / 2];
  }

  static getColHeight(arrLength, rowLength) {
    let count = 0;

    if (typeof arrLength !== 'number') {
      throw new Error('Must provide an arrLength param that is a number.');
    } else if (typeof rowLength !== 'number') {
      throw new Error('Must provide a rowLength param that is a number.');
    } else {
      for (let i = 0; i < arrLength; i += rowLength) {
        count += 1;
      }
      return count;
    }
  }

  getColPadding(arrLength, rowLength, maxHeight) {
    let colHeight = Prebuilts.getColHeight(arrLength, rowLength);
    let colPadding = [0, 0];
    const alpha = maxHeight - colHeight;

    if (!arrLength || typeof arrLength !== 'number') {
      throw new Error(`Expected arrLength param to be a number but received ${typeof arrLength + arrLength}.`);
    } else if (!rowLength || typeof rowLength !== 'number') {
      throw new Error(`Expected rowLength param to be a number but received ${typeof rowLength + rowLength}.`);
    } else if (!maxHeight || typeof maxHeight !== 'number') {
      throw new Error(`Expected maxHeight param to be a number but received ${typeof maxHeight + maxHeight}.`);
    } else {
      if (alpha > 1) {
        colPadding = Prebuilts.findPadding(colHeight, maxHeight);
      } else if (alpha === 1) {
        colPadding = [1, 0];
      }
      this.colPadding = colPadding;
    }
  }

  getRowPadding(rowLength, maxLength) {
    let rowPadding = [0, 0];
    const alpha = maxLength - rowLength;

    if (rowLength > maxLength) {
      throw new Error(`This prebuilt is too large. Expected row length <= ${maxLength}`);
    } else if (rowLength <= 0 || maxLength <= 0) {
      throw new Error(`Expected rowLength and maxLength >= 0, received rowLength:${rowLength}, maxLength:${maxLength}`);
    } else if (typeof rowLength !== 'number') {
      throw new Error(`Expected rowLength to be a number but received ${typeof rowLength}`);
    } else if (typeof maxLength !== 'number') {
      throw new Error(`Expected maxLength to be a number but received ${typeof maxLength}`);
    } else {
      if (alpha > 1) {
        rowPadding = Prebuilts.findPadding(rowLength, maxLength);
      } else if (alpha === 1) {
        rowPadding = [1, 0];
      }
      this.rowPadding = rowPadding;
    }
  }
}
