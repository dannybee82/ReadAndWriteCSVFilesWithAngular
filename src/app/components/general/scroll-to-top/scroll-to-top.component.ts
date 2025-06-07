import { ViewportScroller } from '@angular/common';
import { Component, HostListener, WritableSignal, inject, signal } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.scss']
})
export class ScrollToTopComponent {

  protected isVisible: WritableSignal<boolean> = signal(false);

  private scroller = inject(ViewportScroller);

  @HostListener("window:scroll")
  onWindowScroll(): void {
    let pos: number = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    this.isVisible.set((pos - max > 1.0) ? true : false);
  }

  scrollToTop(): void {  
    this.scroller.scrollToPosition([0, 0], { behavior: 'smooth' });    
  }

}