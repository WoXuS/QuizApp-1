import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private readonly LOADING_DELAY = 200;
  private loadingElements = 0;

  public get isPageLoaded(): boolean {
    return this.loadingElements <= 0;
  }

  public beginLongAction(): void {
    setTimeout(() => {
      this.loadingElements++;
    }, this.LOADING_DELAY);

  }

  public endLongAction(): void {
    this.loadingElements--;
  }
}
