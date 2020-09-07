import { Routes, RouterModule } from '@angular/router';
import { CadastroVeiculoComponent } from './cadastro-veiculo/cadastro-veiculo.component';
import { OauthGuard } from 'src/app/security/guard';
import { LogisticaGuard } from 'src/app/security/logisticaGuard';
import { ConsultaVeiculoComponent } from './consulta-veiculo/consulta-veiculo.component';
import { CadastroManutencaoComponent } from './manutencao-veiculo/cadastro-manutencao/cadastro-manutencao.component';
import { ConsultaManutencaoComponent } from './manutencao-veiculo/consulta-manutencao/consulta-manutencao.component';
import { CadastroAbastecimentoComponent } from './abastecimento-veiculo/cadastro-abastecimento/cadastro-abastecimento.component';
import { ConsultaAbastecimentoComponent } from './abastecimento-veiculo/consulta-abastecimento/consulta-abastecimento.component';
import { CadastroPneuComponent } from './pneu-veiculo/cadastro-pneu/cadastro-pneu.component';
import { ConsultaPneuComponent } from './pneu-veiculo/consulta-pneu/consulta-pneu.component';
import { CadastroDiariaComponent } from './diaria-veiculo/cadastro-diaria/cadastro-diaria.component';
import { ConsultaDiariaComponent } from './diaria-veiculo/consulta-diaria/consulta-diaria.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {path: '', children: [
        {path: 'cadastro', component: CadastroVeiculoComponent, canActivate : [OauthGuard, LogisticaGuard]},
        {path: 'lista', component: ConsultaVeiculoComponent, canActivate : [OauthGuard, LogisticaGuard]},
        {path: ':id', component: CadastroVeiculoComponent, canActivate: [OauthGuard]},
    ]},
    {path: 'manutencao', children: [
        {path: 'cadastro', component: CadastroManutencaoComponent, canActivate : [OauthGuard, LogisticaGuard]},
        {path: 'lista', component: ConsultaManutencaoComponent, canActivate : [OauthGuard, LogisticaGuard]},
        {path: ':id', component: CadastroManutencaoComponent, canActivate : [OauthGuard, LogisticaGuard]},
    ]},
    {path: 'abastecimento', children: [
        {path: 'cadastro', component: CadastroAbastecimentoComponent, canActivate : [OauthGuard, LogisticaGuard]},
        {path: 'lista', component: ConsultaAbastecimentoComponent, canActivate : [OauthGuard, LogisticaGuard]},
        {path: ':id', component: CadastroAbastecimentoComponent, canActivate : [OauthGuard, LogisticaGuard]},
    ]},
    {path: 'pneu', children: [
        {path: 'cadastro', component: CadastroPneuComponent, canActivate : [OauthGuard, LogisticaGuard]},
        {path: 'lista', component: ConsultaPneuComponent, canActivate : [OauthGuard, LogisticaGuard]},
        {path: ':id', component: CadastroPneuComponent, canActivate : [OauthGuard, LogisticaGuard]},
    ]},
    {path: 'diaria', children: [
        {path: 'cadastro', component: CadastroDiariaComponent, canActivate : [OauthGuard, LogisticaGuard]},
        {path: 'lista', component: ConsultaDiariaComponent, canActivate : [OauthGuard, LogisticaGuard]},
        {path: ':id/edit', component: CadastroDiariaComponent, canActivate : [OauthGuard, LogisticaGuard]},
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class VeiculoRoutes {}
