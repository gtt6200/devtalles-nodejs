import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

const severityEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH
}
export class PostgresLogDatasource extends LogDataSource {

    private prisma = new PrismaClient();

    async saveLog(log: LogEntity): Promise<void> {
        const level = severityEnum[log.level];

        try {
            const newLog = await this.prisma.logModel.create({
                data: {
                    message: log.message,
                    level: level,
                    createdAt: log.createdAt,
                    origin: log.origin
                }
            });
            console.log('Postgres log created: ', newLog.id);
        } catch (error) {
            throw error;
        }
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        try {
            const level = severityEnum[severityLevel];
            const readLogs = await this.prisma.logModel.findMany({
                where: {
                    level: level
                }
            });
            return readLogs.map(log => LogEntity.fromObject(log));
        } catch (error) {
            console.log('an unexpected error occurred', error);
            throw error;
        }
    }
}