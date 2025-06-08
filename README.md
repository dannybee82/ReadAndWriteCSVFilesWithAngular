# Angular Read and Write CSC Files

Read, modify and save simple CSV (Comma Separated Values) files in the browser. See the root in folder for example images. It is possible to change some settings like of the CSV-file: separator, enclosing, first row is header, read/save as UTF-8 or Unicode.

\- Angular 19 application (with [Angular CLI](https://github.com/angular/angular-cli) version 20.0.1)

\- Sample CSV-files in the folder: src\\assets\\sample-data\\

**Command to install**

_npm install_

or shorter:

_npm i_

**Command to run the application:**

_ng serve --open_

or shorter:

_ng s --o_

### **Changelog:**

_June 2025_

\- Upgrade to Angular 20. 

\- Using the keyword **protected** for properties that are only accessible in the template.

\- Using the keyword **readonly** for properties initialized by Angular (input(), output(), model()).

\- Changed some paths of files.

\- Scroll to top uses: _behavior: 'smooth'_

\- SCSS uses _@use_ and _@forward_ in stead of _@import_

_\- Various other small changes._