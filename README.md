# Gerenciador de Tarefas ![CI-CD](https://github.com/dju4mota/C214_L1_Projeto/actions/workflows/main.yml/badge.svg)

Um site com sistema de login, cadastro e um CRUD para gerenciar e organizar tarefas

## Testes

Estamos utilizando a ferramente Jest para testar o backend. Atualmente temos testes unitários com mock do banco rodando de maneira automática pelo github actions. E os Relatórios estão sendo salvo em um artefato, para acessar:

1. Acesse a parte de Actions
2. Acesse o último workflow
3. Baixe o Test Results na parte de Artifacts (na parte inferior da página)
4. Extraia os arquivos
5. Acesse o jest_html_reporters.html

## Fronted

### 🚀 Introdução

Este é o frontend para a aplicação de lista de tarefas (ToDoList). Ele fornece uma interface de usuário para interagir com o backend e gerenciar tarefas, usuários e outras funcionalidades relacionadas a uma lista de tarefas.

### ⚙️ Instalação

1.Certifique-se de ter o Node.js e o npm instalados em seu sistema.
2.Clone este repositório em sua máquina local:

git clone https://github.com/seu-usuario/ToDoList-Frontend.git

### Navegue até o diretório do projeto:

cd ToDoList-Frontend

### Instale as dependências:

npm install
npm install axios
npm install --force @material-ui/core
npm install @material-ui/icons

### 🖥️ Uso

#### Inicie o servidor de desenvolvimento:

npm start
Abra seu navegador e visite http://localhost:3000 para visualizar a aplicação.

#### 🔧 Funcionalidades

#### 🛠️ Tecnologias Utilizadas

React.js: Biblioteca JavaScript para a construção de interfaces de usuário.
Axios: Cliente HTTP baseado em Promise para fazer requisições AJAX.
HTML/CSS: Linguagens de marcação e estilo para estrutura e design da aplicação.
JavaScript: Linguagem de programação principal para a lógica do frontend.

## Backend

 Node

## Banco de Dados

Mongo
