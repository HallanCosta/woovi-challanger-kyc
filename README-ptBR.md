# 🏦 Bank KYC - Woovi Challenge

Sistema de verificação de identidade (KYC - Know Your Customer) desenvolvido como desafio Woovi, utilizando reconhecimento facial e validação de campos.

[🇺🇸 Leia esse README em Inglês](https://github.com/HallanCosta/woovi-challanger-kyc/blob/main/README.md)

## Live demo
- **Produção:** https://kyc.hallancosta.com
- **Storybook:** https://kyc-storybook.hallancosta.com

## 📸 Pré visualização
<img src="https://github.com/user-attachments/assets/05e83a2b-6d01-4276-ab3e-c687c41f1017">

## 🛠️ Tecnologias Utilizadas

### Frontend & Build
- **React 19** - Framework para construção de interfaces componentizadas
- **Vite** - Build tool moderna e extremamente rápida para desenvolvimento
- **TypeScript 5.9** - Superset JavaScript com tipagem estática

### Estilização
- **Tailwind CSS v4** - Framework CSS utilitário para estilização rápida
- **Shadcn UI / Radix UI** - Componentes acessíveis e customizáveis (Avatar, Select, Toast)
- **Framer Motion** - Biblioteca para animações fluidas e profissionais
- **Lucide React** - Conjunto de ícones consistentes e leves
- **Storybook** - ferramenta para documentar e testar componentes de interface de usuário (UI) de forma isolada

### Formulários & Validação
- **React Hook Form** - Gerenciamento performático de formulários
- **Zod v4** - Schema validation para validação de dados (CPF, RG, etc)
- **@hookform/resolvers** - Integração entre React Hook Form e Zod
- 

### Inteligência Artificial
- **@vladmandic/human v3.3.6** - Biblioteca de ML (Machine Learning) para:
  - Detecção facial em tempo real
  - Reconhecimento de características faciais
  - Validação de pessoa real (liveness detection)
  - Estimativa de idade e emoções

### Testes
- **Vitest** - Framework de testes rápido e moderno
- **Testing Library** - Testes de componentes React
- **@vitest/coverage-v8** - Cobertura de código

### Outros
- **PWA** - Progressive Web App com vite-plugin-pwa
- **PM2** - Gerenciamento de processos em produção


## ⏱️ Tempo estimado
- Tempo contabilizado de desenvolvimento  foram em torno de 40 horas


## 🚀 Como Rodar o Projeto

### Pré-requisitos
- **Node.js** (version 22 recommended, minimum 18)
  ```sh
  https://nodejs.org/en/download/
  ```

- **PNPM** (package manager)
  ```sh
  npm install pnpm -g
  ```

### Instalação

```bash
# Clone o repositório
git clone https://github.com/HallanCosta/woovi-challanger-kyc.git

# Entre na pasta do projeto
cd woovi-challanger-kyc

# Instale as dependências
pnpm install
```

### Desenvolvimento

```bash
# Inicia o servidor de desenvolvimento
pnpm dev

# Inicia o storybook
pnpm storybook

# Acesse no navegador (aplicação)
http://localhost:5173

# Acesse no navegador (storybook)
http://localhost:6006
```

### Build & Produção

```bash
# Gera build de produção
pnpm build

# Start da aplicação em produção com PM2
pnpm start:production

# Restart da aplicação em produção com PM2
pnpm restart:production
```

### Build & Produção (Storybook)

```bash
# Gera build de produção
pnpm build:storybook
```

### Testes

```bash
# Roda os testes
pnpm test

# Testes com interface visual
pnpm test:ui

# Cobertura de testes
pnpm test:coverage

# Lint do código
pnpm lint
```

## 😅 Desafios Encontrados

Durante o desenvolvimento, alguns desafios principais foram:

1. **Integração do vladmandic/human**
   - Configuração dos modelos de rosto
   - Detectar iluminação para não aceitar foto escura
   - Determinar confiabilidade de um rosto para não colocar qualquer coisa
   - Otimização de performance

**Referência:** https://medium.com/@viktorolivares/facial-analysis-with-human-js-and-react-in-a-vite-project-d61a21c3bc9e

## 🎯 Sobre o @vladmandic/human

A biblioteca **vladmandic/human** é o coração da validação biométrica do projeto. Ela permite:

- ✅ **Detecção facial em tempo real** - Identifica rostos na câmera
- ✅ **Análise de características** - Reconhece olhos, nariz, boca, contornos
- ✅ **Validação de pessoa real** - Liveness detection básico
- ✅ **Processamento local** - Tudo roda no navegador (privacidade)
- ✅ **Performance otimizada** - Modelos leves e rápidos

**Por achei interessante?**
- Não requer backend complexo para IA
- Dados sensíveis não saem do dispositivo do usuário
- Muito bom para validação de selfies em fluxos KYC

## 🚀 Implementações Futuras

### Segurança & Anti-fraude
- [ ] **Verificação biométrica facial avançada**
  - Face Match: Comparar selfie com foto do documento
  - Prova de vida: Detectar movimentos (piscar, virar cabeça)
  - Depth sensor: Garantir que não é foto de foto

- [ ] **Detecção de documentos falsificados**
  - OCR para extrair dados automaticamente
  - Sistema anti-fraude para detectar edições
  - Validação de padrões de segurança dos documentos

### Automação
- [ ] **Verificação de endereço automática**
  - Integração com API de CEP
  - Validação por geolocalização
  - Confirmação de residência

### Experiência do Usuário
- [ ] **Feedback em tempo real**
  - "Imagem cortada" - documento não está completo
  - "Documento ilegível" - foto muito escura/desfocada
  - "Aproxime mais" - documento muito distante
  - "Evite reflexos" - flash atrapalhando leitura
  - Salvamento automático rascunho


- [ ] **Guias visuais**
  - Contorno mostrando onde posicionar documento
  - Indicadores de qualidade da foto em tempo real
  - Tutorial interativo antes do processo

### Infraestrutura
- [ ] Backend robusto com fila de processamento
- [ ] Sistema de logs e monitoramento

## 🧩 Funcionalidades 
- [x] Tradução para outras línguas
- [x] Captura de selfie usando câmera de dispositivo (Sensor de iluminação e Rosto detectado)
- [x] Dark Mode
- [x] Validações de campos realtime
- [x] PWA no Android e iOS (Progressive Web App)
- [x] Arrasta e solta para upload de arquivos / foto

## 📂 Estrutura do Projeto

```
woovi-challanger-kyc/
├── .storybook/          # Componentes storybook
├── src/
    ├── __tests__        # Testes da aplicação
│   ├── components/      # Componentes React
│   ├── hooks/           # Custom hooks
│   ├── lib/             # Utilitários e configurações
│   ├── pages/           # Páginas da aplicação
│   └── main.tsx         # Entry point
├── public/              # Arquivos estáticos
├── ecosystem.config.cjs # Configuração PM2
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 👨‍💻 Contribuidores

[<img width="115" height="115" src="https://github.com/HallanCosta.png"  /><br><sub>@HallanCosta</sub>](https://github.com/HallanCosta)

⭐ Se este projeto foi útil para você, considere dar uma estrela no repositório!
