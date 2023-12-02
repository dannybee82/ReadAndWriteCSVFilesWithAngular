export class CsvErrors {

    constructor(
        public hasErrors: boolean = false, 
        public errors: string[] = []
    ) {}

}