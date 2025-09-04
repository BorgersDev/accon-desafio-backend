# Desafio Técnico – Accon Delivery

> Receber os dados pela API Accon Delivery -> Transforma-los no padrão Open Delivery -> persistir e renderizar os dados.

---

## 🚀 Visão Geral

Este sistema recebe, armazena e possibilita a visualização de pedidos externos em tempo real. O backend consome a API Accon, transforma os dados para o modelo Open Delivery, persiste no banco PostgreSQL e exibe os pedidos mais recentes via LiquidJS estilizados com Tailwind CSS, com atualização automática por WebSocket.
A estrutura foi pensada de uma forma na qual não é difícil adicionar outras APIs , persistir seus dados e renderiza-las.

---

## 🛠️ Como funciona

- **Integração:** Busca pedidos da API mockada e converte para o padrão Open Delivery através de um adapter.
- **Persistência:** Salva pedidos que foram convertidos no banco PostgreSQL usando TypeORM.
- **Dashboard:** Exibe pedidos dos últimos 5 minutos, renderizado com LiquidJS e estilizados com Tailwindcss.
- **Tempo real:** Atualiza a lista de pedidos por WebSocket sempre que há novos pedidos sem recarregar a tela.
- **Sincronização:** Manual através do endpoint (`/sync-orders`) ou automática (agendado a cada 30s).

---


## 📝 Passo a Passo para Rodar o Sistema

### 1. Pré-requisitos
- Node.js v18+
- npm ou yarn
- Docker *(opcional, recomendado)*

### 2. Clone o repositório
```bash
git clone https://github.com/seu-usuario/accon-desafio-backend.git
cd accon-desafio-backend
```

### 3. Instale as dependências do backend
```bash
npm install
```
ou
```bash
yarn install
```

### 4. Configure o banco de dados

- Crie o arquivo `.env` na raiz do projeto e preencha os campos com as suas credenciais:

```env
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=accon-desafio
```
#### Usando Docker (recomendado)
 Suba o banco de dados

```bash
npm run db:up
```

#### Sem Docker

Instale o PostgreSQL localmente ([download](https://www.postgresql.org/download/)).
- Crie um banco de dados para o projeto (exemplo: accon_desafio).
Execute o script `docker/init.sql` no seu banco para criar todas as tabelas e estruturas necessárias:
  ```sh
  psql -U <usuario> -d <nome_do_banco> -f docker/init.sql
  ```
- Crie o arquivo `.env` na raiz do projeto e preencha os campos com as suas credenciais:

```env
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=accon-desafio
```

### 5. Inicie o backend
```bash
npm run start:dev
```
ou
```bash
yarn start:dev
```
### 6. Sincronize pedidos
- Manual: faça requisições Get no endpoint: `/sync-orders` (Postman ou Insomnia)
- Automático: o sistema busca pedidos novos em intervalos de 30s

### 7. Acesse o dashboard
- Abra [http://localhost:3000](http://localhost:3000) no navegador
- Veja os pedidos dos últimos 5 minutos sendo exibidos e atualizados em tempo real

### 8. Testes Unitários(mockados)
```bash
npm run test
```

---

### 🔗 Passo a Passo para Adicionar uma Nova Integração (exemplo: iFood)

1. **Crie o Adapter**
   - Acesse `src/integrations/adapters/`.
   - Crie o arquivo do adapter (ex: `ifood-order.adapter.ts`).
   - Implemente a interface `IOrderIntegrationAdapter` com o método `toOpenDelivery`.

2. **Adicione o Adapter ao Serviço de Integração**
   - Importe o novo adapter em `src/integrations/integrations.service.ts`.
   - Adicione o adapter ao objeto `adapters`.
   - Adicione a URL da API ao objeto `apiUrls`.

3. **Configure Credenciais**
   - Adicione variáveis de ambiente necessárias para autenticação da API no arquivo `.env`.
   - Utilize essas variáveis no adapter para autenticar as requisições.

4. **Implemente o Mapeamento dos Dados**
   - No adapter, converta os dados recebidos da API para o formato Open Delivery.
   - Utilize ou adapte o mapper existente para garantir compatibilidade.

5. **Atualize o Controller (Opcional)**
   - Permita sincronização manual por endpoint, aceitando o parâmetro `source` (ex: `/sync-orders?source=ifood`).

6. **Teste a Integração**
   - Reinicie o backend.
   - Chame o endpoint de sincronização para verificar se os pedidos estão sendo buscados, convertidos e persistidos corretamente.

---

## 📚 Tecnologias Utilizadas
- NestJS
- TypeORM
- PostgreSQL
- LiquidJS
- Tailwind CSS
- WebSocket (Socket.IO)
