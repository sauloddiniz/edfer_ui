import { Table } from 'primeng/table';
import { SelectItem, ConfirmationService, MessageService } from 'primeng/primeng';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbastecimentoService, VeiculoService, PostoService } from 'src/app/services';
import { Router } from '@angular/router';

@Component({
    selector: 'app-consulta-abastecimento',
    templateUrl: './consulta-abastecimento.component.html',
    styleUrls: ['./consulta-abastecimento.component.css']
})
export class ConsultaAbastecimentoComponent implements OnInit {

    @ViewChild('dt1', { static: true }) dt1: Table;
    cols: any[];
    totalRecords: number;
    valorTotalSomaCombustivel: number;
    abastecimentos: any[];
    listVeiculos: SelectItem[];
    listPosto: SelectItem[];
    listaTipoCombustivel: SelectItem[];
    loading: boolean;
    mediaTotalAbastecimento: number;

    constructor(private abastecimentoService: AbastecimentoService,
                private veiculoService: VeiculoService,
                private postoService: PostoService,
                private router: Router,
                private confirmationService: ConfirmationService,
                private messageService: MessageService) {}

    ngOnInit() {
        this.loading = true;
        this.cols = [
            { field: 'veiculo', header: 'Veiculo' },
            { field: 'dataAbastecimento', header: 'Data' },
            { field: 'posto', header: 'Posto' },
            { field: 'tipoCombustivel', header: 'Tipo Comb'},
            { field: 'hodometro', header: 'Hodômetro' },
            { field: 'quantidadeLitro', header: 'Litros' },
            { field: 'valorLitro', header: 'Valor' },
            { field: 'valorTotal', header: 'Valor Total' },
            { field: 'consumoMedio', header: 'Consumo médio' }
        ];

        this.createListVeiculo();
        this.createListPosto();
        this.createListTipoCombustivel();
    }

    private createListVeiculo() {
        this.veiculoService.getVeiculos().subscribe(
            (veiculos: any[]) => {
                this.listVeiculos = [];
                veiculos.forEach(
                    veiculo => this.listVeiculos.push(
                        {label: veiculo.placa, value: veiculo.idVeiculo}
                    ));
            },
            onErr => console.log(onErr)
        );
    }

    private createListPosto() {
        this.postoService.getPostos().subscribe(
            (postos: any[]) => {
                this.listPosto = [];
                postos.forEach(posto => {
                    this.listPosto.push(
                        {label: posto.nome, value: posto.idPosto}
                    );
                });
            }
        );
    }

    private createListTipoCombustivel() {
        this.listaTipoCombustivel = [
            {label: 'Gasolina Comum', value: 'GASOLINA_COMUM'},
            {label: 'Gasolina Aditivada', value: 'GASOLINA_ADITIVADA'},
            {label: 'Gasolina Premium', value: 'GASOLINA_PREMIUM'},
            {label: 'Gasolina Formulada', value: 'GASOLINA_FORMULADA'},
            {label: 'Etanol', value: 'ETANOL'},
            {label: 'Etanol Aditivado', value: 'ETANOL_ADITIVADO'},
            {label: 'GNV', value: 'GNV'},
            {label: 'Diesel', value: 'DIESEL'},
            {label: 'Diesel S10', value: 'DIESEL_S10'},
            {label: 'Diesel Aditivado', value: 'DIESEL_ADITIVADO'},
            {label: 'Diesel Premiun', value: 'DIESEL_PREMIUM'}
        ];
    }

    loadAbastecimentoLazy(event) {

        this.loading = true;

        let idAbastecimento = '';
        let veiculos = '';
        let abastecimentoDateMin = '';
        let abastecimentoDateMax = '';
        let postos = '';
        let tipoCombustivel = '';
        let sortField: string;
        let sortOrder: string;
        const first = event.first;
        const rows = event.rows;

        if (event.sortField === undefined) {
            sortField = '';
            sortOrder = '';
        } else {
            sortField = event.sortField;
            sortOrder = event.sortOrder;
        }

        if (event.filters.idAbastecimento) {
            idAbastecimento = event.filters.idAbastecimento.value;
        }

        if (event.filters.veiculos) {
            veiculos = event.filters.veiculos.value;
        }

        if (event.filters.abastecimentoDateMin) {
            abastecimentoDateMin = event.filters.abastecimentoDateMin.value;
        }

        if (event.filters.abastecimentoDateMax) {
            abastecimentoDateMax = event.filters.abastecimentoDateMax.value;
        }

        if (event.filters.postos) {
            postos = event.filters.postos.value;
        }

        if (event.filters.tipoCombustivel) {
            tipoCombustivel = event.filters.tipoCombustivel.value;
        }

        this.abastecimentoService.getByCriteria(
            rows,
            first,
            sortField,
            sortOrder,
            idAbastecimento,
            veiculos,
            abastecimentoDateMin,
            abastecimentoDateMax,
            postos,
            tipoCombustivel
            ).subscribe(
            (onSuccess: any) => {
                this.abastecimentos = [];
                this.mediaTotalAbastecimento = 0;
                this.valorTotalSomaCombustivel = 0;
                this.totalRecords = onSuccess.totalList;
                (onSuccess.objs).forEach(abastecimento => {
                    this.valorTotalSomaCombustivel = (this.valorTotalSomaCombustivel + abastecimento.valorTotal);
                    this.mediaTotalAbastecimento += abastecimento.consumoMedio;
                    this.abastecimentos.push(abastecimento);
                });
                this.loading = false;
            },
            onErr => {console.log(onErr); }
        );
    }

    onChangeAbastecimento(rowData: any) {
        this.confirmationService.confirm({
            message: 'Deseja realmente fazer alteração ?',
            accept: () => {
                this.router.navigate(['/veiculo/abastecimento', rowData.idAbastecimento]);
            }
        });
    }

    onRemoveAbastecimento(rowData: any) {
        this.confirmationService.confirm({
            message: 'Deseja realmente remover ?',
            accept: () => {
                this.abastecimentoService.removeById(rowData.idAbastecimento).subscribe(
                    onSuccess => {
                        this.dt1._filter();
                        this.messageService.add({severity: 'success', summary: 'Deletado com sucesso', detail: ''});
                    },
                    onErr => {}
                );
            }
        });
    }

    onUpdateConsumo(rowData: any) {
        if (rowData) {
            this.abastecimentoService.updateConsumo(rowData).subscribe(
                onSuccess => {
                    this.dt1._filter();
                    this.messageService.add({severity: 'info', summary: 'Atualizado com sucesso', detail: ''});
                },
                onErr => {
                    this.messageService.add({severity: 'error', summary: 'Erro', detail: 'pode não exister lançamento com data superior'});
                }
            );
        }
    }
}
