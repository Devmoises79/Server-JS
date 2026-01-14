## 📋 Sistema de Autenticação com Express.js
* Um sistema simples de autenticação e gerenciamento de usuários construído com Node.js e Express, usando sessões para controle de acesso.

# 🚀 Funcionalidades

- ✅ Sistema de login/logout com sessões

- ✅ Páginas protegidas (requer autenticação)

- ✅ Dashboard após login

- ✅ Formulário para adicionar usuários

- ✅ Páginas de detalhes de usuários

- ✅ Middleware de autenticação

- ✅ Geração automática de chaves seguras para sessões

- ✅ HTML puro (sem CSS ou JavaScript)

# 📁 Estrutura do Projeto

```text
Server JS/
├── index.js              # Arquivo principal do servidor
├── package.json          # Dependências e configurações
├── package-lock.json     # Dependências*
└── templates/           # Páginas HTML
    ├── login.html       # Página de login
    ├── dashboard.html   # Dashboard após login
    ├── users.html       # Formulário de adicionar usuário
    └── user-details.html # Página de detalhes do usuário
```

## 🛠️ Tecnologias Utilizadas

- Node.js - Ambiente de execução JavaScript

- Express.js - Framework web para Node.js

- express-session - Middleware para gerenciamento de sessões

- crypto (nativo) - Para geração de chaves seguras


# 🔧 Instalação e Configuração

1. Pré-requisitos
Node.js (versão 14 ou superior)

- npm (gerenciador de pacotes)

2. Clonar e Instalar
bash


# Clone o repositório ou copie os arquivos

```text 
cd "C:\Users\MOISÉS\Desktop\Server JS"
```

# Instale as dependências
npm install


3. Executar o Projeto

# Modo desenvolvimento (com nodemon)


``` text
npm start
```


# Ou execute diretamente

```text
node index.js
```

4. Acessar a Aplicação
Abra o navegador e acesse: 

```text
http://localhost:3000
```


# 👥 Credenciais de Acesso
O sistema vem com dois usuários pré-cadastrados para teste:

```text
Usuário	Senha	Nome
admin	123	Administrador
usuario	456	Usuário Teste
```


# 🧭 Fluxo de Navegação

- Acesso Inicial (/) → Redireciona para /login

- Página de Login → Insira credenciais válidas

- Dashboard (/) → Menu principal após login

- Adicionar Usuário (/users/add) → Formulário de cadastro

- Detalhes do Usuário (/users/:id) → Página de exemplo

- Logout (/logout) → Encerra sessão e redireciona para login


# 🔐 Funcionalidades de Segurança
- Middleware de Autenticação

- Sessões com tempo de expiração de 15 minutos

- Geração automática de chaves secretas seguras

- Redirecionamento automático para login quando não autenticado

- Gerenciamento de Sessões

```text
javascript
// Configuração da sessão
app.use(session({
    secret: crypto.randomBytes(32).toString('hex'), // Chave aleatória
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: 15 * 60 * 1000, // 15 minutos
        httpOnly: true          // Proteção contra XSS
    }
}));
```


# 📝 Rotas Disponíveis

- Rotas Públicas (não requerem autenticação)
- GET /login - Página de login

- POST /login/submit - Processa o formulário de login

- GET /logout - Encerra a sessão

- Rotas Protegidas (requerem autenticação)
- GET / - Dashboard principal

- GET /users/add - Formulário para adicionar usuário

- POST /users/save - Processa o formulário de usuário

- GET /users/:id - Página de detalhes do usuário


# 🧪 Testando o Sistema
1. Teste de Login
bash
# Credenciais válidas
Usuário: admin
Senha: 123

# Ou
Usuário: usuario  
Senha: 456

2. Teste de Funcionalidades

- Tente acessar / sem fazer login → Redireciona para /login

- Faça login com credenciais válidas → Acesso ao dashboard

- Clique em "Adicionar Usuário" → Formulário aparece

- Preencha o formulário → Dados são logados no console

- Clique em "Sair" → Sessão é encerrada