import { CsvErrors } from '../models/csv-errors';
import { Observable, from, map, of } from 'rxjs';
import { CsvDataInterface } from '../models/csv-data';
import { CsvSettings } from '../models/csv-settings';

export class LoadCsv {
  
  loadCsvFile(file: File, csvSettings: CsvSettings) : Observable<CsvDataInterface | null> {
    const data$: Observable<string> = from(this.readFile(file, csvSettings.isUtf8));
        
    return data$.pipe(
      map((data: string) => {
        if(data === '') {
          return null;
        } else {          
          const headers: string[] | null = this.getCsvHeaders(data, csvSettings.separator);
          const columnLength: number = (headers != null) ? headers.length : this.getFirstLineLength(data, csvSettings.separator);
          const columns: string[] = this.getColumns(data, csvSettings.separator, csvSettings.enclosing, csvSettings.firstRowIsHeader);
          
          const csvData : CsvDataInterface = {
            fileName: file.name,
            totalLines: this.getAmountOfLines(data, csvSettings.firstRowIsHeader),
            headers: headers,
            columns: columns,
            columnsDefault: columns,
            columnLength: columnLength,
            errors: this.checkCsvData(data, columnLength, csvSettings.separator, csvSettings.enclosing)
          };

          return csvData;
        }
      })
    );
  }

  private readFile(file: File, isUtf8: boolean) : Promise<string> {
    return new Promise((resolve) => {
      let fileReader: FileReader = new FileReader();

      fileReader.onloadend = (e) => {
        const testResult: any = fileReader.result?.toString();
        resolve(testResult);
      }

      fileReader.onerror = () => {
         resolve('');
      };

      if (isUtf8) {
        fileReader.readAsText(file, "UTF-8");
      } else {
        fileReader.readAsText(file);
      }
    });
  }

  private getCsvHeaders(content: string, separator: string) : string[] {
    let allTextLines = content.split(/\r|\n|\r/);
    let firstLine = allTextLines[0];
    
    let allHeaders: string[] = firstLine.split(separator);

    return allHeaders;
  }

  private getAmountOfLines(content: string, firstRowIsHeader: boolean) : number {
    let allTextLines: string[] = content.split(/\r|\n|\r/);

    let startIndex: number = (firstRowIsHeader) ? 1 : 0;
    let count: number = 0;

    for(let i = startIndex; i < allTextLines.length; i++) {
      if(allTextLines[i].trim() !== '') {
        count++;
      }
    }

     return count;
  }

  private getFirstLineLength(content: string, separator: string) : number {
    let allTextLines = content.split(/\r|\n|\r/);
    let firstLine = allTextLines[0];
    
    let lineSplitted: string[] = firstLine.split(separator);

    return lineSplitted.length;
  }

  private getColumns(content: string, separator: string, enclosing: string, firstLineIsHeader: boolean) : string[] {
    let allTextLines: string[] = content.split(/\r|\n|\r/);

    let startIndex: number = (firstLineIsHeader) ? 1 : 0;

    const allCoumns: string[] = [];

    for(let i = startIndex; i < allTextLines.length; i++) {
      let currentLine: string = allTextLines[i];

      if(currentLine.trim() !== "") {
        let indices: number[] = this.getIndicesOfSeparator(currentLine, separator, enclosing);

        let columns: string[] = this.getDataFromStringAsArray(currentLine, indices, enclosing);

        for(let j = 0; j < columns.length; j++) {
          allCoumns.push(columns[j]);
        }
      }
    }

    return allCoumns;
  }

  private checkCsvData(content: string, expectedLength: number, separator: string, enclosing: string) : CsvErrors {
    let errors: string[] = [];

    let allTextLines = content.split(/\r|\n|\r/);
    allTextLines.pop();

    let errorFound: number = 0;

    for(let i = 1; i < allTextLines.length; i++) {
      let currentLine: string = allTextLines[i];

      if(currentLine.trim() !== "") {
        let indices: number[] = this.getIndicesOfSeparator(currentLine, separator, enclosing);
        
        let columns: string[] = this.getDataFromStringAsArray(currentLine, indices, enclosing);

        if(columns.length < expectedLength) {
          errors.push("TOO FEW COLUMNS AT LINE: " + (i + 1) + " -> " + currentLine);
          errorFound++;
        } else if(columns.length > expectedLength) {
          errors.push("TOO MANY COLUMNS AT LINE: " + (i + 1) + " -> " + currentLine);
          errorFound++
        }
      }
    }

    if(errorFound > 0) {
      return new CsvErrors(true, errors);
    }

    return new CsvErrors(false, errors);
  }
  
  private getIndicesOfSeparator(currentLine: string, separator: string, enclosing: string) : number[] {
    let indices: number[] = [];
    indices.push(0);
     let ignoreCommas: boolean = false;  

    for(let i = 0; i < currentLine.length; i++) {
      if(!ignoreCommas) {
        if(currentLine[i] === separator) {
          if(i + 1 < currentLine.length) {
            if(currentLine[i + 1] === enclosing) {
              ignoreCommas = true
            }
                        
            indices.push(i);
          } else {
            indices.push(i);
          }                      
        }
      } else {
        if(currentLine[i] === separator && currentLine[i - 1] === enclosing) {
          indices.push(i);

          if(i + 1 < currentLine.length) {
            if(currentLine[i + 1] === enclosing) {
              ignoreCommas = true
            } else {
              ignoreCommas = false;
            }
          }                      
        }
     }
    }

    indices.push(currentLine.length);

    return indices;
  }
  
  private getDataFromStringAsArray(currentLine: string, indices: number[], enclosing: string) : string[] {
    let columns: string[] = [];
    
    for(let i = 0; i < indices.length - 1; i++) {
      if (indices[i + 1] > indices[i]) {
        if(i > 0) {
          indices[i]++;
        }

        let part: string = currentLine.substring(indices[i], indices[i + 1]);
        columns.push(part);
      } else {
        columns.push("");
      }                
    }

    return this.removeEnclosingFromData(columns, enclosing);
  }

  private removeEnclosingFromData(data: string[], enclosing: string) : string[]  {
    for(let i = 0; i < data.length - 1; i++) {
      let currentLine: string = data[i];
      
      if(currentLine.startsWith(enclosing)) {
        currentLine = currentLine.substring(1, currentLine.length);
      }

      if(currentLine.endsWith(enclosing)) {
        currentLine = currentLine.substring(0, currentLine.length - 1);
      }

      data[i] = currentLine;
    }

    return data;
  }

}