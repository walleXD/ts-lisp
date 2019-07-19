import lexer from '../lexer'

describe('basic', (): void => {
  const basicProgram = `(ADD 1 2)`

  it('handle input', (): void => {
    expect(lexer(basicProgram)).toEqual(['ADD', '1', '2'])
  })
})
