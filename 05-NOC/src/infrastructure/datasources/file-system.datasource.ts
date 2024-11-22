import { log } from "console";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import fs from "fs";



export class FileSystemDataSource implements LogDataSource {

    private readonly logPath: string = "logs/";
    private readonly allLogsPath: string = this.logPath + "logs-all.log";
    private readonly mediumLogsPath: string = this.logPath + "logs-medium.log";
    private readonly highLogsPath: string = this.logPath + "logs-high.log";

    constructor() {
        this.createLogsFiles();
    }
    private createLogsFiles = () => {
        if (!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath);
        }
        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath
        ].forEach(path => {
            if (!fs.existsSync(path)) {
                fs.writeFileSync(path, '');
            }
        })
    }

    async saveLog(newLog: LogEntity): Promise<void> {
        const logAsJson: string = `${JSON.stringify(newLog)}\n`
        fs.appendFileSync(this.allLogsPath, logAsJson);

        if (newLog.level === LogSeverityLevel.low) return;

        if (newLog.level === LogSeverityLevel.medium) {
            fs.appendFileSync(this.mediumLogsPath, logAsJson);
        } else {
            fs.appendFileSync(this.highLogsPath, logAsJson);
        }

    }

    private getLogsFromFile = (path: string): LogEntity[] => {
        const content = fs.readFileSync(path, 'utf-8');
        if (content === '') return [];
        return content.split("\n").map(log => LogEntity.fromJson(log));
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        switch (severityLevel) {
            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.allLogsPath);
            case LogSeverityLevel.medium:
                return this.getLogsFromFile(this.mediumLogsPath);
            // return Promise.resolve(fs.readFileSync(this.mediumLogsPath, 'utf-8').split("\n").map((line: string) => JSON.parse(line)));
            case LogSeverityLevel.high:
                return this.getLogsFromFile(this.highLogsPath);
            //return Promise.resolve(fs.readFileSync(this.highLogsPath, 'utf-8').split("\n").map((line: string) => JSON.parse(line)));
            default:
                throw new Error(`Unknown severity level: ${severityLevel}`);
        }
    }

}