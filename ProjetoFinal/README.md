# Projeto Final – Programação Web Avançada (PWA)

Este repositório contém o projeto final desenvolvido no âmbito da unidade curricular **Programação Web Avançada (PWA)**.

O objetivo da aplicação consiste na conceção e implementação de uma aplicação Web para a **recolha e gestão de propostas de temas de projeto final de curso submetidas por docentes**.

A solução foi desenvolvida segundo uma abordagem **full‑stack**, com separação clara entre **front‑end**, **back‑end** e **persistência de dados**, seguindo boas práticas de arquitetura, segurança e usabilidade abordadas ao longo da unidade curricular.

## Funcionalidades

* Consulta pública da lista de docentes registados
* Autenticação de docentes
* Gestão de propostas de projeto:

  * Criação, edição e remoção de propostas
  * Associação de alunos e coorientadores
  * Definição do estado da proposta
* Validação básica de dados e normalização de inputs
* Interface responsiva e centrada na experiência do utilizador

## Arquitetura da Solução

A aplicação segue uma arquitetura **cliente–servidor**, organizada em três camadas principais.

### Front-end

* Framework: Vue.js
* Ferramenta de build: Vite
* Comunicação com o back-end: Axios (APIs REST)
* Gestão de rotas: Vue Router

### Back-end

* Plataforma: Node.js
* Framework: Express
* Autenticação: JSON Web Tokens (JWT)
* Persistência de dados: MongoDB (via Mongoose)

### Base de Dados

* Sistema: MongoDB
* Modelos principais:

  * Docente
  * Aluno
  * Proposta

## Pré-requisitos

Antes de executar o projeto, é necessário ter instalado:

* Node.js (versão 16.x)
* MongoDB (em execução local)
* npm

## Execução do Projeto

### Back-end
cd backend
npm install
npm run dev

O servidor ficará disponível em:
http://localhost:3000

#### Seed da base de dados (opcional)

Para criar dados de teste (docentes, alunos e uma proposta inicial):
npm run seed

Credenciais de teste:
* Email: docentes previamente criados pelo seed
* Password: 123456

### Front-end
cd frontend
npm install
npm run dev

A aplicação ficará disponível em:
http://localhost:5173

## Autenticação e Segurança

* Apenas docentes autenticados podem gerir propostas
* As rotas protegidas são controladas através de *route guards*
* O estado de autenticação é refletido dinamicamente na interface (topbar)

## Pré-classificação das Propostas

Como extensão funcional ao protótipo base, a aplicação implementa um mecanismo simples de **pré‑classificação das propostas**, com o objetivo de apoiar o processo de análise e triagem.

Cada proposta possui um indicador de completude ("score"), calculado automaticamente no back-end com base em critérios objetivos, tais como:

* Existência de título
* Descrição e objetivos preenchidos
* Definição de palavras‑chave
* Associação de alunos e coorientadores

Este indicador não substitui a avaliação académica formal, funcionando apenas como um mecanismo auxiliar de priorização, permitindo identificar rapidamente propostas mais completas.


## Usabilidade e Experiência do Utilizador

A aplicação foi desenvolvida com especial atenção à experiência do utilizador, incluindo:

* Feedback visual em ações críticas (login, guardar, apagar)
* Tratamento adequado de estados vazios
* Navegação clara e previsível
* Interface simples, consistente e coerente

Estas decisões estão alinhadas com os princípios descritos por Portela e Queirós (2020) relativamente ao desenvolvimento de aplicações Web modernas.

## Referências
Portela, F., & Queirós, R. (2020). *Desenvolvimento Avançado para a Web – Do front-end ao back-end*. FCA.


## Autor
Paulo Silva
Projeto desenvolvido no âmbito académico da unidade curricular **Programação Web Avançada** da Universidade Aberta (UAb).
