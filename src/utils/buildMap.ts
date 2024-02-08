export default function buildMap<T extends { id: string }>(arr: T[]) {
  const bag: { [k: string]: T } = {};
  arr.forEach((a) => (bag[a.id] = a));
  return bag;
}

export function buildMapByKey<T extends { id: string; [k: string]: any }>(
  arr: T[],
  key: string
) {
  const bag: { [k: string]: T } = {};
  arr.forEach((a) => (bag[a[key]] = a));
  return bag;
}
