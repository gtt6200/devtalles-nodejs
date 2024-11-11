import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';


interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}


type SuccessCallBack = (() => void) | undefined;
type ErrorCallBack = ((error: string) => void) | undefined;

export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallback: SuccessCallBack,
        private readonly errorCallback: ErrorCallBack
    ) { }

    public async execute(url: string): Promise<boolean> {

        try {
            const req = await fetch(url);
            if (!req.ok) {
                throw new Error(`Error on check service ${url}`);
            }
            this.successCallback && this.successCallback();
            const log = new LogEntity(`Service ${url} is running`, LogSeverityLevel.low);
            this.logRepository.saveLog(log);
            return true;
        } catch (error) {
            const errorMessage = `${url} is down ${error}`;
            const log = new LogEntity(`${errorMessage}`, LogSeverityLevel.high);
            this.logRepository.saveLog(log);
            this.errorCallback && this.errorCallback(errorMessage);
            return false;
        }

    }
}