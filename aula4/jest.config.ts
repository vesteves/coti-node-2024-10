export default {
  preset: 'ts-jest', // Usa o preset do ts-jest
  testEnvironment: 'node', // Define o ambiente de teste
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // Extensões reconhecidas
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Transforma arquivos TS com ts-jest
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Configura aliases, se necessário
  },
  testMatch: ['**/*.spec.ts', '**/*.test.ts'], // Encontra testes com `.spec.ts` ou `.test.ts`
};
