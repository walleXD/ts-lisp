import { pipe } from 'lodash/fp'

/**
 * Takes a lisp program as string and returns array of raw token strings
 * @param {string} program
 * @returns {string[]} array of token strings
 */
export const generateRawTokens = (
  program: string
): string[] =>
  program
    .split('"')
    .map((val, i): string =>
      i % 2 == 0
        ? val.replace(/\(/g, ' ( ').replace(/\)/g, ' ) ')
        : `"${val.replace(/\s/g, '!whitespace!')}"`
    )
    .join(' ')
    .trim()
    .split(' ')
    .map((val): string => val.replace(/!whitespace!/, ' '))
    .filter((val): boolean => val != '')

/**
 * Types of tokens
 * @enum TokenTypes
 */
export enum TokenTypes {
  PAREN_OPEN,
  PAREN_CLOSE,
  NUMERIC_ATOM,
  LITERAL_ATOM,
  STRING_ATOM,
  ERROR
}

/**
 * Interface for tokens
 * @interface Token
 */
export interface Token {
  type: TokenTypes
  value: string | number
  size: number
}

/**
 * Generates token for numeric atoms
 * @param rawToken
 * @returns {Token} token for numeric atom
 */
const tokenizeNum = (rawToken: string): Token => ({
  size: rawToken.length,
  value: Number(rawToken),
  type: TokenTypes.NUMERIC_ATOM
})

/**
 * Generates token for parenthesis atoms
 * @param rawToken Raw string token
 * @returns {Token} token for literal atom
 */
const tokenizeParen = (rawToken: string): Token => ({
  size: 1,
  value: rawToken,
  type:
    rawToken === '('
      ? TokenTypes.PAREN_OPEN
      : TokenTypes.PAREN_CLOSE
})

/**
 * Generates token for string atoms
 * @param rawToken Raw string token
 * @returns {Token} token for string atom
 */
const tokenizeString = (rawToken: string): Token => ({
  size: rawToken.length,
  value: rawToken,
  type: TokenTypes.STRING_ATOM
})

/**
 * Generates token for literal atoms
 * @param rawToken Raw string token
 * @returns {Token} token for literal atom
 */
const tokenizeLiteral = (rawToken: string): Token => ({
  size: rawToken.length,
  value: rawToken,
  type: TokenTypes.LITERAL_ATOM
})

/**
 * Takes a string token and then return appropriate token
 * @param {string} rawToken Raw string token
 * @returns {Token} Appropriate token based the given raw token
 */
export const tokenize = (rawToken: string): Token => {
  if (Number(rawToken)) return tokenizeNum(rawToken)
  else if (rawToken === '(' || rawToken === ')')
    return tokenizeParen(rawToken)
  else if (rawToken.charAt(0) === '"')
    return tokenizeString(
      rawToken.substring(1, rawToken.length - 1)
    )
  else return tokenizeLiteral(rawToken)
}

/**
 * Generates an array of Tokens
 * @param {string[]} rawTokens Array of raw tokens
 * @returns {Token[]} Array of Token
 */
export const generateTokens = (
  rawTokens: string[]
): Token[] => rawTokens.map(tokenize)

/**
 * Generate tokens from a program
 * @param {string} program Takes LISP program as a string
 * @returns {Token[]} Array of Token generated from LISP program
 */
export default (program: string): Token[] =>
  pipe(
    generateRawTokens,
    generateTokens
  )(program)
