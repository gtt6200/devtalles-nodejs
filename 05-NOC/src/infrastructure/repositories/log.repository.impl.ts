import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";



export class LogRepositoryImpl implements LogRepository {

    constructor(private readonly dataSource: LogDataSource) { }


    async saveLog(log: LogEntity): Promise<void> {
        return this.dataSource.saveLog(log);
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        return this.dataSource.getLogs(severityLevel);
    }

}