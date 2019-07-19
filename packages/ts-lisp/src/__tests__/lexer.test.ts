import { generateRawTokens } from '../lexer'

describe('generate raw tokens', (): void => {
  it('handle input', (): void => {
    const basicProgram = `(ADD 1 2)`

    expect(generateRawTokens(basicProgram)).toEqual([
      '(',
      'ADD',
      '1',
      '2',
      ')'
    ])
  })

  it('handle strings', (): void => {
    const basicProgram = `("hello world")`

    expect(generateRawTokens(basicProgram)).toEqual([
      '(',
      'hello world',
      ')'
    ])
  })
})
