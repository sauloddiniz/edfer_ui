import { CadastroComponent } from './cadastro/cadastro.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaturamentoRoutes } from './faturamento.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    FaturamentoRoutes,
    ReactiveFormsModule,
    InputTextModule,
    InputMaskModule,
    ButtonModule,
    ToastModule
  ],
  declarations: [CadastroComponent],
  providers: [MessageService]
})

export class FaturamentoModule {}
