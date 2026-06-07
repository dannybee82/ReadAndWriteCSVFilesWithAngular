# Angular Read and Write CSC Files

Read, modify and save simple CSV (Comma Separated Values) files in the browser. See the root in folder for example images. It is possible to change some settings like of the CSV-file: separator, enclosing, first row is header, read/save as UTF-8 or Unicode.

\- Angular 22 application (with [Angular CLI](https://github.com/angular/angular-cli) version 22.0.0)

\- Sample CSV-files in the folder: src\\assets\\sample-data\\

**Command to install**

**Angular 22** needs a **Node.js** version of at least _22.22.3_

_npm install_

or shorter:

_npm i_

**Command to run the application:**

_ng serve --open_

or shorter:

_ng s --o_

### **Changelog:**

_June 2026_

\- Upgrade to _Angular 22_ and upgraded other packages.

\- Migrated _@Injectable_ to _@Service_.

\- Using the default: _ChangeDetectionStrategy.OnPush_ in stead of _ChangeDetectionStrategy.Eager_.

\- Using the latest file naming conventions - and deleting the old schematics from _angular.json_

\- Various changes in the templates.

_November 2025_

\- Upgrade to Anguar 21.

*   Removed deprecated _Karma_ and installed _Vitest._
*   Migrated _Jasmine_ tests to _Vitest_ tests for future use (command: **ng generate refactor-jasmine-vitest**).

\- Removed package _@angular/animations_

\- Migration to _Zoneless_ application (Without _Zone.js_ - removed package _zone.js_).

\- Added more _Angular signals_.

\- Various minor changes.

_June 2025_

\- Upgrade to Angular 20. 

\- Using the keyword **protected** for properties that are only accessible in the template.

\- Using the keyword **readonly** for properties initialized by Angular (input(), output(), model()).

\- Changed some paths of files.

\- Scroll to top uses: _behavior: 'smooth'_

\- SCSS uses _@use_ and _@forward_ in stead of _@import_

_\- Various other small changes._