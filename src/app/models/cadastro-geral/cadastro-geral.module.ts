import { CadastroGeralRoutes } from './cadastro-geral.routing';
import { FabricantePneuComponent } from './fabricante-pneu/fabricante-pneu.component';
import { ButtonModule, TooltipModule, ConfirmDialogModule, ConfirmationService, KeyFilterModule, MessageService} from 'primeng/primeng';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { TipoItemComponent } from './tipo-item/tipo-item.component';
import { CategoriaVeiculoComponent } from './categoria-veiculo/categoria-veiculo.component';
import { FabricanteVeiculoComponent } from './fabricante-veiculo/fabricante-veiculo.component';
import { FornecedorComponent } from './fornecedor/fornecedor.component';
import { PostoCombustivelComponent } from './posto-combustivel/posto-combustivel.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/components/table/table';
import { ToastModule } from 'primeng/toast';
import { FornecedorProdutoComponent } from './fornecedor-produto/fornecedor-produto.component';
import { ProdutoComponent } from './produto/produto.component';
import { ProdutoService, FornecedorProdutoService, PrevisaoEntregaProdutoService } from 'src/app/services';


@NgModule({
  imports: [
    CadastroGeralRoutes,
    CommonModule,
    ReactiveFormsModule,
    InputMaskModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    ConfirmDialogModule,
    ToastModule,
    KeyFilterModule
  ],
  declarations: [
      PostoCombustivelComponent,
      FornecedorComponent,
      FabricanteVeiculoComponent,
      CategoriaVeiculoComponent,
      TipoItemComponent,
      FabricantePneuComponent,
      FornecedorProdutoComponent,
      ProdutoComponent
    ],
    providers: [
        ConfirmationService,
        MessageService,
        ProdutoService,
        FornecedorProdutoService,
        PrevisaoEntregaProdutoService
    ]
})
export class CadastroGeralModule { }
