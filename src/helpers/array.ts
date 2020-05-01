export const EMPTY = 0

export const isEmpty = (array: any[]) =>
  typeof array !== 'undefined' && 'length' in array && array.length === EMPTY
    ? true
    : false
