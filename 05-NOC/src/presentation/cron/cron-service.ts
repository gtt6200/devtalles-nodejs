import { CronJob } from "cron";

type CronTime = string | Date;
type OnTick = () => void;

export class CronService{

    public static createJob( cronTime: CronTime, onTick: OnTick): CronJob {
        console.log("Cron job started... from cron-service.ts");
        
        const job = new CronJob(cronTime, onTick);
        
        job.start();

        return job;
    }
}