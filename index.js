const express = require('express');
const app = express();
const port = 3000;

const path = require('path');
const session = require('express-session');
const crypto = require('crypto');

// Gerar chave secreta
const secretKey = crypto.randomBytes(32).toString('hex');
console.log('🔑 Chave secreta:', secretKey);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuração de sessão CORRIGIDA
app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false, // false é mais seguro
    cookie: { 
        maxAge: 15 * 60 * 1000 // 15 minutos
    }
}));

const basePath = path.join(__dirname, 'templates');

// VERIFICAÇÃO: Mostra o caminho que está sendo usado
console.log('📁 Caminho dos templates:', basePath);

// Dados de usuários
const users = [
    { id: 1, username: 'admin', password: '123', name: 'Administrador' },
    { id: 2, username: 'usuario', password: '456', name: 'Usuário Teste' }
];

// Middleware de autenticação SIMPLIFICADO
const checkAuth = (req, res, next) => {
    console.log(`🔍 Verificando rota: ${req.path}`);
    
    // Rotas públicas
    const publicRoutes = ['/login', '/login/submit', '/logout'];
    
    if (publicRoutes.includes(req.path)) {
        console.log('✅ Rota pública, acesso permitido');
        return next();
    }
    
    // Verifica autenticação
    if (req.session && req.session.isAuthenticated) {
        console.log(`✅ Usuário autenticado: ${req.session.username}`);
        return next();
    }
    
    console.log('❌ Usuário não autenticado, redirecionando para login');
    res.redirect('/login');
};

// Aplica middleware em TODAS as rotas
app.use(checkAuth);

// Rota de login
app.get('/login', (req, res) => {
    console.log('📄 Servindo login.html');
    
    // Se já logado, redireciona
    if (req.session.isAuthenticated) {
        console.log('🔄 Já autenticado, redirecionando para /');
        return res.redirect('/');
    }
    
    // Tenta enviar o arquivo
    res.sendFile(`${basePath}/login.html`, (err) => {
        if (err) {
            console.error('❌ ERRO ao enviar login.html:', err.message);
            res.status(404).send('Arquivo login.html não encontrado');
        }
    });
});

// Processar login
app.post('/login/submit', (req, res) => {
    console.log('🔐 Tentativa de login:', req.body);
    
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        req.session.isAuthenticated = true;
        req.session.username = user.username;
        req.session.userId = user.id;
        req.session.userName = user.name;
        
        console.log(`✅ Login bem-sucedido: ${user.name}`);
        res.redirect('/');
    } else {
        console.log('❌ Login falhou');
        res.redirect('/login');
    }
});

// Logout
app.get('/logout', (req, res) => {
    console.log('👋 Logout solicitado');
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

// Dashboard
app.get('/', (req, res) => {
    console.log('🏠 Acessando dashboard');
    res.sendFile(`${basePath}/dashboard.html`, (err) => {
        if (err) {
            console.error('❌ ERRO dashboard.html:', err.message);
            res.status(404).send('Dashboard não encontrado');
        }
    });
});

// Adicionar usuário
app.get('/users/add', (req, res) => {
    console.log('📝 Acessando formulário de usuário');
    res.sendFile(`${basePath}/users.html`, (err) => {
        if (err) {
            console.error('❌ ERRO users.html:', err.message);
            res.status(404).send('Formulário não encontrado');
        }
    });
});

app.post('/users/save', (req, res) => {
    console.log('💾 Salvando usuário:', req.body);
    const { name, age } = req.body;
    
    console.log(`👤 Nome: ${name}, Idade: ${age}`);
    
    if (age >= 18) {
        console.log('✅ Maior de idade');
    } else {
        console.log(`⚠️ Menor de idade: ${age} anos`);
    }
    
    res.redirect('/users/add');
});

// Detalhes do usuário
app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    console.log(`🔍 Buscando usuário ID: ${id}`);
    res.sendFile(`${basePath}/user-details.html`, (err) => {
        if (err) {
            console.error('❌ ERRO user-details.html:', err.message);
            res.status(404).send('Página de detalhes não encontrada');
        }
    });
});

// Rota para teste de arquivos
app.get('/test-file', (req, res) => {
    const filePath = `${basePath}/login.html`;
    console.log('🧪 Testando caminho do arquivo:', filePath);
    
    const fs = require('fs');
    if (fs.existsSync(filePath)) {
        console.log('✅ Arquivo existe!');
        res.send('Arquivo existe no caminho: ' + filePath);
    } else {
        console.log('❌ Arquivo NÃO existe!');
        res.send('Arquivo NÃO existe no caminho: ' + filePath);
    }
});

app.listen(port, () => {
    console.log(`🚀 Servidor rodando na porta ${port}`);
    console.log(`🌐 Acesse: http://localhost:${port}`);
    console.log(`🔗 Teste de arquivo: http://localhost:${port}/test-file`);
    console.log(`🔗 Login: http://localhost:${port}/login`);
});