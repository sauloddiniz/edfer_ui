import { CadastroComponent } from './cadastro/cadastro.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { OauthGuard } from 'src/app/security/guard';

const routes: Routes = [
    { path: 'novo', component: CadastroComponent, canActivate: [OauthGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class FaturamentoRoutes {}
