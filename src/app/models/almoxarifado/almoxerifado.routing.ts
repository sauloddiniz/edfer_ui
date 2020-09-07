import { ListaAlmoxerifadoComponent } from './lista-almoxerifado/lista-almoxerifado.component';
import { Routes, RouterModule } from '@angular/router';
import { CadastroAlmoxerifadoComponent } from './cadastro-almoxerifado/cadastro-almoxerifado.component';
import { OauthGuard } from 'src/app/security/guard';
import { NgModule } from '@angular/core';
import { LogisticaGuard } from 'src/app/security/logisticaGuard';
import { LogisticaOrVendaGuard } from 'src/app/security/LogisticaOrVendaGuard';

const routes: Routes = [
    {path: '', component: CadastroAlmoxerifadoComponent, canActivate : [OauthGuard, LogisticaOrVendaGuard]},
    {path: 'lista', component: ListaAlmoxerifadoComponent, canActivate : [OauthGuard, LogisticaGuard]},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AlmoxerifadoRoutes {}
