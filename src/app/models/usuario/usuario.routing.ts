import { UsuarioConsultaComponent } from './usuario-consulta/usuario-consulta.component';
import { UsuarioComponent } from './usuario-cadastro/usuario.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminGuard } from 'src/app/security/AdminGuard';

const routes: Routes = [
    {path: ':id/edit', component: UsuarioComponent, canActivate: [AdminGuard]},
    {path: 'novo', component: UsuarioComponent, canActivate: [AdminGuard]},
    {path: 'lista', component : UsuarioConsultaComponent, canActivate: [AdminGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class UsuarioRoutes {}
