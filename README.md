# Gestão Escolar - Desafio DTI

## Sumário

- [Sobre o projeto](#sobre-o-projeto)

- [Gestão Escolar](#gestão-escolar)

- [Premissas](#premissas)

- [Decisões de projeto](#decisões-de-projeto)

- [Habilidades](#habilidades)

- [Tecnologias utilizadas](#tecnologias-utilizadas)

- [Front-end](#front-end)

- [Back-end](#back-end)

- [Banco de dados](#banco-de-dados)

- [DevOps](#devops)

- [Documentação da API](#documentação-da-api)

- [Visão geral](#visão-geral)

- [Corpo das requisições e respostas](#corpo-das-requisições-e-respostas)

- [Instalando e testando localmente](#instalando-e-testando-localmente)

- [Docker (Recomendado)](#docker-recomendado)

- [Manualmente](#manualmente)

- [Status de desenvolvimento](#status-de-desenvolvimento)

---

## Sobre o projeto


### Gestão Escolar
  
Este projeto é um sistema de gestão escolar desenvolvido para o desafio de estágio em desenvolvimento da dti digital. O objetivo é ajudar um professor (Carlos) a organizar as notas e a frequência de seus alunos de maneira automatizada.

O sistema permite a inserção das notas de 5 disciplinas (variando de 0 a 10) e a frequência em percentual (0 a 100%) para cada aluno. A partir desses dados, a aplicação calcula automaticamente:

- A média das notas de cada aluno.

- A média da turma para cada uma das cinco disciplinas.

- Quais alunos possuem a média acima da média geral da turma (destaques).

- Quais alunos estão com frequência abaixo de 75% (risco de reprovação).
### Premissas

Analisando os requisitos do desafio, assumi que a abordagem para o desenvolvimento seguiria algumas premissas:

- **Disciplinas fixas:** Foram consideradas 5 disciplinas fixas para todos os alunos, simplificando a modelagem inicial para atender o escopo da avaliação.

- **Frequência única:** A frequência do aluno é informada de forma geral e percentual, e não aula a aula no sistema.

- **Visualização dinâmica:** O professor precisaria de um painel (Dashboard) onde pudesse visualizar todos os alunos, médias e alertas em tempo real de maneira clara e objetiva.

### Decisões de projeto

- **Separação de responsabilidades (Arquitetura REST):** Optei por construir uma API no Back-end isolada do Front-end. Isso permite que o sistema seja facilmente escalável e que os dados possam ser consumidos por outras plataformas no futuro.

- **Cálculos no Back-end:** A lógica de cálculo de médias, identificação de destaques e verificação de alunos em risco foi implementada no servidor (Spring Boot), enviando para o Front-end apenas o necessário. Isso diminui o processamento no lado do cliente.

- **Dockerização:** A aplicação foi totalmente conteinerizada (Front-end, Back-end e Banco de Dados) através do Docker Compose, garantindo que o projeto rode em qualquer máquina sem problemas de dependências locais.

- **Interface Amigável:** O React foi utilizado no Front-end com uma abordagem limpa (CSS puro e flexbox/grid), focando na usabilidade para o usuário final (o professor).

### Habilidades

- Dockerização de aplicações: criação de `Dockerfile` para React e Java, além de orquestração com `docker-compose.yml`.

- Modelagem de dados relacional com PostgreSQL integrado via JPA/Hibernate.

- Construção de uma API RESTful completa em Java com Spring Boot.

- Implementação de injeção de dependências, Services e Controllers no Spring.

- Desenvolvimento de interface responsiva e consumo de API no React utilizando `fetch` e `hooks` (useState, useEffect).

- Tratamento de regras de negócio específicas no servidor.

---

## Tecnologias utilizadas

### Front-end

- React.js (via Vite)

- CSS3 puro para estilização

### Back-end

- Java 25

- Spring Boot (Web, Data JPA)

- Maven

### Banco de dados

- PostgreSQL

### DevOps

- Docker

- Docker Compose
 

---

## Documentação da API

### Visão geral


A API foi desenvolvida em Spring Boot e roda por padrão na porta `8080`. O base path é `/api/alunos`.

| Endpoint | Método HTTP | Descrição |

|----------|--------------|-----------|

| `/api/alunos` | POST | Recebe os dados de um novo aluno e o salva no banco de dados. |

| `/api/alunos` | GET | Retorna uma lista de todos os alunos cadastrados. |

| `/api/alunos/medias-turma` | GET | Retorna um array com as médias da turma nas 5 disciplinas. |

| `/api/alunos/acima-media` | GET | Retorna a lista de alunos com média individual acima da média geral da turma. |

| `/api/alunos/risco-frequencia`| GET | Retorna a lista de alunos com frequência abaixo de 75%. |

### Corpo das requisições e respostas

#### Endpoint: `/api/alunos` (POST)

### Detalhes

**Request:**

{

"nome": "João Silva",

"nota1": 7.5,

"nota2": 8.0,

"nota3": 6.5,

"nota4": 9.0,

"nota5": 10.0,

"presenca": 80

}

**Resposta - 200 OK**

{

"id": 1,

"nome": "João Silva",

"nota1": 7.5,

"nota2": 8.0,

"nota3": 6.5,

"nota4": 9.0,

"nota5": 10.0,

"presenca": 80

}

#### Endpoint: /api/alunos/medias-turma (GET)

**Resposta - 200 OK**

(Retorna as médias das disciplinas 1, 2, 3, 4 e 5, respectivamente)

[
6.5,
7.8,
8.0,
7.2,
9.1
]

---
#### Instalando e testando localmente

⚠️ Pré-requisitos:

- git
- Docker e Docker Compose ( Recomendado )
- Ou localmente Node.js(v18+) e Java JDK 25 com Maven

#### Docker

Esta é a maneira mais fácil de rodar o projeto, pois ele já configura o banco de dados, o back-end e o front-end automaticamente.

1-  Clone o repositório:
	git clone  https://github.com/Educa0198/DTI_Desafio.git



2- Acesse a pasta raiz do projeto:
	   cd DTI_DESAFIO

3- Suba os containers com o Docker Compose:
	docker-compose up -d --build

4- Acesse a aplicação no seu navegador:
- front-end: http://localhost:3000
- back-end: http://localhost:8080


#### Manualmente

Caso prefira rodar os serviços separadamente ( necessita do PostgreSQL instalado e rodando na porta 5432 com o banco  escola_db, usuário dti e senha DTI)

##### Rodando o back-end (Spring boot):

1- Acessar a pasta do backend:
	cd backend

2- Instale as dependências e rode o projeto (via Maven Wrapper)
	./mvnw spring-boot:run

##### Rodando o front-end (React):

1- Abra um novo terminal e acesse a pasta do frontend:
	cd frontend

2- instale as dependências
	npm install

3- Inicie o servidor de desenvolvimento:
	npm run dev

4- Acesse o link gerado pelo Vite no console 

---




