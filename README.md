# Flask-API-React

Flask API + React

## Back-end

Execute os seguintes comandos para preparar a base de dados pelo Docker. O build da imagem também executa o script em <b>init.sql</b>.

1. `docker build -t mysql8 .`
2. `docker-compose up -d`

Caso precise consultar o banco segue as credenciais:

- Endereço: localhost
- Porta: 3306
- Usuário: root
- Senha: qwerty
- Database: apidb

Para iniciar o servidor:

1. Crie e ative um ambiente virtual
2. `pip install -r requirements.txt`
3. `flask run`

## Front-end

Com o servidor já iniciado execute o seguinte:

1. `yarn` ou `npm install` para instalar as dependências.
2. `yarn dev` ou `npm run dev` para iniciar.
