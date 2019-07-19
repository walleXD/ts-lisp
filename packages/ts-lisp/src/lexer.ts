export const generateRawTokens = (
  program: string
): string[] =>
  program
    .split('"')
    .map((val, i): string =>
      i % 2 == 0
        ? val.replace(/\(/g, ' ( ').replace(/\)/g, ' ) ')
        : val.replace(/\s/g, '!whitespace!')
    )
    .join(' ')
    .trim()
    .split(' ')
    .map((val): string => val.replace(/!whitespace!/, ' '))
    .filter((val): boolean => val != '')
