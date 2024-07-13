# Nearty

## Pre-requisitos

Crear archivo .env en la raíz del proyecto con las siguientes variables de entorno

```bash
GOOGLE_MAPS_API_KEY=aaa
JWT_SECRET=ultra-secret
DATABASE_HOST=db
DATABASE_PORT=5432
DATABASE_USER=santicode
DATABASE_PASSWORD=santicode
DATABASE_NAME=nearty_db
```

## Correr el proyecto

```bash
docker-compose up --build
```

## Documentación 

Puedes encontrar la documentación de la API en la siguiente URL

```bash
http://localhost:3000/docs
```

## Funcionalidades Principales

- [x] Registro de usuario
- [x] Login de usuario
- [x] Endpoint para obtener restaurantes cercanos
- [x] Consulta de transacciones históricas
- [x] Logout de usuario

