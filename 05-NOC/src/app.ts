import { envs } from "./config/plugins/envs.plugin";
import { Server } from "./presentation/server";

(async () => {
    main();
})();


function main() {

    const { PORT: port, PROD: isProd, MAILER_EMAIL: email, MAILER_SECRET_KEY: pass } = envs;
    console.log(envs);
    console.log(`us envs ${port}, ${isProd}, ${email}, ${pass}`);
    //Server.start();
}