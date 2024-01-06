import { CsvErrors } from "./csv-errors";

export interface CsvDataInterface {
    fileName: string;
    totalLines: number;
    headers: string[] | null;
    columns: string[];
    columnsDefault: string[];
    columnLength: number;
    errors: CsvErrors;
}