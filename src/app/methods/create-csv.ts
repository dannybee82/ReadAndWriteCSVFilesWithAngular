import { CsvSettings } from "../models/csv-settings";

export class CreateCsv {
    
    create(headers: string[] | null, columns: string[], useLength: number, csvSettings: CsvSettings) : string {
        let headerLength = useLength;

        let output: string = '';
        let counter: number = 0;

        if(csvSettings.firstRowIsHeader && headers != null) {
            for(let i = 0; i < headerLength; i++) {
                output += headers[i];
    
                if(i < headerLength - 1) {
                    output += csvSettings.separator;
                }
            }

            output += "\n";
        }

        for(let i = 0; i < columns.length; i++) {
            let currentColumn =  (columns[i] != null) ? columns[i].toString() : 'null';
            currentColumn = this.removeLineBreaks(currentColumn);

            if(currentColumn.indexOf(csvSettings.separator) > -1) {
                output += csvSettings.enclosing + currentColumn + csvSettings.enclosing;
            } else {
                output += currentColumn;
            }

            if(counter < headerLength - 1) {
                output += csvSettings.separator;
            }

            counter++;

            if(counter == headerLength) {
                counter = 0;
                output += "\n";
            }
        }

        return output;
    }

    private removeLineBreaks(subject: string) : string {
        return subject.replace(/\n|\r/g, " ");
    }

}