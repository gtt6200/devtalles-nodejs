import { Createtable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/sace-file.use-case";

interface RunOptions {
    base: number,
    limit:number,
    showTable:boolean;
}


export class ServerApp{
    static run({base, limit, showTable}: RunOptions){
        console.log('Server running... ');
        
        const table = new Createtable().execute({base, limit});
        const wasCreated = new SaveFile()
            .execute({
                fileContent: table,
                fileDestination: `outputs/table-${base}`,
                fileName: `${base}`});
        
        if(showTable) console.log(table);
        (wasCreated) ? 
        console.log('File created succefull') :
        console.error('Unexpected error an occurred');
        
        
    }
}