import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";



interface SendLogEmailUseCase {
    execute: (to: string | string[]) => Promise<boolean>;
}


export class SendLogEmail implements SendLogEmailUseCase {

    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository
    ) { }
    async execute(to: string | string[]) {
        const originName: string = 'send-email-logs.ts';

        try {
            const sent = await this.emailService.sendEmailWithFileSystemLogs(to);
            if (!sent) {
                throw new Error('Email log not sent');
            }
            const log = new LogEntity({
                message: `Email log sent`,
                level: LogSeverityLevel.low,
                origin: originName
            });
            this.logRepository.saveLog(log);
            return true;
        } catch (error) {
            const log = new LogEntity({
                message: `${error}`,
                level: LogSeverityLevel.high,
                origin: originName
            });
            this.logRepository.saveLog(log);
            return false;
        }
    };


}