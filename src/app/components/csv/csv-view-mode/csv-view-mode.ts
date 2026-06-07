import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { CsvApplication } from '../../../services/csv-application';
import { ButtonWithImage } from '../../general/button-with-image/button-with-image';

@Component({
	imports: [
		ButtonWithImage,
	],
  selector: 'app-csv-view-mode',
  templateUrl: './csv-view-mode.html',
  styleUrls: ['./csv-view-mode.scss']
})
export class CsvViewMode implements OnInit {

  protected isGridMode: WritableSignal<boolean> = signal(true);
  
	private csvApplicationService = inject(CsvApplication);

  ngOnInit(): void {
    this.csvApplicationService.getCurrentMode().subscribe({
      next: (result) => {
        this.isGridMode.set(result);
      }
    })
  }

  setViewMode(viewMode: boolean): void {
    this.isGridMode.set(viewMode);
    this.csvApplicationService.setCurrentMode(this.isGridMode());
  }

}