import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule, DropdownModule, RadioButtonModule, AutoCompleteModule, KeyFilterModule, TooltipModule, ConfirmDialogModule, ConfirmationService, MultiSelectModule } from 'primeng/primeng';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroAlmoxerifadoComponent } from './cadastro-almoxerifado/cadastro-almoxerifado.component';
import { AlmoxerifadoRoutes } from './almoxerifado.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/components/table/table';
import { ToastModule } from 'primeng/toast';
import { AlmoxerifadoService } from './almoxerifado.service';
import { ListaAlmoxerifadoComponent } from './lista-almoxerifado/lista-almoxerifado.component';

@NgModule({
  imports: [
    CommonModule,
    AlmoxerifadoRoutes,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    ToastModule,
    DropdownModule,
    RadioButtonModule,
    AutoCompleteModule,
    CurrencyMaskModule,
    KeyFilterModule,
    TooltipModule,
    ConfirmDialogModule,
    MultiSelectModule,
    InputMaskModule
  ],
  declarations: [CadastroAlmoxerifadoComponent, ListaAlmoxerifadoComponent],
  providers: [AlmoxerifadoService, ConfirmationService]
})

export class AlmoxarifadoModule { }
