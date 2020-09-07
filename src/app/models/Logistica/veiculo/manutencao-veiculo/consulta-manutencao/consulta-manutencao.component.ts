
import { SelectItem, ConfirmationService, MessageService } from 'primeng/components/common/api';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ManutencaoService, VeiculoService } from 'src/app/services';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';

@Component({
    selector: 'app-consulta-manutencao',
    templateUrl: './consulta-manutencao.component.html',
    styleUrls: ['./consulta-manutencao.component.css']
})

export class ConsultaManutencaoComponent implements OnInit {

    @ViewChild('dt1', { static: true }) dt1: Table;
    loading: boolean;
    manutencoes: any[];
    listTipoManutencao: SelectItem[];
    listTipoServico: SelectItem[];
    listVeiculos: SelectItem[];
    listTipoNota: SelectItem[];

    totalRecords: number;
    cols: any;
    valorTotalManutencao: number;

    constructor(
        private manutencaoService: ManutencaoService,
        private veiculoService: VeiculoService,
        private confirmationService: ConfirmationService,
        private router: Router,
        private messageService: MessageService
    ) {}

    ngOnInit() {

        this.loading = true;

        this.cols = [
            { field: 'veiculo', header: 'Veiculo' },
            { field: 'dataManutencao', header: 'Data' },
            { field: 'tipoManutencao', header: 'Tipo' },
            { field: 'tipoServico', header: 'Servico' },
            { field: 'numNotaOuNumOrdem', header: 'Nº Nota' },
            { field: 'valorManutencao', header: 'Valor' },
            { field: 'validadeHodometro', header: 'Vencimento Hodômetro' },
            { field: 'validadeManutencao', header: 'Vencimento Data' },
        ];

        this.createListVeiculo();
        this.createListTipoManutencao();
        this.createListTipoNota();

        this.manutencaoService.getAllServicos().subscribe(
            (servicos: string[]) => {
                this.listTipoServico = [];
                for (const servico of servicos) {
                    this.listTipoServico.push({label: servico, value: servico});
                }
            }
        );
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

    private createListTipoManutencao() {
        this.listTipoManutencao = [];
        this.listTipoManutencao = [
            { label: 'Preventiva', value: 'PREVENTIVA'},
            { label: 'Corretiva', value: 'CORRETIVA'},
        ];
    }

    private createListTipoNota() {
        this.listTipoNota = [];
        this.listTipoNota = [
            {label: 'Nota Fiscal', value: 'NOTA_FISCAL'},
            {label: 'Nota de ordem', value: 'NOTA_DE_ORDEM'}
        ];
    }

    onChangeManutencao(rowData: any) {
        this.confirmationService.confirm({
            message: 'Deseja realmente fazer alteração ?',
            accept: () => {
                this.router.navigate(['/veiculo/manutencao', rowData.idManutencao]);
            }
        });
    }

    onRemoveManutencao(rowData: any) {
        this.confirmationService.confirm({
            message: 'Deseja realmente remover ?',
            accept: () => {
                this.manutencaoService.removeById(rowData.idManutencao).subscribe(
                    onSuccess => {
                        this.dt1._filter();
                        this.messageService.add({severity: 'success', summary: 'Deletado com sucesso', detail: ''});
                    },
                    onErr => {}
                );
            }
        });
    }

    loadManutencaoLazy(event: any) {

        this.loading = true;

        let idManutencao = '';
        let tipoManutencao = '';
        let tipoServico = '';
        let valorMin = '';
        let valorMax = '';
        let tipoNota = '';
        let validHodometroMin = '';
        let validHodometroMax = '';
        let validManutencaoDateMin = '';
        let validManutencaoDateMax = '';
        let fornecedor = '';
        let numNotaOuNumOrdem = '';
        let veiculos = '';

        let sortField: string;
        let sortOrder: string;
        const first = event.first;
        const rows = event.rows;

        if (event.filters.idManutencao) {
            idManutencao = event.filters.idManutencao.value;
        }

        if (event.filters.tipoManutencao) {
            tipoManutencao = event.filters.tipoManutencao.value;
        }

        if (event.filters.tipoServico) {
            tipoServico = event.filters.tipoServico.value;
        }

        if (event.filters.valorMin) {
            valorMin = (event.filters.valorMin.value).replace(',', '.');
        }

        if (event.filters.valorMax) {
            valorMax = (event.filters.valorMax.value).replace(',', '.');
        }

        if (event.filters.tipoNota) {
            tipoNota = event.filters.tipoNota.value;
        }

        if (event.filters.validHodometroMin) {
            validHodometroMin = event.filters.validHodometroMin.value;
        }

        if (event.filters.validHodometroMax) {
            validHodometroMax = event.filters.validHodometroMax.value;
        }

        if (event.filters.validManutencaoDateMin) {
            validManutencaoDateMin = event.filters.validManutencaoDateMin.value;
        }

        if (event.filters.validManutencaoDateMax) {
            validManutencaoDateMax = event.filters.validManutencaoDateMax.value;
        }

        if (event.filters.fornecedor) {
            fornecedor = event.filters.fornecedor.value;
        }

        if (event.filters.numNotaOuNumOrdem) {
            numNotaOuNumOrdem = event.filters.numNotaOuNumOrdem.value;
        }

        if (event.filters.veiculos) {
            veiculos = event.filters.veiculos.value;
        }

        if (event.sortField === undefined) {
            sortField = '';
            sortOrder = '';
        } else {
            sortField = event.sortField;
            sortOrder = event.sortOrder;
        }

        this.manutencaoService
            .getAllManutencaoCriteria(
                sortField,
                sortOrder,
                first,
                rows,
                idManutencao,
                tipoManutencao,
                tipoServico,
                valorMin,
                valorMax,
                tipoNota,
                validHodometroMin,
                validHodometroMax,
                validManutencaoDateMin,
                validManutencaoDateMax,
                fornecedor,
                numNotaOuNumOrdem,
                veiculos
            )
            .subscribe(
                (onSuccess: any) => {
                    console.log(onSuccess);
                    this.valorTotalManutencao = 0;
                    this.manutencoes = [];
                    this.totalRecords = onSuccess.totalList;
                    (onSuccess.objs).forEach(manutencao => {
                        this.valorTotalManutencao += manutencao.valorManutencao;
                        this.manutencoes.push(manutencao);
                    });
                    this.loading = false;
                },
                onErr => {}
            );


    }

    onItemClick(rowData: any, dt: Table) {
        this.dt1.expandedRowKeys[rowData.idManutencao] = true;
        console.log(this.dt1);
    }
}
