import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { OauthGuard } from 'src/app/security/guard';
import { PatiosComponent } from './patio/patios.component';

const routes: Routes = [
  { path: 'consulta', component: PatiosComponent, canActivate: [OauthGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PatioRoutes {}
