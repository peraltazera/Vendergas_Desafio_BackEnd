# Projeto Node

## Sumário
1. [Introdução](#introdução)
2. [Pré-requisitos](#pré-requisitos)
3. [Instalação](#instalação)
4. [Clonar o Repositório](#ClonaroRepositório)
5. [Instalar Dependências](#InstalarDependências)
6. [Configuração](#Configuração)
7. [Rodando o Projeto](#rodando-o-projeto)
8. [Estrutura do Projeto](#estrutura-do-projeto)

## Introdução

Este é um projeto Node criado com Node.js 18. O objetivo deste documento é fornecer as instruções necessárias para clonar, instalar e executar o projeto localmente. Está e a parte BackEnd de um projeto fullstack onde o FrontEnd se encontra neste outro repositório [aqui!](https://github.com/peraltazera/Vendergas_Desafio_FrontEnd)

## Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)

## Instalação

Siga os passos abaixo para configurar o ambiente localmente:

## Clonar o Repositório

Clone o repositório do GitHub para o seu ambiente local usando o comando abaixo:

```bash
git clone rul_do_repositório
cd nome-do-repositório
```

## Instalar Dependências

Depois de clonar o repositório, instale as dependências do projeto utilizando o npm:

```bash
npm install
```

## Configuração

Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis de ambiente:

```bash
URL_DB=SEU_LINK_DE_CONEXAO_COM_MONGODB
PORT=NUMERO_DA_PORTA
```

Exemplo de configuração:

```bash
URL_DB=mongodb://localhost:27017/nome_do_banco
PORT=3000
```

## Rodando o Projeto

Para rodar o projeto localmente, utilize o comando abaixo:

```bash
npm start
```

O servidor estará rodando no endereço http://localhost:NUMERO_DA_PORTA.

## Estrutura do Projeto

Uma breve descrição da estrutura dos arquivos e diretórios principais do projeto:

- src/: Contém o código fonte da aplicação.
  - controllers/: Lógica dos controladores.
  - models/: Definição dos modelos de dados.
  - routes/: Definição das rotas da API.
  - database/: Serviços que fazem a comunicação com o banco de dados.
  - server.js/: Configuração e inicialização do servidor.
