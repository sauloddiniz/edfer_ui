import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { OauthGuard } from 'src/app/security/guard';
import { PedidoComponent } from './pedido.component';

const routes: Routes = [
    {path: 'consulta', component: PedidoComponent, canActivate : [OauthGuard]},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PedidoRoutes {}
