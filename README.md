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

## Login com o usuário

A primeira coisa para fazer o login é verificar se o email existe no banco de dados, para depois ver se a senha bate ou não

* se não existir o email no nosso banco a gente manda uma mensagem dizendo que Email ou senha não existe caso alguém esteja tentando hackear ele não vai saber se errou a senha ou o email

* depois vamos verificar se a senha bate com a hash criada no momento do registro, utilizar o método compareSync(password, hashCreated) passando a senha como primeiro argumento e depois a hash que foi armazenada no banco

* obs: aumentei o maxlength the password por causa do hash que possui muitos caracteres

* fazer o teste com o insomnia

## Criando o Token

Como estamos utlizando o modelo de API rest não armazenamos nenhum dado do usuário no nosse back end, todo vez que ele precisa acessar algo do back end ele precisa mandar algo que identifique ele, é inviável mandar usuário e senha o tempo todo, para isso vamos criar um token que vai identificar o usuário

* vamos usar o módulo jsonwebtoken
    - npm install jsonwebtoken

* em controller importar o jsonwebtoken
* o jwt precisa de um segredo que vai ser criado em .env
* o método sing() recebe algo que identifica o usuário e o segredo
* depois vamos mandar o token atraves cabeçalho da resposta, res.header() recebe como primeiro argumento uma chave o segundo o valor(token)
* no insomnia em header é possivel ver a chave definida e o valor dela

## Protegendo Rotas

Agora vamos mandar o token do front end (nesse caso pelo insomnia) para o nosso back end, aqui a intenção é saber como proteger uma rota e como validar o token

* foi criada uma rota em app.js que apenas usuários logados e que são admin podem ter acesso

* em controllers o arquivo authController vai verificar o token

* em routes o arquivo adminRouter vai ter a rota de quem é admin, primeiro passo é importar o admin controller -> (auth), vamos colocar o auth na rota router.get("/", auth) que primeiro vai verificar se o token, e depois se é de admin se em qualquer uma das verificações falhar não será permitido acesso

* com o insomnia quando registrar um usuário pelo rota POST localhost:3000/user/register o token é gerado e passado pelo header, em HEADERS no insomnia aparece authorization-token e o valor do token, a gente pega o token vai na rota GET localhost:3000/admin -> em Header no insomnia passamos a chave(authorization-token) e o valor para verificar

* agora em authController em try vamos usar o método jwt.verify(token, secret) para verificar se o usuário possui o token de admin

* no esquema vamos adicionar a chave admin como tipo boolean e valor default como false, em userController quando o for criar o token  passar admin também jwt.sign({..., admin: selectedUser.admin }, secret)

* em adminRouter foi criada uma rota livre para quem está logado

## Validando a entrada


O Esquema do mongoose diz que o tamanho mínimo para criar a senha é 6 caracteres, porém com a criptografia a senha fica com um tamanho muito maior independente de quantos caracteres o usuário digitar na hora de se registrar, e gente quer validar o dado que o usuário está enviando e não a criptografia que vai ser armazenado no banco de dados, vamos ajustar isso com o módulo joi

link para a documentação do módulo Joi -> https://hapi.dev/tutorials/validation/

* npm install @hapi/joi
* em controllers criar o arquivo validate.js ->  nesse arquivo vamor ter duas funções uma pra validar o registro e outra pra validar o login. É muito parecido com o mongoose, vai ter um esquema e depois retornamos o esquema.validate(data) /data é um objeto/-> Ver a sintaxe no arquivo

* importar as funções de validação em userController e usar nos métodos register e login


#### Módulos usados

* express
* dotenv
* mongoose
* bcryptjs
* jsonwebtoken
* joi