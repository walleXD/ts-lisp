import { Token, TokenTypes } from './lexer'

export interface BinaryTreeNode {
  data: Token
  left?: BinaryTreeNode
  right?: BinaryTreeNode
}

export const emptyNode: BinaryTreeNode = {
  data: {
    type: TokenTypes.EMPTY,
    value: null,
    size: 0
  }
}

export const addNode = (
  rootNode: BinaryTreeNode,
  newNode: BinaryTreeNode
): BinaryTreeNode => ({
  ...rootNode,
  left: newNode,
  right: emptyNode
})

export default (
  tokens: Token[],
  node = emptyNode
): BinaryTreeNode => {
  return node
}
