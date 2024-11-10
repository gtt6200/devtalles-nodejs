
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";


export class Server {
    public static start() {
        console.log("Server started... from server.ts");

        CronService.createJob(
            '*/5 * * * * *',
            () => {
            const url:string = "https://google.com";
            new CheckService(
                () => console.log(`${url} is OK`),
                (error) => console.log(error)
            ).execute(url);
           // new CheckService().execute("http://localhost:3000");
             //   console.log("5 seconds are passed ", date);
            }
        );
    }
}
