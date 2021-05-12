const reg =
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/

export const isUrl = (path: string): boolean => reg.test(path)

// const isPromise = (value: any) => {
//   return !!(
//     value &&
//     value.then &&
//     typeof value.then === 'function' &&
//     value?.constructor?.name === 'Promise'
//   )
// }

// function isFunction(func: any) {
//   return func && {}.toString.call(func) === '[object Function]';
// }
