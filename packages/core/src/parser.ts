import { Token, TokenTypes } from './lexer'

/**
 * Interface for binary tree nodes representing s-expression
 * @interface BinaryTreeNode
 */
export interface BinaryTreeNode {
  data: Token
  left?: BinaryTreeNode
  right?: BinaryTreeNode
}

/**
 * Creates a new [{BinaryTreeNode}] with the given @param or with [{TokenTypes.EMPTY}] token
 * @param token Token to generate the node with. If not provided, empty token is used to generate the node
 * @param left Left node to be added to the new node
 * @param right Right node to be added to the new node
 * @returns New [{BinaryTreeNode}] created using the passed or empty [{Token}]
 */
export const createNode = (
  token: Token = {
    type: TokenTypes.EMPTY,
    value: null,
    size: 0
  },
  left?: BinaryTreeNode,
  right?: BinaryTreeNode
): BinaryTreeNode => ({
  data: token,
  ...(left && { ...left }),
  ...(right && { ...right })
})

/**
 * Adds a [{BinaryTreeNode}] to the left of a given [{BinaryTreeNode}]
 * @param newNode Node to attach
 * @param rootNode Node to which given node will be attached
 * @returns Root node with the given node attached
 */
export const addNode = (
  newNode: BinaryTreeNode,
  rootNode: BinaryTreeNode
): BinaryTreeNode => ({
  ...rootNode,
  left: newNode,
  right: createNode()
})

/**
 * Parses atom tokens and creates appropriate binary tree
 * @param token Atom token
 * @param tokens All remaining tokens
 * @param node Root node to attach new node to
 * @returns Given node with new token node attached unless it's a singular token in which case a lone new node is returned with atom
 */
export const parseAtom = (
  token: Token,
  tokens: Token[],
  node: BinaryTreeNode
): BinaryTreeNode => {
  if (tokens.length === 1) {
    return createNode(token)
  }
  return addNode(createNode(token), node)
}

/**
 * Main parsing function to generate binary tree from tokens
 * @param tokens Tokens generated during lexing
 * @param node Root node to which newly generated nodes are attached to recursively
 */
const parse = (
  tokens: Token[],
  node = createNode()
): BinaryTreeNode => {
  if (
    tokens[0].type === TokenTypes.LITERAL_ATOM ||
    tokens[0].type === TokenTypes.NUMERIC_ATOM ||
    tokens[0].type === TokenTypes.STRING_ATOM
  )
    return parseAtom(tokens[0], tokens, node)
  return node
}

export default parse
