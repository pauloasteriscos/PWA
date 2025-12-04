
# Postman documentation
https://documenter.getpostman.com/view/3754041/SW7exkHe?version=latest

# MiniProj2-Back  
Tarefa 3.2 — Programação Web Avançada (PWA)  
Universidade Aberta — Mestrado em Engenharia Informática e Tecnologias Web

## Descrição
Este repositório contém o desenvolvimento do **back-end** do projeto *Animalec*, conforme solicitado na **Tarefa 3.2** do Miniprojeto.  
O objetivo foi replicar o projeto fornecido no livro recomendado e **adicionar duas novas entidades**:

- **Sponsors (Patrocinadores)**
- **Experts (Especialistas)**

Foram criadas todas as funcionalidades necessárias (CRUD): listagem, visualização, criação, edição e remoção de cada entidade.

## BACKEND
backend/config/config.js (ALTERADO) **mongodb://localhost:27017/test**
backend/init/router.js (ALTERADO)
<b>
backend/controllers/expert.controller.js (NOVO)
backend/controllers/sponsor.controller.js (NOVO)
backend/messages/expert.messages.js (NOVO)
backend/messages/sponsor.messages.js (NOVO)
backend/models/expert.model.js (NOVO)
backend/models/sponsor.model.js (NOVO)
backend/routes/expert.routes.js (NOVO)
backend/routes/sponsor.routes.js (NOVO)

## E X E C U Ç Ã O:  
c:\DEV\animalec\backend>node app.js  
c:\DEV\animalec\frontend>npm run serve  

## T E S T E S: 
http://localhost:8081/  


## CASO PRECISE MONTAR O AMBIENTE:
preparação da Base de dados:
- Instalar mongodb (https://www.mongodb.com/try/download/community)
- Instalar o studio 3t (https://studio3t.com/) 
- Abrir studio 3t
- Adicionar ligação à base de dados de testes (mongodb+srv://fcabook:fT73qsfEjZ7C@fcabook-jly7a.mongodb.net/test?retryWrites=true&w=majority)
- Adicionar ligação à base de dados local (server: localhost, port:27017)
- Criar nova base de dados "test"
- Clicar com o botão direito sobre a base de dados original e usar opção "Copy all collections/views/buckets"
- Clicar com o botão direito sobre a nossa base de dados "test" e usar opção "Paste collections/views/buckets"

No 3T, mudar fabio1729 para Admin.

npm install express-validator@6.14.3 --save

## NVM:
https://github.com/coreybutler/nvm-windows/releases
Após instalado o NVM:
nvm install 16.20.0
nvm use 16.20.0
node -v
cd c:\DEV\animalec\frontend
npm install
