export default function buildMap<T extends { id: string }>(arr: T[]) {
  return buildMapByKey(arr, "id");
}

/**
 * build a quick lookup map
 * @param arr
 * @param key unique identifier
 * @returns
 */
export function buildMapByKey<T extends { [k: string]: any }>(
  arr: T[],
  key: string
) {
  const bag: { [k: string]: T } = {};
  arr.forEach((a) => (bag[a[key]] = a));
  return bag;
}

/**
 * build a quick lookup map, each field returns a list of items
 * @param arr
 * @param field non-unique field
 * @returns
 */
export function buildMapByField<T extends { [k: string]: any }>(
  arr: T[],
  field: string
) {
  const bag: { [k: string]: T[] } = {};
  arr.forEach((a) => {
    const key = a[field];
    const existed = bag[key] || [];
    bag[key] = existed.concat(a);
  });
  return bag;
}

/**
 * build a quick lookup map, each field returns a list of items
 * this function is dedicated for fields which is array
 * example: `{a: 1, b: 2, c: ['t', 'z']}`, we will index by `c`
 * @param arr
 * @param field non-unique field
 * @returns
 */
export function buildMapByFieldMany<T extends { [k: string]: any }>(
  arr: T[],
  getKeys: (v:T) => string[]
) {
  const bag: { [k: string]: T[] } = {};
  arr.forEach((a) => {
    const keys = getKeys(a)
    keys.forEach(key => {
      const existed = bag[key] || [];
      bag[key] = existed.concat(a);
    })
  });
  return bag;
}
