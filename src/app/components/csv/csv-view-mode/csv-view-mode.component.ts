import { Component, OnInit } from '@angular/core';
import { CsvApplicationService } from 'src/app/services/csv-application.service';

@Component({
  selector: 'app-csv-view-mode',
  templateUrl: './csv-view-mode.component.html',
  styleUrls: ['./csv-view-mode.component.css']
})
export class CsvViewModeComponent implements OnInit {

  public isGridMode: boolean = true;
  
  constructor(
    private csvApplicationService: CsvApplicationService
  ) { }

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
