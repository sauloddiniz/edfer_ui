import { MessageModule } from 'primeng/message';
import { UsuarioComponent } from './usuario-cadastro/usuario.component';
import { UsuarioConsultaComponent } from './usuario-consulta/usuario-consulta.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CheckboxModule } from 'primeng/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { UsuarioRoutes } from './usuario.routing';
import { MessageService, ConfirmationService } from 'primeng/primeng';
import { UsuarioService } from 'src/app/services';

@NgModule({
  imports: [
    UsuarioRoutes,
    CommonModule,
    InputSwitchModule,
    CheckboxModule,
    MessageModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    TableModule,
    ToastModule,
    TooltipModule,
    ConfirmDialogModule
  ],
  declarations: [UsuarioComponent, UsuarioConsultaComponent],
  providers: [MessageService, UsuarioService, ConfirmationService]
})
export class UsuarioModule { }
