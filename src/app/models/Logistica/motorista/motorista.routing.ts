import { Routes, RouterModule } from '@angular/router';
import { CadastroMotoristaComponent } from './cadastro-motorista/cadastro-motorista.component';
import { ConsultaMotoristaComponent } from './consulta-motorista/consulta-motorista.component';
import { NgModule } from '@angular/core';
import { OauthGuard } from 'src/app/security/guard';
import { LogisticaGuard } from 'src/app/security/logisticaGuard';

const routes: Routes = [
    { path: ':id/edit', component: CadastroMotoristaComponent, canActivate: [OauthGuard, LogisticaGuard] },
    { path: 'novo', component: CadastroMotoristaComponent, canActivate: [OauthGuard, LogisticaGuard] },
    { path: 'lista', component: ConsultaMotoristaComponent, canActivate: [OauthGuard, LogisticaGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MotoristaRoutes { }
