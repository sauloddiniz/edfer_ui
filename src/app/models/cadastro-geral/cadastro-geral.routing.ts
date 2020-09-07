import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CategoriaVeiculoComponent } from './categoria-veiculo/categoria-veiculo.component';
import { FabricanteVeiculoComponent } from './fabricante-veiculo/fabricante-veiculo.component';
import { FabricantePneuComponent } from './fabricante-pneu/fabricante-pneu.component';
import { FornecedorComponent } from './fornecedor/fornecedor.component';
import { FornecedorProdutoComponent } from './fornecedor-produto/fornecedor-produto.component';
import { PostoCombustivelComponent } from './posto-combustivel/posto-combustivel.component';
import { TipoItemComponent } from './tipo-item/tipo-item.component';
import { ProdutoComponent } from './produto/produto.component';
import { OauthGuard } from 'src/app/security/guard';
import { LogisticaGuard } from 'src/app/security/logisticaGuard';

const routes: Routes = [
    { path: 'veiculo-categoria', component: CategoriaVeiculoComponent, canActivate: [OauthGuard, LogisticaGuard] },
    { path: 'fabricante-veiculo', component: FabricanteVeiculoComponent, canActivate: [OauthGuard, LogisticaGuard] },
    { path: 'fabricante-pneu', component: FabricantePneuComponent, canActivate: [OauthGuard, LogisticaGuard] },
    { path: 'fornecedor', component: FornecedorComponent, canActivate: [OauthGuard, LogisticaGuard] },
    { path: 'fornecedor-produto', component: FornecedorProdutoComponent, canActivate: [OauthGuard, LogisticaGuard] },
    { path: 'posto', component: PostoCombustivelComponent, canActivate: [OauthGuard, LogisticaGuard] },
    { path: 'tipo-item', component: TipoItemComponent, canActivate: [OauthGuard, LogisticaGuard] },
    { path: 'produto', component: ProdutoComponent, canActivate: [OauthGuard, LogisticaGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CadastroGeralRoutes {}
