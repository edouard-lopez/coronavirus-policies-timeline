import {isEmpty, EMPTY} from './array'

test('should export EMPTY', () => {
    expect(EMPTY).toBe(0)
});
test('should be True when array is empty', () => {
    expect(isEmpty([])).toBe(true)
});

test('should be False when array is undefined', () => {
    expect(isEmpty(undefined)).toBe(false)
});

test('should be False when array is empty', () => {
    expect(isEmpty([1,2])).toBe(false)
});