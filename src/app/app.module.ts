//Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

//Services
import { CsvApplicationService } from './services/csv-application.service';
import { CsvRecordsService } from './services/csv-records.service';

//Components
import { AppComponent } from './app.component';
import { ButtonComponent } from './components/general/button/button.component';
import { ButtonWithImageComponent } from './components/general/button-with-image/button-with-image.component';
import { CsvMainComponent } from './components/csv/csv-main/csv-main.component';
import { OpenFileComponent } from './components/general/open-file/open-file.component';
import { CsvContentComponent } from './components/csv/csv-content/csv-content.component';
import { CsvMenuNextPrevComponent } from './components/csv/csv-menu-next-prev/csv-menu-next-prev.component';
import { CsvSettingsComponent } from './components/csv/csv-settings/csv-settings.component';
import { CsvChangePopupComponent } from './components/csv/csv-change-popup/csv-change-popup.component';
import { CsvViewModeComponent } from './components/csv/csv-view-mode/csv-view-mode.component';
import { ScrollToTopComponent } from './components/general/scroll-to-top/scroll-to-top.component';
import { CsvCreateNewComponent } from './components/csv/csv-create-new/csv-create-new.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    ButtonWithImageComponent,
    CsvMainComponent,
    OpenFileComponent,
    CsvContentComponent,
    CsvMenuNextPrevComponent,
    CsvSettingsComponent,
    CsvChangePopupComponent,
    CsvViewModeComponent,
    ScrollToTopComponent,
    CsvCreateNewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    CsvApplicationService,
    CsvRecordsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
