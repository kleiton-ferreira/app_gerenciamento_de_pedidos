# app_gerenciamento_de_pedidos

# 📊 Sistema de Gestão de Pedidos (Order Management System)

Um sistema completo para gerenciamento de pedidos, clientes, vendedores e categorias com autenticação JWT e interface responsiva.

## ✨ Funcionalidades

### Backend (Node.js/Express)
- **Autenticação JWT** com registro e login
- **CRUD completo** para:
  - Categorias de produtos
  - Clientes
  - Vendedores
  - Pedidos (com relacionamentos entre entidades)
- Validação de dados e tratamento de erros
- Middleware de autenticação para rotas protegidas

### Frontend (React/Vite)
- Dashboard com resumo das informações
- Listagens paginadas e pesquisáveis
- Formulários de cadastro/edição com validação
- Interface responsiva para todos os dispositivos
- Navegação protegida por autenticação

## 🛠️ Tecnologias Utilizadas

**Backend:**
- Node.js
- Express
- MongoDB (Mongoose)
- JWT
- Bcrypt
- Dotenv

**Frontend:**
- React
- Vite
- React Router
- React Icons (Font Awesome)
- Axios
- CSS Modules

## 🚀 Como Executar

### Pré-requisitos
- Node.js (v16+)
- MongoDB (local ou Atlas)
- NPM

### Instalação das dependências no backend
npm install express mongoose cors dotenv jsonwebtoken bcryptjs morgan

### Instalação das dependências no frontend
npm install react react-dom react-router-dom axios react-icons vite

### Iniciando o backend no terminal
node server.js

### Iniciando o frontend no terminal
npm run dev


