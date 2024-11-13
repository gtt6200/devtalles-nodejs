
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";
import { logRepository } from "../infrastructure/repositories/log.repository.impl";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { EmailService } from './email/email.service';


const fileSystemLogRepository = new logRepository(
    new FileSystemDataSource()
);


export class Server {
    public static start() {
        console.log("Server started... from server.ts");

        const emailService = new EmailService(
            fileSystemLogRepository
        );
        emailService.sendEmailWithFileSystemLogs(['']);
        /* emailService.sendEmail({
             to: '',
             subject: 'prueba',
             htmlBody: 'hola desde la prueba'
         });
         */

        /** CronService.createJob(
          '*\5 * * * * *', //esta al reves el slash
            () => {
                const url: string = "https://google.com";
                new CheckService(
                    fileSystemLogRepository,
                    () => console.log(`${url} is OK`),
                    (error) => console.log(error)
                ).execute(url);
            }
        );
        */
    }
}

//               console.log("5 seconds are passed ", date);
//             new CheckService().execute("http://localhost:3000");