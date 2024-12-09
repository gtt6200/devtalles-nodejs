# Proyecto de NOC
El objetivo es crear una serie de tareas usnado Arquitectura limpia y demás patrones de diseño de software con TypeScript.

## dev
1. Clonar el archivo env.template a .env
2. Configurar las variables de entorno 

```
PORT=3000

MAILER_SERVICE=
MAILER_EMAIL=
MAILER_SECRET_KEY=

PROD=

MONGO_URL=
MONGO_DB_NAME=
MONGO_USER=
MONGO_PASS=

POSTGRES_URL=
POSTGRES_USER=
POSTGRES_DB=
POSTGRES_PASSWORD=


```

3. Instalar las deps ```npm install```
4. Levantar las bases de datos con el comando
    ```
    docker compose up -d
    ```
5. Ejecutar el comando ``` npx prisma migrate dev ``` para establecer la base de datos de postgreSQL

6. Scripts del programa ```npm run dev``` para modo desarrollo y monitoreo, ```npm run build``` para compilar todo a js y creará la carpeta de distribución ```./dist```, ```npm run start``` compilara el programa a JavaScript e iniciará el proyecto.