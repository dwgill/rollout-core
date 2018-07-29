import calculateModifier from './calculateModifier';

describe('calculateModifier', () => {
  test('score of 3', () => {
    expect(calculateModifier(3)).toEqual(-4);
  });
  test('score of 4', () => {
    expect(calculateModifier(4)).toEqual(-3);
  });
  test('score of 5', () => {
    expect(calculateModifier(5)).toEqual(-3);
  });
  test('score of 6', () => {
    expect(calculateModifier(6)).toEqual(-2);
  });
  test('score of 7', () => {
    expect(calculateModifier(7)).toEqual(-2);
  });
  test('score of 8', () => {
    expect(calculateModifier(8)).toEqual(-1);
  });
  test('score of 9', () => {
    expect(calculateModifier(9)).toEqual(-1);
  });
  test('score of 10', () => {
    expect(calculateModifier(10)).toEqual(0);
  });
  test('score of 11', () => {
    expect(calculateModifier(11)).toEqual(0);
  });
  test('score of 12', () => {
    expect(calculateModifier(12)).toEqual(1);
  });
  test('score of 13', () => {
    expect(calculateModifier(13)).toEqual(1);
  });
  test('score of 14', () => {
    expect(calculateModifier(14)).toEqual(2);
  });
  test('score of 15', () => {
    expect(calculateModifier(15)).toEqual(2);
  });
  test('score of 16', () => {
    expect(calculateModifier(16)).toEqual(3);
  });
  test('score of 17', () => {
    expect(calculateModifier(17)).toEqual(3);
  });
  test('score of 18', () => {
    expect(calculateModifier(18)).toEqual(4);
  });
});
