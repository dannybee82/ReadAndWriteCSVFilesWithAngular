import { SingleCsvRecord } from "../models/single-csv-record";

export class ShowCsvData {

    public prepare(headers: string[] | null, columns: string[], totalLines: number, columnLength: number) : any[] {
        let data: any[] = [];

        for(let i = 0; i < totalLines; i++) {
            let startIndex: number  = (i * columnLength);
            let endIndex: number = (i * columnLength) + columnLength;
            let dataPairs: SingleCsvRecord[] = [];
      
            let currentData: string[] = columns.slice(startIndex, endIndex);
            let defaultData: string[] = structuredClone(currentData);
      
            for(let j = 0; j < currentData.length; j++) { 
              let headerValue = (headers != null) ? headers[j] : "";   
              const record: SingleCsvRecord = new SingleCsvRecord(startIndex, headerValue, currentData[j], defaultData[j]);
              dataPairs.push(record);
              startIndex++;
            }
      
            data.push(dataPairs);
          }

        return data;
    }

    public getColumnsFromData(data: any[]) : string[] {
      let columns: string[] = [];

      for(let i = 0; i < data.length; i++) {
        let currentData: SingleCsvRecord[] = data[i];

        for(let j = 0; j < currentData.length; j++) {
          columns.push(currentData[j].column);
        }
      }

      return columns;
    }

}