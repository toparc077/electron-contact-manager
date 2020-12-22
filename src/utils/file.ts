const fs = window.require('fs')
export const readFile = (
  url: string,
  callback: (status: boolean, res: string | undefined) => void
): void => {
  fs.readFile(url, 'utf-8', (err: string, data: string) => {
    if (err) {
      // eslint-disable-next-line standard/no-callback-literal
      callback(false, undefined)
    } else {
      // eslint-disable-next-line standard/no-callback-literal
      callback(true, data)
    }
  })
}

export const saveFile = (
  data: string,
  url: string
  // callback: (status: boolean, res: string | undefined) => void
): Promise<string> => {
  return fs.writeFileSync(url, data, { encoding: 'utf8', flag: 'w' })
}
