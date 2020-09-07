import { RadioButtonModule } from 'primeng/radiobutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { HabilitacaoService, SharedService } from 'src/app/services';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroMotoristaComponent } from './cadastro-motorista/cadastro-motorista.component';
import { ConsultaMotoristaComponent } from './consulta-motorista/consulta-motorista.component';
import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { ButtonModule } from 'primeng/components/button/button';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { MotoristaRoutes } from './motorista.routing';
import { MessageService } from 'primeng/api';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TooltipModule, ConfirmationService } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { ColaboradorService } from '../services';

@NgModule({
    imports: [
        MotoristaRoutes,
        CommonModule,
        ReactiveFormsModule,
        InputMaskModule,
        InputTextModule,
        ButtonModule,
        DropdownModule,
        ToastModule,
        InputSwitchModule,
        ConfirmDialogModule,
        TooltipModule,
        TableModule,
        RadioButtonModule,
        FormsModule
    ],
    declarations: [
        CadastroMotoristaComponent,
        ConsultaMotoristaComponent],
    providers: [
        HabilitacaoService,
        SharedService,
        ColaboradorService,
        MessageService,
        ConfirmationService
    ]
})
export class MotoristaModule { }
