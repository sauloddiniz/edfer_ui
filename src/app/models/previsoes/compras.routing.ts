import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PrevisaoCadastroComponent } from './previsao-cadastro/previsao-cadastro.component';
import { PrevisaoConsultaComponent } from './previsao-consulta/previsao-consulta.component';
import { CompraGuard } from 'src/app/security/compraGuard';

const routes: Routes = [
    { path: '', component: PrevisaoCadastroComponent, canActivate: [CompraGuard] },
    { path: 'consulta', component: PrevisaoConsultaComponent, canActivate: [CompraGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ComprasRoutes { }
