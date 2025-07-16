# PcDev API ♿

## Sobre o Projeto

**PcDev API** é o backend da plataforma PcDev, uma solução web desenvolvida como projeto final para o curso Recode Pro. O objetivo principal é criar uma ponte entre **Pessoas com Deficiência (PCD)** e o mercado de trabalho, oferecendo um espaço onde candidatos podem encontrar vagas e empresas podem divulgar oportunidades, promovendo a inclusão e a diversidade.

Este projeto está alinhado com os seguintes **Objetivos de Desenvolvimento Sustentável (ODS) da ONU**:

-   **ODS 4 – Educação de Qualidade:** Fomentar oportunidades de aprendizado e capacitação.
-   **ODS 8 – Trabalho Decente e Crescimento Econômico:** Promover o crescimento econômico inclusivo e sustentável, com trabalho decente para todos.
-   **ODS 10 – Redução das Desigualdades:** Reduzir as desigualdades, garantindo que ninguém seja deixado para trás.

Esta entrega corresponde à **Versão Completa** do desafio proposto.

---

## 🎯 Público-Alvo e Objetivos de Desenvolvimento Sustentável (ODS)

-   **Público-Alvo:** Pessoas com Deficiência (PCD).
-   **ODS da ONU alinhadas ao projeto:**
    -   **ODS 4 – Educação de Qualidade:** Assegurar uma educação inclusiva, equitativa e de qualidade.
    -   **ODS 8 – Trabalho Decente e Crescimento Econômico:** Promover o crescimento econômico inclusivo e sustentável.
    -   **ODS 10 – Redução das Desigualdades:** Reduzir as desigualdades dentro e entre os países.

---

## 🔗 Links Úteis

### Repositórios do Projeto

-   **Backend (Esta API):** [https://github.com/Squad-17-Recode/pcdevapi](https://github.com/Squad-17-Recode/pcdevapi)
-   **Frontend:** [https://github.com/Squad-17-Recode/pcdevapp](https://github.com/Squad-17-Recode/pcdevapp)
-   **Organização do Squad no GitHub:** [https://github.com/orgs/Squad-17-Recode/repositories](https://github.com/orgs/Squad-17-Recode/repositories)

---

## Funcionalidades Principais

-   **API RESTful** construída com Spring Boot.
-   **Cadastro de Usuários:** Sistema de registro para dois tipos de perfis: `Candidato` e `Empresa`.
-   **Autenticação e Autorização:** Sistema seguro de login utilizando Spring Security e JSON Web Tokens (JWT).
-   **Gerenciamento de Vagas:** Empresas autenticadas podem criar, visualizar, atualizar e deletar suas vagas.
-   **Candidaturas:** Candidatos podem se inscrever nas vagas de seu interesse.
-   **Persistência de Dados:** Utilização do Spring Data JPA para mapeamento objeto-relacional com um banco de dados PostgreSQL.
-   **Migrações de Banco de Dados:** Gerenciamento do schema do banco com Flyway.

---

## Tecnologias Utilizadas

-   **Java 24**
-   **Spring Boot 3**
-   **Spring Security**
-   **Spring Data JPA**
-   **Maven**
-   **PostgreSQL**
-   **JSON Web Token (JWT)**
-   **Flyway**
-   **Lombok**

---

## Estrutura do Projeto

O projeto segue uma arquitetura em camadas para organizar as responsabilidades:

-   `config`: Configurações de segurança (JWT, CORS, SecurityConfig).
-   `controller`: Controladores REST que expõem os endpoints da API.
-   `models`: Entidades JPA, DTOs e Enums.
-   `repository`: Interfaces do Spring Data JPA para acesso ao banco de dados.
-   `service`: Lógica de negócio da aplicação.
-   `exception`: Manipuladores de exceções globais.

---

## Endpoints da API

Abaixo estão alguns dos principais endpoints disponíveis.

### Autenticação

-   `POST /api/auth/login`: Realiza o login de um `Candidato` ou `Empresa` e retorna um token JWT.
-   `PUT /api/auth/change-password`: Permite que um usuário autenticado altere sua senha.

### Candidatos

-   `POST /api/candidatos`: Registra um novo candidato.
-   `GET /api/candidatos/{id}`: Retorna os dados de um candidato específico.

### Empresas

-   `POST /api/empresa`: Registra uma nova empresa.
-   `GET /api/empresa/{id}`: Retorna os dados de uma empresa específica.
-   `POST /api/empresa/vaga`: Cria uma nova vaga (requer autenticação de empresa).

---

## ⚙️ Como Executar o Projeto Localmente

### **Pré-requisitos**

-   Node.js e npm/yarn
-   Java JDK 24 ou superior
-   Maven
-   Git

### **1. Back-end (API)**

#### **Passo 1: Clone o repositório do backend**

```bash
# Clone o repositório do back-end
git clone https://github.com/Squad-17-Recode/pcdevapi.git

# Navegue até o diretório do projeto
cd pcdevapi
```

#### **Passo 2: Configure as variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto (mesmo diretório onde está o arquivo `pom.xml`) com o seguinte conteúdo:

```env
# Database Configuration
DATABASE_URL=jdbc:postgresql://pcdevapi-test-pcdevapi.f.aivencloud.com:17502/defaultdb?ssl=require&user=avnadmin&password=AVNS_2Pg24xgocY0c9XIe89U
DATABASE_USERNAME=avnadmin
DATABASE_PASSWORD=AVNS_2Pg24xgocY0c9XIe89U

# JWT Configuration
JWT_SECRET=aHRZAcjtlf2fLfnqwrC6O/GeH5MdjH8ruBnQKhMZpBU=
JWT_EXPIRATION=43200000

# Server Configuration
SERVER_PORT=8080
```

#### **Passo 3: Instale as dependências e execute**

```bash
# Instale as dependências com o Maven
mvn clean install

# Execute a aplicação
mvn spring-boot:run
```

> ✅ A API estará rodando em `http://localhost:8080`

### **2. Front-end (Esta Aplicação React)**

#### **Passo 1: Clone o repositório do front-end**

```bash
# Em um novo terminal, clone o repositório do front-end
git clone https://github.com/Squad-17-Recode/pcdevapp.git

# Navegue até o diretório do projeto
cd pcdevapp
```

#### **Passo 2: Instale as dependências e execute**

```bash
# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

> ✅ A aplicação estará acessível em `http://localhost:5173` (ou outra porta se esta estiver ocupada)

### **3. Testando a aplicação**

1. **Acesse o frontend** em `http://localhost:5173`
2. **Navegue para a página de login** (`/login`)
3. **Crie uma conta** usando o formulário de cadastro:
   - Preencha todos os campos obrigatórios
   - Use um nome de usuário único
   - Confirme sua senha
4. **Faça login** com as credenciais criadas
5. **Explore as funcionalidades** da plataforma:
   - Visualize vagas disponíveis
   - Navegue pelas empresas cadastradas
   - Teste o modo de alto contraste
   - Configure sua conta

---

## Squad 17

-   Igor Yonezawa
-   Larissa de araújo Dias da Silva
-   Lauren Freire Monteles
-   Lucas Pires Esteves Costa
-   Matheus Moreira Lima
-   Valquiria Coelho Lima Galeno
