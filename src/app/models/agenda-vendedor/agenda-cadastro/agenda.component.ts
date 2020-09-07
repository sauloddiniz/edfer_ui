import { SelectItem, ConfirmationService, MessageService } from 'primeng/primeng';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgendaService } from 'src/app/services';
import { Table } from 'primeng/table';

@Component({
    selector: 'app-agenda',
    templateUrl: './agenda.component.html',
    styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

    @ViewChild('dt1', { static: true }) dt1: Table;
    loading: boolean;
    agendaForm: FormGroup;
    status: SelectItem[];
    agenda: any[];
    ptBr: any;
    totalRecords: number;
    cols: { field: string; header: string; }[];
    tipoCliente: any[];
    estados: any[];
    valorTotal = 0;
    listaCliente: any[];
    listaContato: any[];

    constructor(private agendaService: AgendaService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService) { }

    ngOnInit() {

        this.addCalenderPtBr();
        this.createStatus();
        this.createTipoCliente();
        this.createEstado();
        this.createCols();

        this.agendaForm = new FormGroup({
            idAgenda: new FormControl(null),
            tipoCliente: new FormControl(null, Validators.required),
            cliente: new FormControl(null, Validators.required),
            contato: new FormControl(null, Validators.required),
            telefone: new FormControl(null, Validators.required),
            orcamentoNumber: new FormControl(null),
            valorOrcamento: new FormControl(null),
            dataVisita: new FormControl(new Date().toLocaleDateString(), Validators.required),
            dataRetorno: new FormControl(null),
            status: new FormControl(null, Validators.required),
            observacao: new FormControl(null, [Validators.required, Validators.maxLength(200)])
        });
    }

    private createStatus() {
        this.status = [
            { label: 'Iniciando', value: 'Iniciando' },
            { label: 'Em Andamento', value: 'Em andamento' },
            { label: 'Vendido', value: 'Vendido' },
            { label: 'Finalizado', value: 'Finalizado' }
        ];
    }

    private createTipoCliente() {
        this.tipoCliente = [
            { label: 'Ambos', value: null },
            { label: 'Fisico', value: 0 },
            { label: 'Juridico', value: 1 },
        ];
    }

    private createEstado() {
        this.estados = [
            { label: 'Iniciando', value: 0 },
            { label: 'Em Andamento', value: 1 },
            { label: 'Vendido', value: 2 },
            { label: 'Finalizado', value: 3 },
        ];
    }

    private createCols() {
        this.cols = [
            { field: 'idAgenda', header: 'Codigo' },
            { field: 'tipoCliente', header: 'Tipo' },
            { field: 'estados', header: 'Estado' },
            { field: 'cliente', header: 'Cliente' },
            { field: 'orcamentoNumber', header: 'Nº Orc' },
            { field: 'valorOrcamento', header: 'Valor' },
            { field: 'contato', header: 'Contato' },
            { field: 'dtVisita', header: 'Visita' },
            { field: 'dtRetorno', header: 'Retorno' },
            { field: 'telefone', header: 'Telefone' },
            { field: 'observacao', header: 'Observação' }
        ];
    }

    onSubmit() {
        this.loading = true;
        if (this.agendaForm.get('idAgenda').value !== null) {
            this.agendaService.atualizar(this.agendaForm.value, this.agendaForm.get('idAgenda').value).subscribe(
                sucess => {
                    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Atualizado com Sucesso' });
                    this.agendaForm.reset();
                    this.dt1._filter();
                    this.ngOnInit();
                    this.loading = false;
                },
                (resultoError: any) => {
                    for (const err of resultoError.error) {
                        this.loading = false;
                        this.messageService.add({ severity: 'error', summary: err });
                    }
                }
            );
        } else {
            this.agendaService.salvar(this.agendaForm.value).subscribe(
                codigo => {
                    this.loading = false;
                    this.agendaForm.reset();
                    this.dt1._filter();
                    this.ngOnInit();
                    this.messageService.add({ severity: 'success', summary: 'Codigo: ' + codigo, detail: 'Salvo com Sucesso' });
                },
                (resultoError: any) => {
                    for (const err of resultoError.error) {
                        this.loading = false;
                        this.messageService.add({ severity: 'error', summary: err });
                    }
                }
            );
        }
    }

    atualizar(agenda: any) {
        let tipoCliente = 1;
        if (agenda.tipoCliente === 'Fisica') {
            tipoCliente = 0;
        }
        this.confirmationService.confirm({
            message: 'Desejá realmente alterar?',
            accept: () => {
                this.agendaForm.patchValue(
                    {
                        idAgenda: agenda.idAgenda,
                        tipoCliente: tipoCliente,
                        cliente: agenda.cliente,
                        contato: agenda.contato,
                        telefone: agenda.telefone,
                        orcamentoNumber: agenda.orcamentoNumber,
                        valorOrcamento: agenda.valorOrcamento,
                        dataVisita: new Date().toLocaleDateString(),
                        dataRetorno: null,
                        status: null,
                        observacao: agenda.observacao
                    }
                );
            window.scrollTo(0, 0);
            }
        });
    }

    loadProdutos(event) {
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
        let sortField: string;
        let sortOrder: string;
        const first = event.first;
        const rows = event.rows;

        if (event.filters.observacao) {
            observacao = event.filters.observacao.value;
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
        this.agendaService.getFilterByCriteriaUser(first, rows, idAgenda, estados, orcamentoNumber, tipoCliente, cliente, visitaDe, visitaAte, retornoDe, retornoAte, observacao, valorMin, valorMax, sortField, sortOrder).subscribe(
            (response: any) => {
                this.valorTotal = 0;
                this.agenda = [];
                (response.objs).forEach(element => {
                    this.valorTotal = this.valorTotal + element.valorOrcamento;
                    this.agenda.push(
                        {
                            idAgenda: element.idAgenda,
                            tipoCliente: element.tipoCliente,
                            contato: element.contato,
                            telefone: element.telefone,
                            estados: element.status,
                            cliente: element.cliente,
                            orcamentoNumber: element.orcamentoNumber,
                            valorOrcamento: element.valorOrcamento,
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
                console.log(responseError);
                this.loading = false;
            }
        );
    }

    private addCalenderPtBr() {
        this.ptBr = {
            firstDayOfWeek: 0,
            dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabádo'],
            dayNamesShort: ['Dom', 'Seg', 'Terç', 'Qua', 'Qui', 'Sex', 'Sáb'],
            dayNamesMin: ['Dom', 'Seg', 'Terç', 'Qua', 'Qui', 'Sex', 'Sáb'],
            // tslint:disable-next-line:max-line-length
            monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            today: 'hoje',
            clear: 'limpar',
            dateFormat: 'dd/mm/yy'
        };
    }

    updateList() {
        this.dt1._filter();
    }

    searchCliente(event) {
        this.agendaService.getClientes(event.query).subscribe(
            (clientes: any[]) => {this.listaCliente = clientes; },
            onErr => {console.log(onErr); }
        );
    }

    searchContato(event) {
        this.agendaService.getContatos(event.query).subscribe(
            (contatos: any[]) => {this.listaContato = contatos; },
            onErr => {console.log(onErr); }
        );
    }
}
