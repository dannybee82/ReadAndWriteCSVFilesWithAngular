import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { CsvApplicationService } from 'src/app/services/csv-application.service';
import { ButtonWithImageComponent } from 'src/app/components/general/button-with-image/button-with-image.component';

@Component({
	imports: [
		ButtonWithImageComponent,
	],
  selector: 'app-csv-view-mode',
  templateUrl: './csv-view-mode.component.html',
  styleUrls: ['./csv-view-mode.component.scss']
})
export class CsvViewModeComponent implements OnInit {

  isGridMode: WritableSignal<boolean> = signal(true);
  
	private csvApplicationService = inject(CsvApplicationService);

  ngOnInit(): void {
    this.csvApplicationService.getCurrentMode().subscribe({
      next: (result) => {
        this.isGridMode.set(result);
      }
    })
  }

  setViewMode(viewMode: boolean) : void {
    this.isGridMode.set(viewMode);
    this.csvApplicationService.setCurrentMode(this.isGridMode());
  }

}