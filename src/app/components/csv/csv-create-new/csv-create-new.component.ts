import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { CsvHeaderInterface } from 'src/app/models/csv-headers';
import { CsvApplicationService } from 'src/app/services/csv-application.service';
import { CsvDataInterface } from 'src/app/models/csv-data';
import { CsvErrors } from 'src/app/models/csv-errors';

@Component({
  selector: 'app-csv-create-new',
  templateUrl: './csv-create-new.component.html',
  styleUrl: './csv-create-new.component.css'
})
export class CsvCreateNewComponent implements OnInit {

  headerForm: UntypedFormGroup = new FormGroup({});
  recordsForm: UntypedFormGroup = new FormGroup({});

  headers: CsvHeaderInterface[] = [];

  constructor(
    private fb: FormBuilder,
    private csvApplicationService: CsvApplicationService
  ) {}

  ngOnInit(): void {
    this.headerForm = this.fb.group({
      header: ['', Validators.required],
      defaultValue: ['']
    });

    this.recordsForm = this.fb.group({
      amount: [1, [Validators.required, Validators.min(1)]]
    });
  }

  addHeader() : void {
    if(this.headerForm.valid) {
      let header: CsvHeaderInterface = {
        header: this.headerForm.get('header')?.value, 
        defaultValue: this.headerForm.get('defaultValue')?.value 
      };

      this.headers.push(header);
    } else {
      this.headerForm.markAllAsTouched();
    }
  }

  removeHeader(index: number) : void {
    this.headers.splice(index, 1);
  }

  createCsv() : void {
    if(this.recordsForm.valid && this.headers.length > 0) {
      const amount = parseInt(this.recordsForm.get('amount')?.value ?? 0);

      if(amount == 0) {
        alert('Amount can\'t be lower or equal to 0.');
        return;
      }

      const csvFile: CsvDataInterface = {
        fileName: 'my_custom_csv.csv',
        totalLines: amount,
        headers: this.getHeaders(),
        columns: this.getColumns(amount),
        columnsDefault: this.getColumns(amount),
        columnLength: this.getHeaders().length,
        errors: new CsvErrors(false, [])
      }

      this.csvApplicationService.setCreatenew(csvFile);
    } else {
      this.recordsForm.markAllAsTouched();
    }
  }

  private getHeaders() : string[] {
    let arr: string[] = [];

    this.headers.forEach(item => arr.push(item.header));

    return arr;
  }

  private getColumns(amount: number) : string[] {
    let arr: string[] = [];

    for(let i = 0; i < amount; i++) {
      this.headers.forEach(item => arr.push(item.defaultValue));
    }

    return arr;
  }

}