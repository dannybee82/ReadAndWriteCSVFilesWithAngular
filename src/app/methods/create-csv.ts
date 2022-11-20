export class CreateCsv {

    create(headers: string[] | null, columns: string[], useLength: number, separator: string, enclosing: string, firstRowIsHeader: boolean) : string {
        let headerLength = useLength;

        let output: string = '';
        let counter: number = 0;

        if(firstRowIsHeader && headers != null) {
            for(let i = 0; i < headerLength; i++) {
                output += headers[i];
    
                if(i < headerLength - 1) {
                    output += separator;
                }
            }

            output += "\n";
        }

        for(let i = 0; i < columns.length; i++) {
            let currentColumn = columns[i].toString();

            if(currentColumn.indexOf(separator) > -1) {
                output += enclosing + currentColumn + enclosing;
            } else {
                output += currentColumn;
            }

            if(counter < headerLength - 1) {
                output += separator;
            }

            counter++;

            if(counter == headerLength) {
                counter = 0;
                output += "\n";
            }
        }

        return output;
    }

}