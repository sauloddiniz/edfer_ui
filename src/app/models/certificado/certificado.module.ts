import { ClienteComponent } from './cliente/cliente.component';
import { DialogModule } from 'primeng/dialog';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ChipsModule } from 'primeng/components/chips/chips';
import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { CadastroComponent } from './cadastro/cadastro.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertificadoRoutes } from './certificado.routing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { Certificado_produtoComponent } from './certificado_produto/certificado_produto.component';
import { CertificadoService } from './certificado.service';
import { TooltipModule, SidebarModule, KeyFilterModule, DropdownModule, ToggleButtonModule, MultiSelectModule } from 'primeng/primeng';
import { ToastModule } from 'primeng/toast';
import { CurrencyMaskModule } from 'ng2-currency-mask';

@NgModule({
  imports: [
    CommonModule,
    CertificadoRoutes,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    AutoCompleteModule,
    TableModule,
    InputMaskModule,
    ChipsModule,
    TooltipModule,
    SidebarModule,
    ContextMenuModule,
    DialogModule,
    ToastModule,
    KeyFilterModule,
    DropdownModule,
    CurrencyMaskModule,
    ToggleButtonModule,
    MultiSelectModule
  ],
  declarations: [CadastroComponent, Certificado_produtoComponent, ClienteComponent],
  providers: [CertificadoService]
})
export class CertificadoModule { }
