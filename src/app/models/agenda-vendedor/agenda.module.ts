import { MultiSelectModule } from 'primeng/components/multiselect/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from 'primeng/components/inputtextarea/inputtextarea';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AgendaConsultaComponent } from './agenda-consulta/agenda-consulta.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendaComponent } from './agenda-cadastro/agenda.component';
import { InputMaskModule,
        DropdownModule,
        ConfirmDialogModule,
        TooltipModule,
        SidebarModule,
        ProgressSpinnerModule,
        ConfirmationService,
        MessageService,
        KeyFilterModule,
        AutoCompleteModule} from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { PipeListGenderDatePipe } from 'src/app/pipes/pipeListGenderDate.pipe';
import { ToastModule } from 'primeng/components/toast/toast';
import { TipoTelefonePipe } from 'src/app/pipes/tipoTelefone.pipe';
import { AgendaRoutes } from './agenda.routing';
import { AgendaService, UsuarioService } from 'src/app/services';
import { CurrencyMaskModule } from 'ng2-currency-mask';
@NgModule({
  imports: [
    AgendaRoutes,
    CommonModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    CalendarModule,
    InputTextareaModule,
    RadioButtonModule,
    InputMaskModule,
    DropdownModule,
    TableModule,
    ConfirmDialogModule,
    TooltipModule,
    ToastModule,
    DropdownModule,
    InputMaskModule,
    MultiSelectModule,
    SidebarModule,
    ProgressSpinnerModule,
    CurrencyMaskModule,
    KeyFilterModule,
    AutoCompleteModule
  ],
  declarations: [AgendaComponent, AgendaConsultaComponent, PipeListGenderDatePipe, TipoTelefonePipe],
  providers: [ConfirmationService, AgendaService, UsuarioService, MessageService]
})
export class AgendaModule { }
