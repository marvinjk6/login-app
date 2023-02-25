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

## Criando o usuário

Vamos preparar o esquema para poder armazenar o usuário, as informações para o cadastro de um usuário vão variar de sistema para sistema, nessa aplicação vamos utilizar nome - email - senha - data de criação

* vamos precisar do mongoose
* Criar o esquema
* exportar o modelo
* importar o modelo no controlador, para quando registrar um usuário salvar esse usuário no modelo
    - o nome, email e senha serão passados pelo corpo da requisição
    - no bloco try vamos usar o método save para salvar o usuário e enviar o usuário como resposta (essa é uma operação assíncrona precisamos do await antes de salvar, e do async antes da função)
    - no bloco catch se acontecer algum erro como o usuário não colocar um email que é obrigatório, é preciso sinalizar para o front end que aconteceu o erro, vamos mandar o res.status(404).send(error)
    - vamos usar express.json() para ter acesso ao body da requisição, ele pode ser passado na rota, mas como queremos sempre ter acesso ao body podemos passar em app.js - app.use express.json() isso quer dizer que vai pegar tudo que vier na requisição json e vai colocar dentro do body

## Criptografando a senha

Anteriormente usando o insomnia pelo método POST json foi possível salvar um usuário no banco de dados, porém existe um problema, a senha estava visível no banco, isso não pode acontecer nunca, é preciso criptografar a senha

* vamos usar o módulo bcrypt que serve para criptografar coisas
    - npm install bcryptjs

* no controlador vamos importar o bcrypt
    - lá em password vamos utilizar o método hashSync() 
    que recebe como primeiro argumento a string que será criptografada, no nosso caso a senha mesmo que vem pelo body, o segundo argumento é o salt que é um número utilizado no algoritmo de criptografia, como padrão é 10 o que permite omitir o segundo argumento. Esse método cria um hash a partir da senha criada na hora de registrar o usuário, que depois vai ser comparado com a senha na hora de login

    - foi feito uma validação que não permite colocar um email ja existente no banco de dados

