# login-app
API Rest para login

## Configurando Node

* O entry point vai ser app.js
* Instalar o express e o dotenv - para configurar as variaveis de ambiente
* em package.json em "scripts" apagar test e colocar "start": "node app.js" -> com isso é possivel usar o comando npm start no terminal
* criar pastas de modelo, rotas e controles
* como esse projeto é uma API Rest não vai ter uma pasta view que renderizaria algum template, o front end pode ser feito separadamente e as requisições para o servidor serão feitas a partir do Javascript com o fetch
* o insomnia vai ser usado para fazer os testes com a aplicação

## Rotas 

Um servidor de login precisa minimamente conseguir registrar um usuário e fazer o login, primeiro passo é preparar as rotas

* como estamos tratando de dados sensíveis o front end sempre vai mandar os dados através de uma requisição POST
* vamos exportar o router para importar em app.js usando o método use que serve para todo tipo de requisição

## Controladores

Agora criar o controlador com as middleware functions, exportá-las, importar em router - para deixar a aplicação mais organizada

## Banco de Dados - MongoDB (Mongoose)

Vamos instalar o mongoose e conectar o banco de dados
* eu usei O mongo localmente - na variavel de ambiente está a url usada ("mongodb://127.0.0.1/user") o normal seria usar "mongodb://localhost/user" mas o mongo não estava conectando então fiz esse ajuste

* Existem algumas formas de saber se o mongoose conectou eu implementei dentro do método connect passando algumas options antes