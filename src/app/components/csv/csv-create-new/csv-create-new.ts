import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { CsvHeaderInterface } from '../../../models/csv-headers';
import { CsvApplication } from '../../../services/csv-application';
import { CsvData } from '../../../models/csv-data.interface';
import { CsvErrors } from '../../../models/csv-errors';
import { ButtonWithImage } from '../../general/button-with-image/button-with-image';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
	imports: [
		ButtonWithImage,
		FormsModule,
		ReactiveFormsModule,
	],
  selector: 'app-csv-create-new',
  templateUrl: './csv-create-new.html',
  styleUrl: './csv-create-new.scss'
})
export class CsvCreateNew implements OnInit {

  protected headerForm: UntypedFormGroup = new FormGroup({});
  protected recordsForm: UntypedFormGroup = new FormGroup({});

  protected headers: WritableSignal<CsvHeaderInterface[]> = signal([]);

	private fb = inject(FormBuilder);
	private csvApplicationService = inject(CsvApplication);

  ngOnInit(): void {
    this.headerForm = this.fb.group({
      header: ['', Validators.required],
      defaultValue: ['']
    });

    this.recordsForm = this.fb.group({
      amount: [1, [Validators.required, Validators.min(1)]]
    });
  }

  addHeader(): void {
    if(this.headerForm.valid) {
      let header: CsvHeaderInterface = {
        header: this.headerForm.get('header')?.value, 
        defaultValue: this.headerForm.get('defaultValue')?.value 
      };

      this.headers().push(header);
    } else {
      this.headerForm.markAllAsTouched();
    }
  }

  removeHeader(index: number): void {
    this.headers().splice(index, 1);
  }

  createCsv(): void {
    if(this.recordsForm.valid && this.headers().length > 0) {
      const amount = parseInt(this.recordsForm.get('amount')?.value ?? 0);

      if(amount == 0) {
        alert('Amount can\'t be lower or equal to 0.');
        return;
      }

      const csvFile: CsvData = {
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

  private getHeaders(): string[] {
    let arr: string[] = [];

    this.headers().forEach(item => arr.push(item.header));

    return arr;
  }

  private getColumns(amount: number): string[] {
    let arr: string[] = [];

    for(let i = 0; i < amount; i++) {
      this.headers().forEach(item => arr.push(item.defaultValue));
    }

    return arr;
  }

}