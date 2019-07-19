import parse, {
  addNode,
  BinaryTreeNode,
  emptyNode
} from '../parser'
import getTokens, { TokenTypes } from '../lexer'

describe('parser', (): void => {
  describe('binary tree', (): void => {
    it('add node', (): void => {
      const newNode: BinaryTreeNode = {
        data: {
          type: TokenTypes.NUMERIC_ATOM,
          value: 2,
          size: 1
        }
      }

      const testNode: BinaryTreeNode = {
        ...emptyNode,
        right: emptyNode,
        left: newNode
      }

      expect(addNode(emptyNode, newNode)).toEqual(testNode)
    })
  })

  describe('parsing', (): void => {
    it('parse atoms', (): void => {
      const program = '2'
      let tokens = getTokens(program)

      const bTree = parse(tokens)
    })
  })
})
