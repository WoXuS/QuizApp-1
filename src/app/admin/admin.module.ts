import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { MaterialModule } from "../material.module";
import { AdminRoutingModule } from "./admin.routing";
import { AdminDashboardComponent } from "./components/admin-dashboard/admin-dashboard.component";
import { AdminLogsComponent } from "./components/admin-logs/admin-logs.component";

@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminLogsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    TranslateModule,
    MaterialModule,
  ],
})
export class AdminModule {}
