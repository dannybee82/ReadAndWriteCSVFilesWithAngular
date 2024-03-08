import { Component, OnInit, inject } from '@angular/core';
import { CsvApplicationService } from 'src/app/services/csv-application.service';
import { ButtonComponent } from 'src/app/components/general/button/button.component';
import { ButtonWithImageComponent } from 'src/app/components/general/button-with-image/button-with-image.component';

@Component({
	standalone: true,
	imports: [
		ButtonComponent,
		ButtonWithImageComponent,
	],
  selector: 'app-csv-view-mode',
  templateUrl: './csv-view-mode.component.html',
  styleUrls: ['./csv-view-mode.component.scss']
})
export class CsvViewModeComponent implements OnInit {

  public isGridMode: boolean = true;
  
	private csvApplicationService = inject(CsvApplicationService);

  ngOnInit(): void {
    this.csvApplicationService.getCurrentMode().subscribe({
      next: (result) => {
        this.isGridMode = result;
      }
    })
  }

  setViewMode(viewMode: boolean) : void {
    this.isGridMode = viewMode;
    this.csvApplicationService.setCurrentMode(this.isGridMode);
  }

}