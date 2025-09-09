# Sistema de Chamados

Este projeto é um **sistema de gerenciamento de chamados** desenvolvido em **ReactJS** com integração ao **Firebase**.
Ele foi criado com o objetivo de estudar e praticar o desenvolvimento de aplicações web modernas, abordando autenticação, CRUD, upload de arquivos e manipulação de dados em tempo real.

---

##  Tecnologias Utilizadas

* **ReactJS** → Biblioteca JavaScript para criação de interfaces.
* **React Router DOM** → Controle de rotas e navegação SPA.
* **Firebase** → Banco de dados NoSQL, autenticação e armazenamento de arquivos.
* **date-fns** → Manipulação e formatação de datas.
* **react-icons** → Conjunto de ícones prontos para uso.
* **react-toastify** → Exibição de notificações elegantes.

---

## Funcionalidades

O sistema permite:

✅ **Cadastro de usuários**
✅ **Cadastro e edição de chamados**
✅ **Cadastro de clientes**
✅ **Dashboard com listagem de chamados**
✅ **Upload de arquivos (ex.: Imagem de Perfil)**
✅ **Autenticação de usuários (login)**

Este projeto tem como foco principal **renderização dinâmica de dados**, **interação com APIs**, **integração com Firebase** e **boas práticas no desenvolvimento de aplicações React**.

---

##  Estrutura do Projeto

```bash
├── public
│   ├── _redirects
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
└── src
    ├── App.js
    ├── App.test.js
    ├── assets
    │   ├── avatar.png
    │   ├── cover.png
    │   └── logo.png
    ├── components
    │   ├── Header
    │   │   ├── header.css
    │   │   └── index.js
    │   ├── Modal
    │   │   ├── index.js
    │   │   └── modal.css
    │   └── Title
    │       ├── index.js
    │       └── title.css
    ├── contexts
    │   └── auth.js
    ├── index.css
    ├── index.js
    ├── pages
    │   ├── Customers
    │   │   ├── customer.css
    │   │   └── index.js
    │   ├── Dashboard
    │   │   ├── dashboard.css
    │   │   └── index.js
    │   ├── New
    │   │   ├── index.js
    │   │   └── new.css
    │   ├── Profile
    │   │   ├── index.js
    │   │   └── profile.css
    │   ├── SignIn
    │   │   ├── index.js
    │   │   └── signin.css
    │   └── SignUp
    │       └── index.js
    ├── reportWebVitals.js
    ├── routes
    │   ├── Private.js
    │   └── index.js
    ├── services
    │   └── firebaseConnection.js
    └── setupTests.js
```

---

##  Como Rodar o Projeto

1. **Clone este repositório:**

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
```

2. **Instale as dependências:**

```bash
npm install
```

3. **Configure o Firebase:**

* Crie um projeto no [Firebase](https://firebase.google.com/).
* Configure o arquivo `src/services/firebaseConnection.js` com suas credenciais.

4. **Inicie o servidor de desenvolvimento:**

```bash
npm start
```

O projeto estará disponível em **[http://localhost:3000](http://localhost:3000)**

---

##  Objetivo Educacional

Este projeto foi desenvolvido para **aprimorar habilidades em React** e **praticar integrações com back-end**, incluindo:

* Autenticação de usuários
* Upload e visualização de arquivos
* Estrutura de rotas privadas
* Manipulação de estado global com Context API
* Integração com Firebase Firestore
