import { SelectItem, ConfirmationService, MessageService } from 'primeng/components/common/api';

import { Component, OnInit, ViewChild } from '@angular/core';
import { AgendaService, UsuarioService } from 'src/app/services';
import { Table } from 'primeng/table';

@Component({
    selector: 'app-agenda-consulta',
    templateUrl: './agenda-consulta.component.html',
    styleUrls: ['./agenda-consulta.component.css']
})
export class AgendaConsultaComponent implements OnInit {

    @ViewChild('tbGender', { static: true }) tbGender: Table;
    @ViewChild('dt1', { static: true }) dt1: Table;
    loading = false;
    display = false;
    agenda: any[];
    genderDate: any[];
    totalRecords: number;
    tipoCliente: SelectItem[];
    nomes: SelectItem[] = [];
    estados: SelectItem[];
    selectedColumns: any[];
    cols: { field: string; header: string; }[];
    valorTotal = 0;
    agendaAux: any;

    constructor(private agendaService: AgendaService,
        private usuarioService: UsuarioService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService) { }

    ngOnInit() {
        this.loading = true;
        this.usuarioService.listaDeUsuariosVendedores().subscribe(
            (responseSuccess: any[]) => {
                responseSuccess.forEach(
                    vendedor => this.nomes.push(
                        { label: vendedor.usuario, value: vendedor.email }
                    )
                );
            },
            responseError => {
                console.log(responseError);
            }
        );
        this.tipoCliente = [
            { label: 'Ambos', value: null },
            { label: 'Fisico', value: 0 },
            { label: 'Juridico', value: 1 },
        ];
        this.estados = [
            { label: 'Iniciando', value: 0 },
            { label: 'Em Andamento', value: 1 },
            { label: 'Vendido', value: 2 },
            { label: 'Finalizado', value: 3 },
        ];

        this.cols = [
            { field: 'idAgenda', header: 'Codigo' },
            { field: 'usuario', header: 'Usuario' },
            { field: 'cliente', header: 'Cliente' },
            { field: 'tipoCliente', header: 'Tipo' },
            { field: 'contato', header: 'Contato' },
            { field: 'orcamentoNumber', header: 'Nº Orc' },
            { field: 'valorOrcamento', header: 'Valor' },
            { field: 'telefone', header: 'Telefone' },
            { field: 'estados', header: 'Estado' },
            { field: 'dtVisita', header: 'Visita' },
            { field: 'dtRetorno', header: 'Retorno' },
            { field: 'observacao', header: 'Observação' }
        ];
        this.selectedColumns = this.cols;
    }

    historicoView(rowData: any, genderDate: any[]) {
        this.agendaAux = rowData;
        this.genderDate = genderDate;
    }

    confirmDeleteHistorico(rowData: any, index: number) {
        this.confirmationService.confirm({
            key: 'delHistorico',
            message: 'Tem certeza que deseja excluir este histórico?',
            accept: () => {
                this.agendaService.deleteHistoryById(this.agendaAux.idAgenda, rowData.idGenderDat).subscribe(
                    onSucces => {
                        this.genderDate.splice(index, 1);
                    },
                    onError => { console.log(onError); }
                );
            }
        });
    }

    confirDelete(rowData: any, index: number) {
        this.confirmationService.confirm({
            key: 'delAgenda',
            message: 'Deletar a informação e todo seu histórico?',
            accept: () => {
                this.agendaService.deleteAgendaById(rowData.idAgenda).subscribe(
                    onSuccess => {
                        this.messageService.add({key: 'toast1', severity: 'info', summary: 'Apagado com sucesso', detail: ''});
                        this.dt1._filter();
                    },
                    onErr => {console.log(onErr); }
                );
            }
        });
    }

    loadProdutos(event) {
        this.loading = true;
        let orcamentoNumber = '';
        let observacao = '';
        let idAgenda = '';
        let tipoCliente = '';
        let estados = '';
        let cliente = '';
        let visitaDe = '';
        let visitaAte = '';
        let retornoDe = '';
        let retornoAte = '';
        let valorMin = '';
        let valorMax = '';
        let nomes = '';
        let sortField: string;
        let sortOrder: string;
        const first = event.first;
        const rows = event.rows;

        if (event.filters.nome) {
            nomes = event.filters.nome.value;
        }

        if (event.filters.orcamentoNumber) {
            orcamentoNumber = event.filters.orcamentoNumber.value;
        }

        if (event.filters.valorMin) {
            valorMin = (event.filters.valorMin.value).replace(',', '.');
        }

        if (event.filters.valorMax) {
            valorMax = (event.filters.valorMax.value).replace(',', '.');
        }

        if (event.filters.observacao) {
            observacao = event.filters.observacao.value;
        }

        if (event.filters.estados) {
            estados = event.filters.estados.value;
        }

        if (event.filters.idAgenda) {
            idAgenda = event.filters.idAgenda.value;
        }

        if (event.filters.tipoCliente) {
            tipoCliente = event.filters.tipoCliente.value;
        }

        if (event.filters.cliente) {
            cliente = event.filters.cliente.value;
        }

        if (event.filters.visitaDe) {
            visitaDe = event.filters.visitaDe.value;
        }

        if (event.filters.visitaAte) {
            visitaAte = event.filters.visitaAte.value;
        }

        if (event.filters.retornoDe) {
            retornoDe = event.filters.retornoDe.value;
        }

        if (event.filters.retornoAte) {
            retornoAte = event.filters.retornoAte.value;
        }

        if (event.sortField === undefined) {
            sortField = '';
            sortOrder = '';
        } else {
            sortField = event.sortField;
            sortOrder = event.sortOrder;
        }

        // tslint:disable-next-line:max-line-length
        this.agendaService.getFilterByCriteria(first, rows, nomes, idAgenda, orcamentoNumber, estados, tipoCliente, cliente, visitaDe, visitaAte, retornoDe, retornoAte, observacao, valorMin, valorMax, sortField, sortOrder).subscribe(
            (response: any) => {
                this.valorTotal = 0;
                this.agenda = [];
                (response.objs).forEach(element => {
                    this.valorTotal = this.valorTotal + element.valorOrcamento;
                    this.agenda.push(
                        {
                            usuario: element.usuario.usuario,
                            idAgenda: element.idAgenda,
                            tipoCliente: element.tipoCliente,
                            contato: element.contato,
                            telefone: element.telefone,
                            orcamentoNumber: element.orcamentoNumber,
                            valorOrcamento: element.valorOrcamento,
                            estados: element.status,
                            cliente: element.cliente,
                            dtVisita: element.dataVisita,
                            dtRetorno: element.dataRetorno,
                            observacao: element.observacao,
                            genderDate: element.genderDate
                        }
                    );
                });
                this.totalRecords = response.totalList;
                this.loading = false;
            },
            responseError => {
                this.loading = false;
            }
        );
    }

}
