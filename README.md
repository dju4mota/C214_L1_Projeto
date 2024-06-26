# Gerenciador de Tarefas ![CI-CD](https://github.com/dju4mota/C214_L1_Projeto/actions/workflows/main.yml/badge.svg)

Um site com sistema de login, cadastro e um CRUD para gerenciar e organizar tarefas

## Testes

Estamos utilizando a ferramente Jest para testar o backend. Atualmente temos testes unitários com mock do banco rodando de maneira automática pelo github actions. E os Relatórios estão sendo salvo em um artefato, para acessar:

1. Acesse a parte de Actions
2. Acesse o último workflow
3. Baixe o Test Results na parte de Artifacts (na parte inferior da página)
4. Extraia os arquivos
5. Acesse o jest_html_reporters.html

Para rodar os testes locais, é preciso:

1. Clonar o projeto
2. Instalar Node
3. Instalar as dependências (dentro da pasta backend -> npm i)
4. Rodar os testes (dentro da pasta backend -> npm run test)

## Fronted

### 🚀 Introdução

Este é o frontend para a aplicação de lista de tarefas (ToDoList). Ele fornece uma interface de usuário para interagir com o backend e gerenciar tarefas, usuários e outras funcionalidades relacionadas a uma lista de tarefas.

### ⚙️ Instalação

1.Certifique-se de ter o Node.js e o npm instalados em seu sistema.
2.Clone este repositório em sua máquina local:

git clone https://github.com/seu-usuario/ToDoList-Frontend.git

### Navegue até o diretório do projeto

cd ToDoList-Frontend

### Instale as dependências

npm install
npm install axios
npm install --force @material-ui/core
npm install @material-ui/icons

### 🖥️ Uso

#### Inicie o servidor de desenvolvimento

npm start
Abra seu navegador e visite http://localhost:3000 para visualizar a aplicação.

#### 🔧 Funcionalidades

#### 🛠️ Tecnologias Utilizadas

React.js: Biblioteca JavaScript para a construção de interfaces de usuário.
Axios: Cliente HTTP baseado em Promise para fazer requisições AJAX.
HTML/CSS: Linguagens de marcação e estilo para estrutura e design da aplicação.
JavaScript: Linguagem de programação principal para a lógica do frontend.

## Backend

O backend deste projeto é construído usando Node.js, uma plataforma de tempo de execução JavaScript que permite executar JavaScript no servidor. Ele se conecta a um banco de dados MongoDB para armazenar e recuperar dados.

Etapas para rodar o backend:

1. Instale o Node.js: Você pode baixar o Node.js do site oficial (https://nodejs.org/). Recomenda-se que você instale a versão LTS.
2. Clone o repositório do projeto: Você pode fazer isso usando o comando: git clone https://github.com/dju4mota/C214_L1_Projeto.
3. Navegue até a pasta do backend: Use o comando cd backend
4. Instale as dependências: Execute o comando npm install para instalar todas as dependências necessárias listadas no arquivo package.json.
5. Configure o banco de dados MongoDB: Você precisará de uma string de conexão MongoDB. Se você estiver usando o MongoDB Atlas, pode obter essa string de conexão no painel do Atlas. Coloque essa string de conexão em um arquivo .env na raiz do seu projeto backend.
6. Inicie o servidor: Execute o comando npm start para iniciar o servidor. Se tudo estiver configurado corretamente, você deve ver uma mensagem indicando que o servidor está rodando e conectado ao MongoDB.
