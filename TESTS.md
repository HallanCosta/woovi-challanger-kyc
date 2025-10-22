# Documentação de Testes

Este documento descreve a estrutura de testes implementada no projeto KYC Verification.

## 📊 Cobertura de Testes

**Total: 211 testes implementados** ✅

### Módulos Testados com 100% de Cobertura

#### 🔧 Utils e Validadores
- ✅ **Validators** (100%)
  - `cpf.ts` - 7 testes
  - `email.ts` - 7 testes
  - `phone.ts` - 9 testes
  - `fullName.ts` - 8 testes
  - `dateOfBirth.ts` - 6 testes
  - `file.ts` - 12 testes
  - `terms.ts` - 2 testes
  - `idType.ts` - 7 testes

- ✅ **Masks** (100%)
  - `cpfMask.ts` - 6 testes
  - `phoneMask.ts` - 8 testes
  - `postalCodeMask.ts` - 10 testes

- ✅ **Utils** (100%)
  - `cn.ts` - 7 testes

#### 🎣 Hooks Customizados
- ✅ `useToast` - 7 testes (100%)
- ✅ `useMultiStepForm` - 12 testes (100%)
- ✅ `useFileUpload` - 10 testes (90%)

#### 🎨 Componentes UI
- ✅ `Button` - 13 testes (100%)
- ✅ `Input` - 12 testes (100%)
- ✅ `FormField` - 10 testes (100%)
- ✅ `Avatar` - 7 testes (100%)
- ✅ `Toast` - 10 testes (100%)
- ✅ `LanguageSwitcher` - 5 testes (96%)

#### 📋 Componentes KYC
- ✅ `ProgressSteps` - 10 testes (100%)
- ✅ `PersonalInfoStep` - 10 testes (92%)
- ✅ `Header` - 7 testes (67%)

#### 🎭 Providers
- ✅ `ThemeProvider` - 4 testes

#### 📦 Constants
- ✅ `countries.ts` - 5 testes (100%)

## 🚀 Executando os Testes

### Comandos Disponíveis

```bash
# Executar todos os testes
pnpm test

# Executar com interface UI
pnpm test:ui

# Executar com relatório de cobertura
pnpm test:coverage
```

### Estrutura de Arquivos de Teste

Todos os arquivos de teste seguem a convenção `*.test.ts` ou `*.test.tsx` e estão localizados ao lado dos arquivos que testam.

```
src/
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   ├── Input.tsx
│   │   └── Input.test.tsx
│   └── kyc/
│       ├── ProgressSteps.tsx
│       └── ProgressSteps.test.tsx
├── hooks/
│   ├── useToast.ts
│   └── useToast.test.ts
└── lib/
    └── utils/
        ├── validators/
        │   ├── cpf.ts
        │   └── cpf.test.ts
        └── masks/
            ├── cpfMask.ts
            └── cpfMask.test.ts
```

## 🧪 Tecnologias Utilizadas

- **Vitest** - Framework de testes rápido e moderno
- **React Testing Library** - Testes focados no comportamento do usuário
- **@testing-library/user-event** - Simulação realista de eventos do usuário
- **jsdom** - Ambiente DOM para testes
- **@vitest/ui** - Interface visual para visualizar testes
- **@vitest/coverage-v8** - Relatórios de cobertura

## 📝 Padrões de Teste

### Validators
```typescript
describe('validateCPF', () => {
  it('deve validar um CPF válido', () => {
    expect(validateCPF('123.456.789-09')).toBe(true)
  })
  
  it('deve rejeitar CPF inválido', () => {
    expect(validateCPF('000.000.000-00')).toBe(false)
  })
})
```

### Componentes React
```typescript
describe('Button', () => {
  it('deve renderizar com texto', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })
  
  it('deve chamar onClick quando clicado', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()
    
    render(<Button onClick={handleClick}>Click</Button>)
    await user.click(screen.getByRole('button'))
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

### Hooks
```typescript
describe('useToast', () => {
  it('deve adicionar um toast', () => {
    const { result } = renderHook(() => useToast())
    
    act(() => {
      result.current.toast({ title: 'Test' })
    })
    
    expect(result.current.toasts).toHaveLength(1)
  })
})
```

## 🎯 Objetivo dos Testes

Os testes implementados focam em:

1. **Funcionalidade** - Verificar que cada função/componente faz o que deve fazer
2. **Casos extremos** - Testar limites e valores inválidos
3. **Interação do usuário** - Simular ações reais do usuário
4. **Acessibilidade** - Usar queries semânticas (getByRole, getByLabelText)
5. **Isolamento** - Cada teste é independente e pode rodar isoladamente

## 📊 Estatísticas

- **26 arquivos de teste**
- **211 testes unitários**
- **Tempo médio de execução: ~18s**
- **Cobertura de código**: 
  - Validators: 100%
  - Masks: 100%
  - Utils: 100%
  - Hooks testados: 90%+
  - Componentes UI testados: 95%+

## 🔄 CI/CD

Os testes podem ser facilmente integrados em pipelines CI/CD:

```yaml
# Exemplo para GitHub Actions
- name: Run tests
  run: pnpm test

- name: Generate coverage
  run: pnpm test:coverage
```

## 📚 Recursos Adicionais

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

