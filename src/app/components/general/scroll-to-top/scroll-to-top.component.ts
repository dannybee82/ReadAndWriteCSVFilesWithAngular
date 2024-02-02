import { Component, HostListener } from '@angular/core';

@Component({
	standalone: true,
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.scss']
})

export class ScrollToTopComponent {

  public isVisible: boolean = false;

  @HostListener("window:scroll", ["$event"])

  onWindowScroll() : void {
    let pos: number = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    this.isVisible = (pos - max > 1.0) ? true : false;
  }

  scrollToTop() : void {  
    scroll(0, 0);    
  }

}