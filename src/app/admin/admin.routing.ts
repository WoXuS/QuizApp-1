import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminLogsResolver } from "../resolvers/admin-logs.resolver";
import { AdminDashboardComponent } from "./components/admin-dashboard/admin-dashboard.component";
import { AdminLogsComponent } from "./components/admin-logs/admin-logs.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'logs',
    pathMatch: 'full',
  },
  {
    path: 'logs',
    component: AdminLogsComponent,
    resolve: {
      logs: AdminLogsResolver,
    }
  }
];

@NgModule({
  declarations: [],
  imports: [
      RouterModule.forChild(routes)
  ],
  exports: [
      RouterModule
  ]
})

export class AdminRoutingModule {}
