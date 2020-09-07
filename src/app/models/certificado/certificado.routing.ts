import { Certificado_produtoComponent } from './certificado_produto/certificado_produto.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { Routes, RouterModule } from '@angular/router';
import { OauthGuard } from 'src/app/security/guard';
import { NgModule } from '@angular/core';
import { VendaGuard } from 'src/app/security/vendaGuard';
import { ClienteComponent } from './cliente/cliente.component';

const routes: Routes = [
        {path: 'cadastro', component: CadastroComponent, canActivate : [OauthGuard, VendaGuard]},
        {path: 'produto-certificado', component: Certificado_produtoComponent, canActivate : [OauthGuard, VendaGuard]},
        {path: 'cliente', component: ClienteComponent, canActivate : [OauthGuard, VendaGuard]},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CertificadoRoutes {}
