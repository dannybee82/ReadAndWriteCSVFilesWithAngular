import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ButtonComponent } from './components/general/button/button.component';
import { ButtonWithImageComponent } from './components/general/button-with-image/button-with-image.component';
import { CsvComponent } from './components/csv/csv.component';
import { OpenFileComponent } from './components/general/open-file/open-file.component';
import { CsvContentComponent } from './components/csv/csv-content/csv-content.component';
import { CsvMenuNextPrevComponent } from './components/csv/csv-menu-next-prev/csv-menu-next-prev.component';
import { CsvSettingsComponent } from './components/csv/csv-settings/csv-settings.component';
import { CsvChangePopupComponent } from './components/csv/csv-change-popup/csv-change-popup.component';
import { CsvViewModeComponent } from './components/csv/csv-view-mode/csv-view-mode.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    ButtonWithImageComponent,
    CsvComponent,
    OpenFileComponent,
    CsvContentComponent,
    CsvMenuNextPrevComponent,
    CsvSettingsComponent,
    CsvChangePopupComponent,
    CsvViewModeComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
