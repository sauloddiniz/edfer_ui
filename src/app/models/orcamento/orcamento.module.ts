import { OrcamentoConsultaComponent } from './orcamento-consulta/orcamento-consulta.component';
import { OrcamentoLogComponent } from './orcamento-log/orcamento-log.component';
import { ButtonModule } from 'primeng/components/button/button';
import { CalendarModule } from 'primeng/calendar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { TipoServicePipe } from 'src/app/pipes/tipoService.pipe';
import { ContextMenuModule } from 'primeng/contextmenu';
import { RadioButtonModule } from 'primeng/radiobutton';


@NgModule({
  imports: [
    CommonModule,
    TableModule,
    ReactiveFormsModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    ButtonModule,
    ContextMenuModule,
    RadioButtonModule,
    DropdownModule
  ],
  declarations: [
      OrcamentoLogComponent,
      OrcamentoConsultaComponent,
      TipoServicePipe
    ]
})
export class OrcamentoModule { }
