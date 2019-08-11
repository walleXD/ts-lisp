import parse, {
  addNode,
  BinaryTreeNode,
  createNode
} from '../parser'
import getTokens, { TokenTypes, tokenize } from '../lexer'

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
        ...createNode(),
        right: createNode(),
        left: newNode
      }

      expect(addNode(newNode, createNode())).toEqual(
        testNode
      )
    })
  })

  describe('parsing', (): void => {
    describe('only atoms', (): void => {
      it('numeric', (): void => {
        const program = '2'
        const tokens = getTokens(program)
        const bTree = parse(tokens)

        expect(bTree).toEqual(createNode(tokenize(program)))
      })

      it('literal', (): void => {
        const program = 'ADD'
        const tokens = getTokens(program)
        const bTree = parse(tokens)

        expect(bTree).toEqual(createNode(tokenize(program)))
      })

      it('string', (): void => {
        const program = '"Life is Good"'
        const tokens = getTokens(program)
        const bTree = parse(tokens)

        expect(bTree).toEqual(createNode(tokenize(program)))
      })
    })
  })
})
