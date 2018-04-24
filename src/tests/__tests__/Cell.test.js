import Cell from '../../models/Cell';
import { Gameboard } from '../../models/Gameboard';

describe('The Cell factory should:', () => {
  it('should return an object with initial properties', () => {
    const cell = Cell(1, 1, 0, [5, 5], 0);
    const computedCell = {
      x: 1,
      y: 1,
      cellState: 0,
      cellHash: 15486047 + 15487429,
      toroidalLimits: [5, 5],
      arrayPosition: 0,
    };
    expect(cell).toMatchObject(computedCell);
    expect(cell).toHaveProperty('x');
    expect(cell).toHaveProperty('y');
    expect(cell).toHaveProperty('cellState');
    expect(cell).toHaveProperty('cellHash');
    expect(cell).toHaveProperty('toroidalLimits');
    expect(cell).toHaveProperty('arrayPosition');
    expect(cell).not.toHaveProperty('nextState')
  });

  it('should compute a nextState when passed a gameboard to reference neighbors from', () => {
    const cell = Cell(1, 1, 0, [5, 5], 0);
  });
});
