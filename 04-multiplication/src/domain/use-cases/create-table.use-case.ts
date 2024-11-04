
export interface CreateTableUseCase{
   execute: (options: CreateTableUseOptions) => string;
}

export interface CreateTableUseOptions{
    base: number,
    limit:number
}

export class Createtable implements CreateTableUseCase{
    
    constructor(){
        /**
         * DI - Inyección de Dependencias / Dependency Inyection
         */
    }

    execute({base, limit}:CreateTableUseOptions){
        let outputMessage:string = '';
        for(let i:number = 1; i<=limit; i++){
            outputMessage += `${base} X ${i} = ${base * i}\n`;
        }

        return outputMessage;
    }

}