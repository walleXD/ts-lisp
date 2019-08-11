import {
  generateRawTokens,
  generateTokens,
  tokenize,
  TokenTypes,
  Token
} from '../index'

describe('lexer', (): void => {
  describe('raw tokens', (): void => {
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
        '"hello world"',
        ')'
      ])
    })
  })

  describe('tokenization', (): void => {
    it('numbers', (): void => {
      expect(tokenize('222')).toEqual({
        type: TokenTypes.NUMERIC_ATOM,
        value: 222,
        size: 3
      })
    })

    it('open paren', (): void => {
      expect(tokenize('(')).toEqual({
        type: TokenTypes.PAREN_OPEN,
        value: '(',
        size: 1
      })
    })

    it('close paren', (): void => {
      expect(tokenize(')')).toEqual({
        type: TokenTypes.PAREN_CLOSE,
        value: ')',
        size: 1
      })
    })

    it('strings', (): void => {
      expect(tokenize('"Hello World"')).toEqual({
        type: TokenTypes.STRING_ATOM,
        value: 'Hello World',
        size: 11
      })
    })

    it('literals', (): void => {
      expect(tokenize('ADD')).toEqual({
        type: TokenTypes.LITERAL_ATOM,
        value: 'ADD',
        size: 3
      })
    })

    it('generate tokens', (): void => {
      const program = '(ADD 1 2)'
      const tokens: Token[] = [
        {
          type: TokenTypes.PAREN_OPEN,
          value: '(',
          size: 1
        },
        {
          type: TokenTypes.LITERAL_ATOM,
          value: 'ADD',
          size: 3
        },
        {
          type: TokenTypes.NUMERIC_ATOM,
          value: 1,
          size: 1
        },
        {
          type: TokenTypes.NUMERIC_ATOM,
          value: 2,
          size: 1
        },
        {
          type: TokenTypes.PAREN_CLOSE,
          value: ')',
          size: 1
        }
      ]

      const generatedTokens = generateRawTokens(program)
      expect(generateTokens(generatedTokens)).toEqual(
        tokens
      )
    })
  })
})
