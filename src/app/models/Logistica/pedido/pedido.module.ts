
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoComponent } from './pedido.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { ButtonModule } from 'primeng/components/button/button';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { TableModule } from 'primeng/components/table/table';
import { InputTextareaModule } from 'primeng/components/inputtextarea/inputtextarea';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { AutoCompleteModule } from 'primeng/components/autocomplete/autocomplete';
import { PedidoService } from 'src/app/services';
import { DropdownModule } from 'primeng/dropdown';
import { KeyFilterModule } from 'primeng/components/keyfilter/keyfilter';
import { MessagesModule } from 'primeng/components/messages/messages';
import { MessageService } from 'primeng/components/common/api';
import { MultiSelectModule } from 'primeng/components/multiselect/multiselect';
import { ToastModule } from 'primeng/components/toast/toast';
import { PedidoPipe } from 'src/app/pipes/pedido.pipe';
import { TooltipModule } from 'primeng/tooltip';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputMaskModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    CalendarModule,
    AutoCompleteModule,
    DropdownModule,
    TableModule,
    KeyFilterModule,
    MessagesModule,
    MultiSelectModule,
    ToastModule,
    TooltipModule
  ],
  declarations: [PedidoComponent, PedidoPipe],
  providers: [PedidoService, MessageService]
})
export class PedidoModule { }
