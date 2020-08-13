export function debounce (fn, delay = 500) {
  let timer = null
  return function () {
    if (timer) {
      clearInterval(timer)
    }
    timer = setTimeout(function () {
      fn.apply(this, arguments)
      timer = null
    }, delay)
  }
}