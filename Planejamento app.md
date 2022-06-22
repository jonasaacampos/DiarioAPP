

## Etapas gerais do planejamento Planejamento

- delimitar o problema que o app resolve
- verificar viabilidade do projeto
- definir versão mínima (MVP)
- definir forma de entrega (plataformas de uso)
- definir tecnologias
- desenhar telas caso necessário
- projetar estrutura de dados
- documentar endpoints caso existam
- definir etapas de execução do projeto

## 1. Criação dos Mockups

Desenhar tela ajuda a compreender a complexidade do projeto. É recomendado sempre começar pelo desenho das telas antes de avançar com o planejamento do projeto.

Para o desenho das telas foi utilizado o [PENCIL PROJECT - An open-source GUI prototyping tool that's available for ALL platforms.](https://pencil.evolus.vn)

## 2. Planejar estrutura de dados

O que é possível prever sobre o banco de dados de nosso projeto?

Colletions

- Notes
	- Title
	- body
	- created_at
	- updated_at
- Users
	- name
	- email
	- password
	- created_at
	- updated_at

Relações
Usuário > muitas notas

## 3. Definição de endpoints

Usar o postman, pois o planejamento serve para documentar o projeto posteriormente

## iniciando projeto

```
nvm install node
nvm use node
npm i express-generator
sudo npm install -g express-generator

express --view=no-view

```

corrigir erros de dependencia
replace prefix -g by prefix --location=global

```
go to C:\Program Files\nodejs
you have to edit 4 files named npm, npm.cmd, npx, npx.cmd
open files in vs code
replace prefix -g with prefix --location=global in all four files
save all (if asked save as admin)
good to go!
```

## Limpeza do código

- Remover diretório view
- alterar resposta do routes > index
res.json({message: 'Hello World!'});

após testato o arquivo routes/index.js pode ser deletado

npm install //para instalar dependências do projeto
npm start // para iniciciar o projeto

- remover routes > index

remover linhas do app.js
//var cookieParser = require('cookie-parser');
//var indexRouter = require('./routes/index');
//app.use(cookieParser());
//app.use('/', indexRouter);

- criar diretorio app e mover routes para dentro dele
- alterar a rota dentro do arquivo app.js na raiz do programa
'./routes/users'); > './app/routes/users');

## Preparando base da API

npm i nodemon --save

criar diretorio e arquivo de configuração do mongo
config/database.js

npm i mongoose --save

realizar configuração do banco de dados dentro do database.js

inserir a configuração do banco de dados no app
require('./config/database');

## Autendicação e transformando senha em hash

npm i bcrypt --save

**registrando usuário**

**login**

npm i jsonwebtoken --save

npm i dotenv --save