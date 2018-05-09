// These are methods used solely by the prebuilt options.
// They do not directly change props.
// Imported directly into the ConfigPreview for array manipulations.

export default class Prebuilts {

  rowPadding = [];
  colPadding = [];

  static isEven(n) {
    return n === parseFloat(n) ? !(n % 2) : undefined;
  }

  static findPadding(a, b) {
    if (a >= b) {
      throw new Error('Param a cannot be greater than or equal b. These should be handled by the originating function.');
    } else {
      const isEven = Prebuilts.isEven(a);
      const alpha = b - a;
      if (isEven) {
        return [((alpha - 1) / 2) + 1, ((alpha - 1) / 2)];
      }
      return [(b - a) / 2, (b - a) / 2];
    }
  }

  static createStackedArray(arr, rowLength) {
    if ((arr.length / rowLength) % 1 !== 0) {
      throw new Error('Array to convert is not a multiple of rowLength, thus not a complete prebuilt.');
    } else if (rowLength === undefined) {
      throw new Error('Param rowLength is required.');
    } else if (typeof rowLength !== 'number') {
      throw new Error('Param rowLength must be a number.');
    } else {
      const stackedArr = [];
      for (let i = 0; i < arr.length; i += rowLength) {
        stackedArr.push(arr.slice(i, i + rowLength));
      }
      return stackedArr;
    }
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
    const colHeight = Prebuilts.getColHeight(arrLength, rowLength);
    const alpha = maxHeight - colHeight;
    let colPadding = [0, 0];

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
      throw new Error(`This prebuilt is too large. Expected row length <= ${maxLength}.`);
    } else if (rowLength <= 0 || maxLength <= 0) {
      throw new Error(`Expected rowLength and maxLength >= 0, received rowLength:${rowLength}, maxLength:${maxLength}.`);
    } else if (typeof rowLength !== 'number') {
      throw new Error(`Expected rowLength to be a number but received ${typeof rowLength}.`);
    } else if (typeof maxLength !== 'number') {
      throw new Error(`Expected maxLength to be a number but received ${typeof maxLength}.`);
    } else {
      if (alpha > 1) {
        rowPadding = Prebuilts.findPadding(rowLength, maxLength);
      } else if (alpha === 1) {
        rowPadding = [1, 0];
      }
      this.rowPadding = rowPadding;
    }
  }

  padRows(arr, rowLength, squareDimension) {
    this.getRowPadding(rowLength, squareDimension);
    return [...Prebuilts.createStackedArray(arr, rowLength)]
                        .map(row => [
                          ...Array(this.rowPadding[0]).fill(0),
                          ...row,
                          ...Array(this.rowPadding[1]).fill(0),
                        ]);
  }

  redraw(arr, rowLength, squareDimension) {
    const cols = this.getColPadding(arr.length, rowLength, squareDimension);
    const paddedRows = this.padRows(arr, rowLength, squareDimension);
    const newRowLength = paddedRows[0].length;
    const top = Array(this.colPadding[0]).fill([]).map(() => Array(newRowLength).fill(0));
    const bottom = Array(this.colPadding[1]).fill([]).map(() => Array(newRowLength).fill(0));
    return [...top, ...paddedRows, ...bottom].reduce((a, b) => a.concat(b), []);
  }
}
