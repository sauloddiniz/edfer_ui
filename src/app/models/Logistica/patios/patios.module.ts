import { CommonModule } from '@angular/common';
import { PatiosComponent } from './patio/patios.component';
import { NgModule } from '@angular/core';
import { PatioRoutes } from './patios.routing';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PedidoService } from 'src/app/services';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    PatioRoutes,
    CommonModule,
    ButtonModule,
    TableModule,
    ReactiveFormsModule
  ],
  declarations: [PatiosComponent],
  providers: [PedidoService]
})

export class PatiosModule { }
