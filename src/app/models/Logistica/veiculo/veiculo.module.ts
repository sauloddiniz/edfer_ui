import { ConsultaDiariaComponent } from './diaria-veiculo/consulta-diaria/consulta-diaria.component';

import { ConsultaManutencaoComponent } from './manutencao-veiculo/consulta-manutencao/consulta-manutencao.component';
import { CadastroManutencaoComponent } from './manutencao-veiculo/cadastro-manutencao/cadastro-manutencao.component';
import { CadastroAbastecimentoComponent } from './abastecimento-veiculo/cadastro-abastecimento/cadastro-abastecimento.component';
import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { ReactiveFormsModule } from '@angular/forms';
import { CadastroVeiculoComponent } from './cadastro-veiculo/cadastro-veiculo.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaVeiculoComponent } from './consulta-veiculo/consulta-veiculo.component';
import { ButtonModule } from 'primeng/components/button/button';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import {
    CategoriaVeiculoService,
    FabricantePneuService,
    FornecedorService,
    HabilitacaoService,
    PostoService,
    ProdutoService,
    TipoCombustivelService,
    ManutencaoService
} from 'src/app/services';
import { ListboxModule } from 'primeng/listbox';
import { ConsultaAbastecimentoComponent } from './abastecimento-veiculo/consulta-abastecimento/consulta-abastecimento.component';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { KeyFilterModule } from 'primeng/components/keyfilter/keyfilter';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { SidebarModule } from 'primeng/components/sidebar/sidebar';
import { PaginatorModule } from 'primeng/paginator';
import { CadastroPneuComponent } from './pneu-veiculo/cadastro-pneu/cadastro-pneu.component';
import { ConsultaPneuComponent } from './pneu-veiculo/consulta-pneu/consulta-pneu.component';
import { DialogModule } from 'primeng/dialog';
import { CadastroDiariaComponent } from './diaria-veiculo/cadastro-diaria/cadastro-diaria.component';
import { DateMomentPipe } from 'src/app/pipes/dateMoment.pipe';
import { VeiculoRoutes } from './veiculo.routing';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ToastModule } from 'primeng/toast';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { MultiSelectModule } from 'primeng/components/multiselect/multiselect';
import { RoundPipe } from 'src/app/pipes/round.pipe';
import { ValorBrPipe } from 'src/app/pipes/valorBr.pipe';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/components/common/api';
import { FirstUpLeftOverDownPipe } from 'src/app/pipes/firstUpLeftOverDown.pipe';
import { PosicaoPneuPipe } from 'src/app/pipes/posicaoPneu.pipe';
import { ChipsModule } from 'primeng/components/chips/chips';
import { HourLogPipe } from 'src/app/pipes/hourLog.pipe';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ContextMenuModule } from 'primeng/contextmenu';

@NgModule({
    imports: [
        VeiculoRoutes,
        CommonModule,
        ReactiveFormsModule,
        ButtonModule,
        InputMaskModule,
        InputTextModule,
        DropdownModule,
        ListboxModule,
        ButtonModule,
        CalendarModule,
        InputTextareaModule,
        KeyFilterModule,
        RadioButtonModule,
        TableModule,
        TooltipModule,
        SidebarModule,
        PaginatorModule,
        DialogModule,
        AutoCompleteModule,
        ToastModule,
        CurrencyMaskModule,
        MultiSelectModule,
        ConfirmDialogModule,
        ChipsModule,
        InputSwitchModule,
        ContextMenuModule,
    ],
    declarations: [
        CadastroVeiculoComponent,
        ConsultaVeiculoComponent,
        CadastroAbastecimentoComponent,
        ConsultaAbastecimentoComponent,
        CadastroManutencaoComponent,
        ConsultaManutencaoComponent,
        CadastroPneuComponent,
        ConsultaPneuComponent,
        CadastroDiariaComponent,
        ConsultaDiariaComponent,

        DateMomentPipe,
        FirstUpLeftOverDownPipe,
        PosicaoPneuPipe,
        RoundPipe,
        ValorBrPipe,
        HourLogPipe
    ],
    providers: [
        CategoriaVeiculoService,
        FabricantePneuService,
        FornecedorService,
        HabilitacaoService,
        PostoService,
        ProdutoService,
        TipoCombustivelService,
        ManutencaoService,
        ConfirmationService,
    ]
})
export class VeiculoModule { }
