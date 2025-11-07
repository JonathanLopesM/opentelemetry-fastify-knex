# Using open telemetry and Jaeger to instrument a Fastify API and Knex queries with Node.js

Example of how to instrument a Node.js application using Open Telemetry Collector and Jaeger on a Docker environment

First leave your star in the repo 🌟

Check out the [youtube video](https://youtu.be/1l6dgHqOiHU)

![TUMB_PERFORMANCE_NODEJS](https://github.com/user-attachments/assets/b0a2b2ac-89e6-4a2a-9241-ab989498cdf6)


Processo inicial - 

Iniciar o postgress e o opentelemetry com o docker-compose.yml
  # docker-compose up -d

instalar as bibliotecas do opentelemetry


npm i @opentelemetry/api@1.9.0
Irá comunicar os dados

npm i @opentelemetry/sdk-node@0.52.1
para configurar o opentelemetry


npm i @opentelemetry/instrumentation-http@0.52.1
instrumentação de http - todas as chamadas por http serão monitoradas por esse pacote

npm i @opentelemetry/instrumentation-knex@0.38.0