# **SIAPESQ - Eco Data - Sistema de Apoio à Pesquisa Taxonômica**

Este projeto é uma aplicação web voltada para **pesquisa e visualização de informações taxonômicas e ecológicas**, utilizando dados da **API oficial do GBIF**. A aplicação oferece um ecossistema completo de autenticação, busca, visualização de perfis biológicos, mapas de distribuição e outras funcionalidades.

Construído com **Next.js (App Router), TypeScript, Tailwind CSS, Redux Toolkit**, e integração com **JWT + Refresh Token** para autenticação segura e persistente.

---

## **Principais Funcionalidades**

- ✅ Autenticação com **JWT + Refresh Token**
- ✅ Sistema de login, logout, signup com proteção de rotas
- ✅ Busca taxonômica utilizando a **API do GBIF**
- ✅ Exibição de **carrossel de imagens**, **mapa de distribuição de espécies** e **perfis biológicos**
- ✅ Acordeão interativo com árvore taxonômica
- ✅ Paginação com controle dinâmico de dados
- ✅ Suporte a SSR (Server-Side Rendering) e caching com revalidação
- ✅ Gerenciamento de estado com **Redux Toolkit**
- ✅ UI moderna, responsiva, customizável e acessível com **Tailwind CSS**
- ✅ Sistema de UI/UX gráfico usando toasts, loaders e animações suaves

---

## **Tecnologias Utilizadas**

- **Framework:** Next.js 14 (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS v4
- **Gerenciamento de estado:** Redux Toolkit + Redux Persist
- **Autenticação:** JWT + Refresh Token (via Supabase)
- **API de Dados:** GBIF Public API
- **Mapas:** Leaflet + GBIF Map Tiles
- **Banco de dados:** Supabase (PostgreSQL)
- **Outros:** jose (JWT), bcrypt, headlessui

---

## **Instalação e Execução**

Siga os passos abaixo para rodar o projeto localmente:

### 1. **Clonar o repositório**

```bash
git clone https://github.com/siapesq/2025-01-desafio-front-end.git
cd 2025-01-desafio-front-end
```

### 2. **Entrar na branch de carlos-teixeira**

```bash
git checkout minha-branch-siapesq
```

### 2. **Instalar dependências**

```bash
npm install
```

