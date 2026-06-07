import { ViewportScroller } from '@angular/common';
import { Component, HostListener, WritableSignal, inject, signal } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.html',
  styleUrls: ['./scroll-to-top.scss']
})
export class ScrollToTop {

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