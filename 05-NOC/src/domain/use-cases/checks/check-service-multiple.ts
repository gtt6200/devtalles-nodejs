import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';


interface CheckServiceMultipleUseCase {
    execute(url: string): Promise<boolean>;
}


type SuccessCallBack = (() => void) | undefined;
type ErrorCallBack = ((error: string) => void) | undefined;

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {

    constructor(
        private readonly logRepository: LogRepository[],
        private readonly successCallback: SuccessCallBack,
        private readonly errorCallback: ErrorCallBack
    ) { }

    private callLogs(log: LogEntity) {
        this.logRepository.forEach(logRepository => logRepository.saveLog(log));
    }

    public async execute(url: string): Promise<boolean> {

        try {
            const req = await fetch(url);
            if (!req.ok) {
                throw new Error(`Error on check service ${url}`);
            }
            this.successCallback && this.successCallback();
            const log = new LogEntity({
                message: `Service ${url} is running`,
                level: LogSeverityLevel.low,
                origin: 'check.service.ts'
            });
            //  this.logRepository.saveLog(log);
            this.callLogs(log);
            return true;
        } catch (error) {
            const errorMessage = `${url} is down ${error}`;
            const log = new LogEntity({
                message: `${errorMessage}`,
                level: LogSeverityLevel.high,
                origin: 'check.service.ts'
            });
            // this.logRepository.saveLog(log);
            this.callLogs(log);
            this.errorCallback && this.errorCallback(errorMessage);
            return false;
        }

    }
}