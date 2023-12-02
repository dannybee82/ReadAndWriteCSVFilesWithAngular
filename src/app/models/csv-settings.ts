export class CsvSettings {

    constructor(
        public separator: string = ',', 
        public enclosing: string = '"', 
        public firstRowIsHeader: boolean = true,  
        public isUtf8: boolean = true
    ) {}

}