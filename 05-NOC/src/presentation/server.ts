
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { EmailService } from './email/email.service';
import { SendLogEmail } from "../domain/use-cases/email/send-email-logs";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { LogSeverityLevel } from '../domain/entities/log.entity';
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";


const postgresLogRepository = new LogRepositoryImpl(new PostgresLogDatasource());
const mongoLogRepository = new LogRepositoryImpl(new MongoLogDatasource());
const fileSystemLogRepository = new LogRepositoryImpl(new FileSystemDataSource());

const emailService = new EmailService();

export class Server {
    public static async start() {
        console.log("Server started... from server.ts");
        // const emailUseCase = new SendLogEmail(emailService, fileSystemLogRepository);
        // emailUseCase.execute(['yunieldd7@gmail.com']);
        //       emailService.sendEmailWithFileSystemLogs(['']);
        /* emailService.sendEmail({
             to: '',
             subject: 'prueba',
             htmlBody: 'hola desde la prueba'
         });
         */

        // const logs = await logRepository.getLogs(LogSeverityLevel.high);
        // console.log(logs);
        // CronService.createJob(
        //     '*/5 * * * * *', //esta al reves el slash
        //     () => {
        //         const url: string = "https://google.com";
        //         new CheckServiceMultiple(
        //             [postgresLogRepository, mongoLogRepository, fileSystemLogRepository],
        //             () => console.log(`${url} is OK`),
        //             (error) => console.log(error)
        //         ).execute(url);
        //         // new CheckService(
        //         //     logRepository,
        //         //     () => console.log(`${url} is OK`),
        //         //     (error) => console.log(error)
        //         // ).execute(url);
        //     }
        // );

    }
}

//               console.log("5 seconds are passed ", date);
//             new CheckService().execute("http://localhost:3000");