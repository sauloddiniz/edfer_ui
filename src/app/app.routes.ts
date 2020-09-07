import { OauthGuard } from './security/guard';
import { LoginComponent } from './security/login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { DashboardComponent } from './models/dashboard/dashboard/dashboard.component';
import { LogisticaGuard } from './security/logisticaGuard';
import { PedidoComponent } from './models/Logistica/pedido/pedido.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent, canActivate: [OauthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'viagem', component: PedidoComponent, canActivate: [OauthGuard, LogisticaGuard] },
//    { path: 'orcamento-log', component: OrcamentoLogComponent, canActivate: [OauthGuard, LogisticaGuard] },
//    { path: 'orcamento-log-consulta', component: OrcamentoConsultaComponent, canActivate: [OauthGuard, LogisticaGuard] },
    { path: 'almoxerifado', loadChildren: './models/almoxarifado/almoxarifado.module#AlmoxarifadoModule', canActivate: [OauthGuard] },
    { path: 'previsao', loadChildren: './models/previsoes/previsoes.module#PrevisoesModule', canActivate: [OauthGuard] },
    { path: 'cadastro-geral', loadChildren: './models/cadastro-geral/cadastro-geral.module#CadastroGeralModule', canActivate: [OauthGuard]},
    { path: 'colaborador', loadChildren: './models/Logistica/motorista/motorista.module#MotoristaModule', canActivate: [OauthGuard]},
    { path: 'veiculo', loadChildren: './models/Logistica/veiculo/veiculo.module#VeiculoModule', canActivate: [OauthGuard]},
    { path: 'usuario', loadChildren: './models/usuario/usuario.module#UsuarioModule', canActivate: [OauthGuard]},
    { path: 'agenda', loadChildren: './models/agenda-vendedor/agenda.module#AgendaModule', canActivate: [OauthGuard]},
    { path: 'faturamento', loadChildren: './models/faturamento/faturamento.module#FaturamentoModule', canActivate: [OauthGuard]},
    { path: 'patios', loadChildren: './models/Logistica/patios/patios.module#PatiosModule', canActivate: [OauthGuard]},
    { path: 'certificado', loadChildren: './models/certificado/certificado.module#CertificadoModule', canActivate: [OauthGuard]}
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
