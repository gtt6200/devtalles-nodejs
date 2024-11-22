import { PrismaClient } from "@prisma/client";
import { envs } from "./config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "./data/mongo";
import { Server } from "./presentation/server";

(async () => {
    main();
})();


async function main() {

    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    });



    // const { PORT: port, PROD: isProd, MAILER_EMAIL: email, MAILER_SECRET_KEY: pass } = envs;
    // console.log(envs);
    // console.log(`us envs ${port}, ${isProd}, ${email}, ${pass}`);
    Server.start();
}