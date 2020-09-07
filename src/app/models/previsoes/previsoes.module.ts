
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ContextMenuModule } from 'primeng/contextmenu';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrevisaoCadastroComponent } from './previsao-cadastro/previsao-cadastro.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { KeyFilterModule, MessageService } from 'primeng/primeng';
import { PrevisaoConsultaComponent } from './previsao-consulta/previsao-consulta.component';
import { ComprasRoutes } from './compras.routing';
import { PrevisaoEntregaProdutoService, ProdutoService, FornecedorService } from 'src/app/services';

@NgModule({
  imports: [
    CommonModule,
    ComprasRoutes,
    ReactiveFormsModule,
    AutoCompleteModule,
    ButtonModule,
    CalendarModule,
    TableModule,
    DialogModule,
    InputTextModule,
    FormsModule,
    ContextMenuModule,
    TooltipModule,
    ToastModule,
    InputTextareaModule,
    KeyFilterModule,
  ],
  declarations: [PrevisaoCadastroComponent, PrevisaoConsultaComponent],
  providers: [
    MessageService,
    PrevisaoEntregaProdutoService,
    ProdutoService,
    FornecedorService
]
})
export class PrevisoesModule { }
