# 🧪 Guia de Testes - Sports Space App

Este guia explica como configurar, executar e escrever testes para a aplicação Sports Space usando Jest e React Native Testing Library.

## 📋 **Configuração Inicial**

### **1. Instalar Dependências**

```bash
npm install
# ou
yarn install
```

### **2. Verificar Configuração**

Os arquivos de configuração já estão incluídos:

- `jest.config.js` - Configuração principal do Jest
- `jest.setup.js` - Setup e mocks globais
- `package.json` - Scripts de teste

## 🚀 **Como Rodar os Testes**

### **Comandos Disponíveis:**

```bash
# Rodar todos os testes (uma vez)
npm test
# ou
npx jest

# Rodar testes em modo watch (reexecuta quando arquivos mudam)
npm run test:watch
# ou
npx jest --watch

# Rodar testes com cobertura de código
npm run test:coverage
# ou
npx jest --coverage

# Rodar testes para CI/CD
npm run test:ci
# ou
npx jest --ci --coverage --watchAll=false
```

### **Rodar Testes Específicos:**

```bash
# Rodar apenas testes de uma entidade
npx jest Space.entity.test.ts

# Rodar testes que contenham "Space" no nome
npx jest --testNamePattern="Space"

# Rodar testes de um diretório específico
npx jest app/__tests__/

# Rodar em modo verbose (mais detalhes)
npx jest --verbose

# Rodar apenas testes que falharam na última execução
npx jest --onlyFailures
```

## 📁 **Estrutura de Testes**

```
app/
├── __tests__/                    # Testes principais
│   ├── Space.entity.test.ts     # Testes da entidade Space
│   ├── GetSpacesUseCase.test.ts # Testes do caso de uso
│   └── SpaceController.test.ts   # Testes do controller
├── domain/
│   ├── entities/
│   ├── repositories/
│   └── usecases/
├── infrastructure/
└── presentation/
```

## 🎯 **Tipos de Teste Implementados**

### **1. Testes de Entidade (Domain)**

```typescript
// app/__tests__/Space.entity.test.ts
describe('Space Entity', () => {
  it('deve verificar se tem um esporte específico', () => {
    const space = new Space(/*...*/);
    expect(space.hasSport('Beach Tennis')).toBe(true);
  });
});
```

### **2. Testes de Caso de Uso (Use Cases)**

```typescript
// app/__tests__/GetSpacesUseCase.test.ts
describe('GetSpacesUseCase', () => {
  it('deve aplicar regras de negócio corretamente', async () => {
    const result = await useCase.execute();
    expect(result[0].rating).toBeGreaterThanOrEqual(1.0);
  });
});
```

### **3. Testes de Controller (Presentation)**

```typescript
// app/__tests__/SpaceController.test.ts
describe('SpaceController', () => {
  it('deve retornar espaços formatados como ViewModel', async () => {
    const result = await controller.getAllSpaces();
    expect(result[0].formattedPrice).toBe('R$ 100.00');
  });
});
```

## 📊 **Cobertura de Código**

### **Visualizar Cobertura:**

```bash
# Gerar relatório de cobertura
npm run test:coverage

# Abrir relatório HTML (após rodar o comando acima)
open coverage/lcov-report/index.html
```

### **Metas de Cobertura:**

- **Entidades**: 100% (lógica de negócio crítica)
- **Use Cases**: 95% (regras de negócio)
- **Controllers**: 90% (adaptadores)
- **Repositories**: 85% (infraestrutura)

## 🔧 **Mocks e Configurações**

### **Mocks Automáticos (jest.setup.js):**

- ✅ Firebase/Firestore
- ✅ Expo Router
- ✅ Expo Modules
- ✅ React Native Reanimated
- ✅ Async Storage

### **Exemplo de Mock Personalizado:**

```typescript
// No seu teste
jest.mock('../infrastructure/repositories/FirestoreSpaceRepository', () => ({
  FirestoreSpaceRepository: jest.fn().mockImplementation(() => ({
    findAll: jest.fn().mockResolvedValue([]),
  })),
}));
```

## ✍️ **Escrevendo Novos Testes**

### **1. Teste de Entidade:**

```typescript
// app/__tests__/MinhaEntidade.test.ts
import { MinhaEntidade } from '../domain/entities/MinhaEntidade';

describe('MinhaEntidade', () => {
  let entidade: MinhaEntidade;

  beforeEach(() => {
    entidade = new MinhaEntidade(/*...*/);
  });

  it('deve fazer algo específico', () => {
    const resultado = entidade.metodo();
    expect(resultado).toBe(esperado);
  });
});
```

### **2. Teste de Caso de Uso:**

```typescript
// app/__tests__/MeuUseCase.test.ts
import { MeuUseCase } from '../domain/usecases/MeuUseCase';

describe('MeuUseCase', () => {
  let mockRepository: jest.Mocked<MeuRepository>;
  let useCase: MeuUseCase;

  beforeEach(() => {
    mockRepository = {
      metodo: jest.fn(),
    } as any;
    useCase = new MeuUseCase(mockRepository);
  });

  it('deve executar com sucesso', async () => {
    mockRepository.metodo.mockResolvedValue(dados);

    const resultado = await useCase.execute();

    expect(mockRepository.metodo).toHaveBeenCalledTimes(1);
    expect(resultado).toEqual(esperado);
  });
});
```

### **3. Teste de Controller:**

```typescript
// app/__tests__/MeuController.test.ts
import { MeuController } from '../presentation/controllers/MeuController';

describe('MeuController', () => {
  let mockUseCase: jest.Mocked<MeuUseCase>;
  let controller: MeuController;

  beforeEach(() => {
    mockUseCase = {
      execute: jest.fn(),
    } as any;
    controller = new MeuController(mockUseCase);
  });

  it('deve retornar ViewModel formatado', async () => {
    mockUseCase.execute.mockResolvedValue(entidade);

    const resultado = await controller.metodo();

    expect(resultado.campoFormatado).toBe('valor esperado');
  });
});
```

## 🎯 **Boas Práticas**

### **✅ DO (Faça):**

- Teste comportamentos, não implementação
- Use nomes descritivos para testes
- Mantenha testes simples e focados
- Mock dependências externas
- Teste casos de erro
- Mantenha alta cobertura em código crítico

### **❌ DON'T (Não Faça):**

- Teste detalhes de implementação
- Copie e cole testes
- Ignore testes que falham
- Teste apenas casos de sucesso
- Mock tudo desnecessariamente

## 🐛 **Debugging de Testes**

### **Testes Falhando:**

```bash
# Rodar teste específico com mais detalhes
npm test -- --verbose MeuTeste.test.ts

# Debug com logs
npm test -- --silent=false

# Rodar apenas testes que falharam
npm test -- --onlyFailures
```

### **Problemas Comuns:**

1. **Mock não funcionando**: Verifique o caminho do import
2. **Async/await**: Certifique-se de usar await em funções assíncronas
3. **Timeout**: Aumente o timeout para operações lentas

## 📈 **Integração com CI/CD**

### **GitHub Actions:**

```yaml
# .github/workflows/test.yml
- name: Run tests
  run: npm run test:ci

- name: Upload coverage
  uses: codecov/codecov-action@v1
```

### **Verificações Antes de Commit:**

```bash
# Verificar se todos os testes passam
npm run test:ci

# Verificar cobertura
npm run test:coverage
```

## 🎯 **Próximos Passos**

1. **Testes de Integração**: Testar fluxos completos
2. **Testes E2E**: Usar Detox ou Maestro
3. **Testes de Performance**: Benchmarks de use cases
4. **Testes de Acessibilidade**: React Native Testing Library

## 📋 **Checklist de Teste**

Antes de fazer commit, verifique:

- [ ] ✅ Todos os testes passam
- [ ] ✅ Cobertura adequada (>85%)
- [ ] ✅ Testes para casos de erro
- [ ] ✅ Mocks apropriados
- [ ] ✅ Nomes descritivos
- [ ] ✅ Documentação atualizada

---

**Happy Testing! 🧪✨**
