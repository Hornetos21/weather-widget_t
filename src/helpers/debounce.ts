export const debounce = <T extends (...args: any[]) => any>(
  fn: T,
  timeout = 300
) => {
  let timer: ReturnType<typeof setTimeout>

  return (...args: Parameters<T>) => {
    clearInterval(timer)
    timer = setTimeout(() => fn(...args), timeout)
  }
}
