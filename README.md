# Desafio Técnico – Integrações Open Delivery

A **Accon** é uma plataforma para restaurantes que desejam vender online. Nosso ecossistema permite que estabelecimentos tenham um e-commerce próprio, aceitem pagamentos online, façam a gestão completa de pedidos, entregas e operações de loja. Atualmente, também oferecemos soluções logísticas com integração via Uber Direct, cardápio digital, integração com iFood e funcionalidades de autoatendimento e PDV (ponto de venda). Para saber mais, acesse: [https://accon.com.br](https://accon.com.br)

## Objetivo

Este desafio tem como objetivo avaliar sua capacidade de desenvolver um módulo de integração com sistemas externos de **pedidos**, utilizando a stack da Accon e seguindo o padrão **Open Delivery (Abrasel)**. Consulte a documentação oficial do Open Delivery: [https://abrasel-nacional.github.io/docs/](https://abrasel-nacional.github.io/docs/)

## Descrição do Desafio

Sua missão será:

1. **Consumir uma API externa de pedidos** (mockada).
2. **Transformar os dados recebidos** para o modelo da interface Open Delivery (modelo de pedido).
3. **Persistir os pedidos** em um banco de dados PostgreSQL.
4. **Renderizar uma página HTML com LiquidJS** listando os pedidos mais recentes (por exemplo, dos últimos 30 minutos).
5. **Organizar o código** de modo que seja fácil incluir novas integrações com outros parceiros no futuro.

## API Externa Fictícia (Mock de Pedidos)

Você deve simular o consumo de uma API como se estivesse ouvindo pedidos de um sistema externo.

Use o seguinte endpoint para obter pedidos:

```
GET https://desafio-api.accon.com.br/orders
```

Exemplo de resposta:

```json
{
  "_id": "5fd26b20ba956e0035f28fa4",
  "delivery": true,
  "canceled": false,
  "scheduled": false,
  "network": "5c992b518a6b17002b707510",
  "sequential": 303,
  "store": {
    "_id": "5c992cd18a6b17002b707517",
    "name": "Accon Demonstração",
    "address": {
      "latlng": {
        "lat": -16.7074141,
        "lng": -49.2823991
      },
      "address": "Avenida T 9",
      "city": "Goiânia",
      "complement": "A801",
      "district": "Jardim América",
      "number": "2310",
      "state": "GO",
      "zip": "74255220"
    },
    "deliveryTime": "30",
    "toGoTime": "20",
    "details": {
      "whatsapp": {
        "is_active": false
      },
      "email": "suporte@accon.com.br",
      "phone": "(62)3661-9954",
      "socialName": "Accon",
      "storePhone": "(62)3661-9954",
      "document": "122.333.333-33"
    }
  },
  "user": {
    "_id": "5c992b528a6b17002b707511",
    "name": "Cliente",
    "document": "000.474.562-02",
    "email": "cliente@accon.com.br",
    "phone": "(62) 91234-5678",
    "totalOrders": 2
  },
  "address": {
    "_id": "5f475cccc20661770ea102e5",
    "zip": "74255-220",
    "state": "Goiás",
    "city": "Goiânia",
    "address": "Avenida T 9",
    "number": "2310",
    "complement": "",
    "district": "Jardim América",
    "name": "work",
    "is_active": true,
    "created_at": "2020-08-27T04:55:58.631Z",
    "latlng": {
      "lat": -16.7080934,
      "lng": -49.2841873
    }
  },
  "discount": 6,
  "subtotal": 60,
  "deliveryTax": 0,
  "date": "2020-12-10T18:38:24.590Z",
  "voucher": {
    "_id": "5cfbbf81a1618e0033bd514e",
    "stores": [
      "5c992cd18a6b17002b707517",
      "5c9f795101d233002b027d91",
      "5ce6a413f553d00034d5d2e7",
      "5ce6a63af553d00034d5d354"
    ],
    "fidelity": false,
    "products": [],
    "percent": true,
    "usage": 6,
    "recurrent": false,
    "usagePerUser": 20,
    "firstOrder": false,
    "on_list": false,
    "is_active": true,
    "name": "Cupom de teste",
    "text": "teste",
    "value": 10,
    "quantity": 9999,
    "type": "both",
    "rules": "Teste",
    "start_at": "2019-06-06T00:00:00.000Z",
    "expires_at": "2100-01-06T23:59:59.999Z",
    "rede": "5c992b518a6b17002b707510",
    "time": [
      {
        "_id": "5fd26b17ba956e0035f28f9f",
        "dayOfWeek": 0,
        "start": "00:00",
        "end": "23:59"
      },
      {
        "_id": "5fd26b17ba956e0035f28f9e",
        "dayOfWeek": 1,
        "start": "00:00",
        "end": "23:59"
      },
      {
        "_id": "5fd26b17ba956e0035f28f9d",
        "dayOfWeek": 2,
        "start": "00:00",
        "end": "23:59"
      },
      {
        "_id": "5fd26b17ba956e0035f28f9c",
        "dayOfWeek": 3,
        "start": "00:00",
        "end": "23:59"
      },
      {
        "_id": "5fd26b17ba956e0035f28f9b",
        "dayOfWeek": 4,
        "start": "00:00",
        "end": "23:59"
      },
      {
        "_id": "5fd26b17ba956e0035f28f9a",
        "dayOfWeek": 5,
        "start": "00:00",
        "end": "23:59"
      },
      {
        "_id": "5fd26b17ba956e0035f28f99",
        "dayOfWeek": 6,
        "start": "00:00",
        "end": "23:59"
      }
    ],
    "created_at": "2019-06-05T20:02:23.955Z",
    "updated_at": "2019-06-05T20:02:23.955Z",
    "filed": false,
    "minOrderValue": 0
  },
  "notes": "Bater no portão!",
  "document": "",
  "ip": "177.149.156.34",
  "change": 0,
  "source": "desktop",
  "status": [
    {
      "_id": "5fd26b20ba956e0035f28fa5",
      "name": "Realizado",
      "date": "2020-12-10T18:38:24.590Z"
    }
  ],
  "total": 54,
  "payment": {
    "online": false,
    "name": "Débito - Visa",
    "cod": "5c51aebb22c5d6596c5ac4b4",
    "externalVendorCode": "9e6b3883-3170-4275-8dcb-bbff4ebbcc85"
  },
  "products": [
    {
      "id": "5e33309e0b7942004ce95d19",
      "name": "Pizza",
      "quantity": 1,
      "modifiers": [
        {
          "id": "5e39cf190b7942004cebab64",
          "name": "Adicionar Bacon",
          "price": {
            "actualPrice": 6,
            "originalPrice": 0,
            "starterPrice": 0
          },
          "quantity": 1,
          "group": "5e39ceff0b7942004cebab41"
        },
        {
          "id": "5e3899190b7942004ceb54c4",
          "name": "1 Sabor",
          "price": {
            "actualPrice": 0,
            "originalPrice": 0,
            "starterPrice": 0
          },
          "quantity": 1,
          "group": "5e3899140b7942004ceb54c2"
        },
        {
          "id": "5e33309e0b7942004ce95d14",
          "name": "Bacon",
          "price": {
            "actualPrice": 44,
            "originalPrice": 0,
            "starterPrice": 0
          },
          "quantity": 1,
          "group": "5e33309e0b7942004ce95d13"
        }
      ],
      "rating": {
        "improvements": []
      },
      "externalVendors": {
        "status": []
      },
      "externalDelivery": {
        "status": []
      },
      "notes": "",
      "total": 60
    }
  ]
}
```

## Requisitos Técnicos

- Utilizar **NestJS** com arquitetura modular.
- Utilizar **TypeORM** com **PostgreSQL**.
- Implementar a conversão dos dados para o formato **Open Delivery** (modelo de pedido).
- Armazenar os pedidos no banco de dados.
- Expor uma página HTML renderizada com **LiquidJS** listando os pedidos mais recentes.
- Estruturar a integração para ser reutilizável, com possibilidade de novos adaptadores no futuro.

## Dicas

- Crie uma estrutura baseada em uma interface como `IOrderIntegrationAdapter`, onde diferentes sistemas externos possam ser adaptados para o modelo Open Delivery.
- Simule a “escuta” de novos pedidos com um serviço que consome a API mock a cada X segundos ou a cada request manual, como um endpoint `/sync-orders`.
- Utilize a [documentação oficial da Abrasel (Open Delivery)](https://abrasel-nacional.github.io/docs/) para basear os modelos de pedido.

## Critérios de Avaliação

- Clareza e organização do código.
- Aderência à stack (**NestJS**, **TypeORM**, **Postgres**, **LiquidJS**).
- Qualidade da transformação dos dados para o modelo Open Delivery.
- Estrutura que favoreça a reutilização e expansão (ex: novas integrações).
- Documentação e instruções claras no repositório.
- Histórico de commits bem distribuído e compreensível.

## Entrega

Faça um fork público deste repositório e implemente a solução nele:

- Código-fonte da aplicação (incluindo instruções de instalação e execução) no seu GitHub.
- Descrição das decisões técnicas.

## Prazo de Entrega

**7 dias corridos** após o recebimento deste desafio.

Envie o link do repositório após a conclusão do desafio.

## Links Úteis

- [NestJS](https://docs.nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [LiquidJS](https://liquidjs.com/)
- [Documentação Open Delivery (Abrasel)](https://abrasel-nacional.github.io/docs/)
