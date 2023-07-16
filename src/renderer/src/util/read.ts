/**
 * 判断输入类型
 * @param input 输入
 * @returns 输入类型：url、text
 */
export function getInputType(input: string): 'url' | 'text' {
  if (input.startsWith('http') || input.startsWith('https')) {
    return 'url'
  } else {
    return 'text'
  }
}
