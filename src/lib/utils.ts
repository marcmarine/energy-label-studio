export function cx(...args: unknown[]) {
  return args
    .flat()
    .filter(item => typeof item === 'string')
    .join(' ')
    .trim()
}
