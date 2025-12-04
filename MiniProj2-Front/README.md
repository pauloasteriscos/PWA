# Animalec
An animals pedagogical app

# Using json-server 
To mock some dummy results
https://github.com/typicode/json-server


# MiniProj2-Front  
Tarefa 3.2 — Programação Web Avançada (PWA)  
Universidade Aberta — Mestrado em Engenharia Informática e Tecnologias Web

## Descrição
Este repositório contém o desenvolvimento do **front-end** do projeto *Animalec*, conforme solicitado na **Tarefa 3.2** do Miniprojeto.  
O objetivo foi replicar o projeto fornecido no livro recomendado e **adicionar duas novas entidades**:

- **Sponsors (Patrocinadores)**
- **Experts (Especialistas)**

Foram criadas todas as funcionalidades necessárias (CRUD): listagem, visualização, criação, edição e remoção de cada entidade.

## FRONTEND
frontend/src/api/config.js (ALTERADO)  **mongodb://localhost:27017/test**
frontend/src/router/index.js (ALTERADO)
frontend/src/store/index.js (ALTERADO)
frontend/src/views/Admin.vue (ALTERADO)
<b>
frontend/src/api/expert.service.js (NOVO)
frontend/src/api/sponsor.service.js (NOVO)
frontend/src/store/experts/expert.constants.js (NOVO)
frontend/src/store/experts/expert.module.js (NOVO)
frontend/src/store/sponsors/sponsor.constants.js (NOVO)
frontend/src/store/sponsors/sponsor.module.js (NOVO)
frontend/src/views/experts/AddExpert.vue (NOVO)
frontend/src/views/experts/EditExpert.vue (NOVO)
frontend/src/views/experts/ListExperts.vue (NOVO)
frontend/src/views/experts/ViewExpert.vue (NOVO)
frontend/src/views/sponsors/AddSponsor.vue (NOVO)
frontend/src/views/sponsors/EditSponsor.vue (NOVO)
frontend/src/views/sponsors/ListSponsors.vue (NOVO)
frontend/src/views/sponsors/ViewSponsor.vue (NOVO)

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