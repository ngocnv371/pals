export function linearScale(start: number, stop: number, numSteps: number) {
  const stepSize = (stop - start) / numSteps;

  const values = [];

  for (let i = 0; i <= numSteps; i++) {
    const val = start + i * stepSize;
    values.push(val);
  }

  return values;
}
