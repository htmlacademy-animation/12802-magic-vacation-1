export function promiseSeries(funcs, initial) {
  return funcs.reduce(
      (p, f) => p.then(f),
      Promise.resolve(initial)
  );
}
