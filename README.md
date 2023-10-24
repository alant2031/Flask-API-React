# Flask-API-React

Flask API + React

## Back-end

Execute os seguintes comandos para preparar a base de dados pelo Docker. O build da imagem também executa o script em <b>init.sql</b>.

1. `docker build -t mysql8 .`
2. `docker-compose up -d`

Para iniciar o servidor:

- `flask run`

## Front-end

Com o servidor já iniciado execute o seguinte:

1. `yarn` ou `npm install` para instalar as dependências.
2. `yarn dev` ou `npm run dev` para iniciar.
