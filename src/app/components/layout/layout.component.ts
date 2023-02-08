import { Component } from "@angular/core";
import { LoaderService } from "src/app/services/loader.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  constructor(
    public loader: LoaderService,
  ) {}
}
