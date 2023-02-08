import { Injectable } from "@angular/core";
import { MatPaginatorIntl } from "@angular/material/paginator";
import { TranslateService } from "@ngx-translate/core";
import { firstValueFrom } from "rxjs";

@Injectable()
export class MatTranslatedPaginator extends MatPaginatorIntl {
  constructor(private translate: TranslateService) {
    super();

    this.translatePaginator();
    translate.onLangChange.subscribe({
      next: () => this.translatePaginator()
    });
  }

  private async translatePaginator(): Promise<void> {
    this.itemsPerPageLabel = await firstValueFrom(this.translate.get('paginator.itemsPerPageLabel'));
    this.nextPageLabel = await firstValueFrom(this.translate.get('paginator.nextPageLabel'));
    this.previousPageLabel = await firstValueFrom(this.translate.get('paginator.previousPageLabel'));

    this.getRangeLabel = (page: number, pageSize: number, length: number) => {
      const limitFromlabel: string = this.translate.instant('paginator.limitFromLabel');
      let limit = (page + 1) * pageSize;
      if (limit > length) {
        limit = length;
      }
      return `${page * pageSize + 1} - ${limit} ${limitFromlabel} ${length}`;
    };
  }
}
