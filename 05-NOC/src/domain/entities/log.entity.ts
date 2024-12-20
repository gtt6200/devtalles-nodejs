
export enum LogSeverityLevel {
    low = "low",
    medium = "medium",
    high = "high"
}

export interface LogEntityOptions {
    level: LogSeverityLevel;
    message: string;
    createdAt?: Date;
    origin: string;

}


export class LogEntity {
    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor(options: LogEntityOptions) {
        const { level, message, origin, createdAt = new Date() }: LogEntityOptions = options;
        this.message = message;
        this.level = level;
        this.createdAt = createdAt;
        this.origin = origin;
    }


    static fromJson = (json: string): LogEntity => {
        json = (json === '') ? '{}' : json;
        const { level, message, createdAt, origin }: LogEntityOptions = JSON.parse(json);
        const log = new LogEntity({
            message: message,
            level: level,
            createdAt: createdAt,
            origin: origin
        });
        return log;
    }

    static fromObject = (object: { [key: string]: any }): LogEntity => {
        const { level, message, createdAt, origin } = object;
        const log = new LogEntity({
            message: message,
            level: level,
            createdAt: createdAt,
            origin: origin
        });
        return log;
    }
}
