import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgendaComponent } from './agenda-cadastro/agenda.component';
import { OauthGuard } from 'src/app/security/guard';
import { VendaGuard } from 'src/app/security/vendaGuard';
import { AgendaConsultaComponent } from './agenda-consulta/agenda-consulta.component';
import { GestorGuard } from 'src/app/security/gestorGuard';

const routes: Routes = [
    {path: 'novo', component: AgendaComponent, canActivate : [OauthGuard, VendaGuard]},
    {path: 'lista', component: AgendaConsultaComponent, canActivate : [OauthGuard, GestorGuard, VendaGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AgendaRoutes {}
