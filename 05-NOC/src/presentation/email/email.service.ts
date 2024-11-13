import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/envs.plugin';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';


interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachement[];
}
interface Attachement {
    filename: string;
    path: string;
}

export class EmailService {

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    });

    constructor(
        private readonly logRepository: LogRepository
    ) { }


    async sendEmail(options: SendMailOptions): Promise<boolean> {

        const { to, subject, htmlBody, attachments = [] } = options;
        try {
            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments
            });

            const log = new LogEntity(
                {
                    message: `Email sent to ${to}`,
                    level: LogSeverityLevel.low,
                    origin: 'email.service.ts'
                });
            this.logRepository.saveLog(log);

            console.log(sentInformation);


            return true;
        } catch (error) {
            const log = new LogEntity(
                {
                    message: `Email not sent to ${to}`,
                    level: LogSeverityLevel.high,
                    origin: 'email.service.ts'
                });
            this.logRepository.saveLog(log);

            return false;
        }
    }

    async sendEmailWithFileSystemLogs(to: string | string[]) {
        const subject = "Logs from server";
        const htmlBody = `
        <h3>Logs from system - NOC</h3>
        <hr>
        <h5>Here got a 3 files from logs, low, medium and high</h5>
        <p>Check the attached file</p>
        <br>
        `;

        const attachments: Attachement[] = [
            {
                filename: "logs-all.log",
                path: "./logs/logs-all.log"
            },
            {
                filename: "logs-medium.log",
                path: "./logs/logs-medium.log"
            },
            {
                filename: "logs-high.log",
                path: "./logs/logs-high.log"
            }
        ];
        return this.sendEmail({ to, subject, htmlBody, attachments });
    }
}