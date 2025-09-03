# Clean Architecture - Sports Space App

Este documento descreve a implementação da Clean Architecture na aplicação Sports Space, focando no desacoplamento dos métodos do Firestore e organização do código seguindo princípios SOLID.

## 📁 Estrutura de Pastas

```
app/
├── domain/                    # Camada de Domínio (Regras de Negócio)
│   ├── entities/             # Entidades do domínio
│   │   └── Space.ts
│   ├── repositories/         # Interfaces dos repositórios
│   │   └── SpaceRepository.ts
│   └── usecases/            # Casos de uso (regras de negócio)
│       ├── GetSpacesUseCase.ts
│       ├── GetSpacesByFilterUseCase.ts
│       └── GetSpaceByIdUseCase.ts
├── infrastructure/           # Camada de Infraestrutura
│   ├── repositories/        # Implementações concretas
│   │   └── FirestoreSpaceRepository.ts
│   └── di/                  # Injeção de Dependência
│       └── DIContainer.ts
├── presentation/            # Camada de Apresentação
│   ├── controllers/         # Controllers/Adapters
│   │   └── SpaceController.ts
│   └── hooks/              # Hooks personalizados
│       └── useSpaces.ts
└── __tests__/              # Testes unitários
    └── SpaceController.test.ts
```

## 🏗️ Camadas da Arquitetura

### 1. **Domain** (Domínio)

**Responsabilidade**: Contém as regras de negócio puras, independentes de frameworks

- **Entities**: Objetos de negócio com lógica própria
- **Repositories**: Interfaces que definem contratos de persistência
- **Use Cases**: Implementam casos de uso específicos da aplicação

**Características**:

- ✅ Não depende de nenhuma camada externa
- ✅ Contém apenas lógica de negócio pura
- ✅ Facilmente testável

### 2. **Infrastructure** (Infraestrutura)

**Responsabilidade**: Implementa detalhes técnicos e frameworks externos

- **Repositories**: Implementações concretas usando Firestore, APIs, etc.
- **DI Container**: Gerencia dependências e configurações

**Características**:

- ✅ Conhece detalhes de implementação (Firebase, HTTP, etc.)
- ✅ Implementa interfaces definidas no domínio
- ✅ Pode ser facilmente substituída

### 3. **Presentation** (Apresentação)

**Responsabilidade**: Adapta dados entre UI e casos de uso

- **Controllers**: Coordenam casos de uso e formatam dados
- **Hooks**: Gerenciam estado e efeitos colaterais da UI
- **ViewModels**: Formatam dados para apresentação

**Características**:

- ✅ Conecta UI aos casos de uso
- ✅ Formata dados para apresentação
- ✅ Gerencia estado da aplicação

## 🔄 Fluxo de Dados

```
UI Component → Hook → Controller → Use Case → Repository → Database
     ↑                                                         ↓
     ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←
```

## 🚀 Como Usar

### 1. **Configuração Inicial**

```typescript
// No componente React
import { getDIContainer } from '../infrastructure/di/DIContainer';
import { useSpaces } from '../presentation/hooks/useSpaces';

const diContainer = getDIContainer();
const spaceController = diContainer.getSpaceController();
const { spaces, loading, error, loadSpaces } = useSpaces(spaceController);
```

### 2. **Carregando Espaços**

```typescript
// Carregar todos os espaços
await loadSpaces();

// Carregar com filtros
await loadSpacesByFilter({
  sport: 'Beach Tennis',
  minPrice: 50,
  maxPrice: 200,
  rating: 4.0,
});
```

### 3. **Adicionando Nova Funcionalidade**

Para adicionar uma nova funcionalidade (ex: favoritos):

1. **Criar entidade** (`domain/entities/Favorite.ts`)
2. **Criar repositório** (`domain/repositories/FavoriteRepository.ts`)
3. **Criar use case** (`domain/usecases/AddFavoriteUseCase.ts`)
4. **Implementar repositório** (`infrastructure/repositories/FirestoreFavoriteRepository.ts`)
5. **Criar controller** (`presentation/controllers/FavoriteController.ts`)
6. **Configurar DI** (adicionar no `DIContainer.ts`)

## 🧪 Testes

### Testando Use Cases

```typescript
const mockRepository = new MockSpaceRepository();
const useCase = new GetSpacesUseCase(mockRepository);
const result = await useCase.execute();
```

### Testando Controllers

```typescript
const mockUseCase = jest.fn();
const controller = new SpaceController(mockUseCase, ...);
const result = await controller.getAllSpaces();
```

## ✅ Vantagens desta Arquitetura

### **Desacoplamento**

- Firestore pode ser substituído por API REST sem alterar regras de negócio
- UI pode ser alterada sem impactar lógica de negócio
- Casos de uso são independentes de frameworks

### **Testabilidade**

- Cada camada pode ser testada isoladamente
- Mocks são facilmente criados através das interfaces
- Testes unitários são rápidos e confiáveis

### **Manutenibilidade**

- Responsabilidades bem definidas
- Fácil localização de bugs
- Mudanças impactam apenas camadas específicas

### **Escalabilidade**

- Nova funcionalidades seguem padrão estabelecido
- Fácil adição de novas fontes de dados
- Reutilização de casos de uso

## 🔧 Configurações Específicas para React Native

### **Hooks Personalizados**

```typescript
// Encapsula lógica de estado e efeitos
const { spaces, loading, error } = useSpaces(controller);
```

### **Gerenciamento de Estado**

- Estado local via hooks
- Cache automático via singleton do DI Container
- Loading e error states padronizados

### **Performance**

- Lazy loading das dependências
- Memoização nos hooks
- Singleton pattern para evitar recriação

## 🎯 **Controller vs Hook: Quando Usar Cada Abordagem**

### **🔍 Diferença Fundamental**

#### **Controller (Lógica de Negócio)**

```typescript
// Controller = "O QUE fazer"
const spaces = await spaceController.getAllSpaces();
// ✅ Retorna dados
// ❌ NÃO gerencia estado React
// ❌ NÃO gerencia loading/error
```

#### **Hook (Estado + Lógica de UI)**

```typescript
// Hook = "COMO fazer na UI"
const { spaces, loading, error } = useSpaces(spaceController);
// ✅ Retorna dados + estado
// ✅ Gerencia loading/error automaticamente
// ✅ Reatividade do React
```

### **📊 Quando Usar Cada Abordagem**

#### **🟢 USE HOOK quando:**

```typescript
// ✅ Tela complexa com múltiplos estados
const { spaces, loading, error, refresh } = useSpaces(controller);

// ✅ Precisa de reatividade automática
useEffect(() => loadSpaces(), [filters]);

// ✅ Gerenciamento de estado complexo
// - Loading states
// - Error handling
// - Refresh/retry
// - Cache local
```

**Casos ideais:**

- 📋 **Listas com filtros/busca**
- 🔄 **Pull-to-refresh**
- ⚡ **Real-time updates**
- 🎯 **Multiple loading states**
- 🚨 **Error recovery**

#### **🟡 USE CONTROLLER DIRETO quando:**

```typescript
// ✅ Ação pontual/one-shot
const space = await controller.getSpaceById(id);

// ✅ Não precisa de estado reativo
const handleSubmit = async () => {
  await controller.createSpace(data);
  navigate('/success');
};

// ✅ Lógica simples sem UI complexa
```

**Casos ideais:**

- 🎯 **Ações pontuais** (submit, delete)
- 🚀 **Navegação simples**
- 📝 **Formulários básicos**
- 💾 **Operações CRUD simples**

### **🔄 Abordagem Híbrida (Recomendada)**

```typescript
export function SpaceListScreen() {
  // Hook para lista principal (estado complexo)
  const { spaces, loading, loadSpacesByFilter } = useSpaces(controller);

  // Controller direto para ações pontuais
  const handleFavorite = async (spaceId: string) => {
    await controller.toggleFavorite(spaceId);
    // Sem necessidade de estado reativo aqui
  };

  const handleNavigateToDetails = async (spaceId: string) => {
    // Pre-load dados para melhor UX
    controller.preloadSpaceDetails(spaceId);
    router.push(`/space/${spaceId}`);
  };

  return (
    <FlatList
      data={spaces}
      renderItem={({ item }) => (
        <SpaceCard
          space={item}
          onPress={() => handleNavigateToDetails(item.id)}
          onFavorite={() => handleFavorite(item.id)}
        />
      )}
    />
  );
}
```

### **📋 Guia de Decisão por Complexidade**

| Complexidade | Operações | Filtros                       | Recomendação      |
| ------------ | --------- | ----------------------------- | ----------------- |
| **Simples**  | 1-2 ops   | Sem filtros                   | Controller Direto |
| **Média**    | 3-5 ops   | Filtros básicos               | Hook Básico       |
| **Complexa** | 5+ ops    | Filtros avançados + Real-time | Hook Avançado     |

### **🚀 Aplicação no Projeto Sports Space**

#### **✅ USE HOOKS para:**

```typescript
// Telas complexas
-app / tabs / index.tsx - // Lista principal com filtros
  app / space / [id].tsx - // Detalhes complexos
  app / modals / booking.tsx; // Múltiplos estados
```

#### **✅ USE CONTROLLER para:**

```typescript
// Telas simples
- app/(auth)/login.tsx         // Login simples
- app/(tabs)/profile.tsx       // Perfil básico
- Ações pontuais (favoritar, compartilhar)
```

#### **✅ USE HÍBRIDO para:**

```typescript
// Telas médias
- Mix de complexidade
- Performance otimizada
- Melhor UX
```

### **🎯 Regra Prática**

**A regra é simples:**

- **Estado reativo complexo** → Hook
- **Ação pontual simples** → Controller direto
- **Mix dos dois** → Híbrido

> **Importante**: O hook **NÃO substitui** o controller, ele **complementa** adicionando gerenciamento de estado React. Use conforme a necessidade da tela!

## 🔄 Migração do Código Existente

### Antes (Acoplado)

```typescript
// Componente diretamente acoplado ao Firestore
import { getSpaces } from '../services/firestore';

const spaces = await getSpaces();
```

### Depois (Desacoplado)

```typescript
// Componente usa abstração através da arquitetura
const { spaces } = useSpaces(spaceController);
```

## 📋 Checklist de Implementação

- [x] ✅ Entidades de domínio criadas
- [x] ✅ Interfaces de repositório definidas
- [x] ✅ Casos de uso implementados
- [x] ✅ Repositório Firestore implementado
- [x] ✅ Controllers e adapters criados
- [x] ✅ Hooks personalizados
- [x] ✅ Container de DI configurado
- [x] ✅ Exemplo de refatoração de componente
- [x] ✅ Testes unitários de exemplo

## 🎯 Próximos Passos

1. **Refatorar todos os componentes** para usar a nova arquitetura
2. **Implementar cache** para melhorar performance
3. **Adicionar logging** centralizado
4. **Criar interceptors** para tratamento de erros
5. **Implementar offline-first** com sincronização

Esta arquitetura garante que a aplicação seja **maintível**, **testável** e **escalável**, seguindo as melhores práticas de desenvolvimento mobile.
