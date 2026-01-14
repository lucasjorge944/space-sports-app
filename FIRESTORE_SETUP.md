# 🔥 Configuração do Firestore - Resolvendo Erro de Permissões

## 🚨 Problema Identificado

O erro `Missing or insufficient permissions` ocorre porque o Firestore está configurado com regras de segurança que requerem autenticação, mas a autenticação Firebase não estava habilitada no projeto.

## ✅ Soluções Implementadas

### 1. Autenticação Firebase Habilitada
- ✅ Importação do `getAuth` habilitada em `firebaseConfig.ts`
- ✅ Exportação do `auth` adicionada
- ✅ `AuthContext.tsx` totalmente funcional com Firebase Auth

### 2. Regras de Segurança Configuradas
- ✅ `firestore.rules` - Regras de produção (requer autenticação)
- ✅ `firestore-dev.rules` - Regras de desenvolvimento (acesso público)
- ✅ `firebase.json` - Configuração do projeto Firebase

## 🚀 Como Resolver o Erro Imediatamente

### Opção 1: Deploy das Regras de Desenvolvimento (Recomendado para desenvolvimento)

```bash
# No Firebase Console, vá para Firestore > Rules e cole estas regras:
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### Opção 2: Usar Firebase CLI (Se instalado)

```bash
# Instalar Firebase CLI (se não tiver)
npm install -g firebase-tools

# Login no Firebase
firebase login

# Inicializar projeto (se não foi feito)
firebase init firestore

# Deploy das regras de desenvolvimento
./deploy-firestore-rules.sh dev

# Ou deploy das regras de produção
./deploy-firestore-rules.sh prod
```

### Opção 3: Configurar Autenticação Primeiro

Se preferir manter as regras de segurança, você precisa:

1. **Habilitar Authentication no Firebase Console:**
   - Vá para Authentication > Sign-in method
   - Habilite "Email/Password"

2. **Criar um usuário de teste:**
   - Vá para Authentication > Users
   - Adicione um usuário manualmente

3. **Fazer login no app antes de acessar o Firestore**

## 📁 Arquivos Criados/Modificados

### Modificados:
- `app/config/firebaseConfig.ts` - Habilitada autenticação
- `app/contexts/AuthContext.tsx` - Implementação completa do Firebase Auth

### Criados:
- `firestore.rules` - Regras de produção
- `firestore-dev.rules` - Regras de desenvolvimento
- `firebase.json` - Configuração do Firebase
- `firestore.indexes.json` - Índices do Firestore
- `deploy-firestore-rules.sh` - Script para deploy

## ⚠️ Importante para Produção

**NUNCA use as regras de desenvolvimento em produção!** Elas permitem acesso público total aos seus dados.

Para produção, sempre use as regras em `firestore.rules` que requerem autenticação.

## 🔧 Próximos Passos

1. Deploy das regras de desenvolvimento no Firebase Console
2. Testar a conexão com Firestore
3. Implementar autenticação quando necessário
4. Migrar para regras de produção antes do deploy final
