import { Table } from 'primeng/table';
import { FormControl, FormArray, FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild, OnDestroy  } from '@angular/core';
import { PedidoService } from 'src/app/services';
import { MessageService, SelectItem } from 'primeng/primeng';

@Component({
    selector: 'app-pedido',
    templateUrl: './pedido.component.html',
    styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit, OnDestroy {
    @ViewChild('dt1', { static: true }) dt1: Table;
    pedidoForm: FormGroup;
    rotas: string[];
    localizacoes: SelectItem[];
    ptBr: any;
    patios: any[];
    status: any[];
    situacaoFinal: any[];
    cols: { field: string; header: string }[];
    totalRecords: number;
    intervalValue: any;

    constructor(
        private pedidoService: PedidoService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.cols = [
            { field: 'createdDate', header: 'Data Pedido' },
            { field: 'numeroPedido', header: 'Nº Pedido' },
            { field: 'cliente', header: 'Cliente' },
            { field: 'pesoPedido', header: 'Peso' },
            { field: 'rota', header: 'Rota' },
            { field: 'localizacao', header: 'Localização' },
            { field: 'dataPrevista', header: 'Previsão de entrega' },
            { field: 'localizacaoPedido', header: 'Patio' },
            { field: 'status', header: 'Estatus' },
            { field: 'situacaoFinal', header: 'Situação' },
            { field: 'dataEntrega', header: 'Entrega Realizada' },
            { field: null, header: 'Salvar' },
            { field: null, header: 'CheckOut' }
        ];

        this.patios = [
            { label: 'Loja', value: 0 },
            { label: 'Vigas_6M', value: 1 },
            { label: 'Vigas_12M', value: 2 },
            { label: 'Chapas', value: 3 },
            { label: 'Telhas', value: 4 },
            { label: 'Oxicorte', value: 5 },
            { label: 'Miudezas', value: 6 }
        ];

        this.status = [
            { label: 'Em Andamento', value: 0 },
            { label: 'Aguardando Materiais', value: 1 },
            { label: 'Aguardando Medidas', value: 2 },
            { label: 'Saiu Para Entrega', value: 3 },
            { label: 'Entrega Cancelada', value: 4 }
        ];

        this.situacaoFinal = [
            { label: 'Entrega Realizada"', value: 0 },
            { label: 'Entrega Realizada em Atraso', value: 1 }
        ];

        this.pedidoForm = new FormGroup({
            pedidos: new FormArray([])
        });
        this.addCalenderPtBr();
        this.intervalValue = setInterval(() => {
            this.viewPedidoNull();
        }, 180000);
    }

    salvarPedido(pedido: any) {

        if (pedido.idPedido) {
            this.pedidoService.updatePedido(pedido, pedido.idPedido).subscribe(
                onSuccess => {
                    this.dt1._filter();
                    this.messageService.add({
                        key: 'toast',
                        severity: 'success',
                        summary: 'Atenção',
                        detail: 'Atualizado com sucesso'
                    });
                },
                onErr => {}
            );
        } else {
            this.pedidoService.salvarPedido(pedido).subscribe(
                onSuccess => {
                    this.dt1._filter();
                    this.messageService.add({
                        key: 'toast',
                        severity: 'success',
                        summary: 'Atenção',
                        detail: 'Salvo com sucesso'
                    });
                },
                onError => {
                    console.log(onError);
                    for (const err of onError.error) {
                        this.messageService.add({
                            key: 'toast',
                            severity: 'error',
                            summary: 'Atenção',
                            detail: err
                        });
                    }
                }
            );
        }
    }

    searchRotas(event) {
        this.pedidoService.getRotas(event.query).subscribe(
            onSuccess => {
                this.rotas = onSuccess;
            },
            onError => {}
        );
    }

    searchLocalizacao(event) {
        this.pedidoService.getLocalizacao(event.query).subscribe(
            onSuccess => {
                this.localizacoes = onSuccess;
            },
            onError => {}
        );
    }

    loadProdutos(event) {
        console.log('executou', event);

        let numeroPedido = '';
        let cliente = '';
        let rota = '';
        let localizacao = '';
        let pesoInicio = '';
        let pesoFinal = '';
        let previsaoInicio = '';
        let previsaoFinal = '';
        let status = '';
        let localizacaoPedido = '';
        let situacaoFinal = '';
        let dataCriacaoInicio = '';
        let dataCriacaoFinal = '';
        let sortField: string;
        let sortOrder: string;
        const first = event.first;
        const rows = event.rows;

        if (event.filters.numeroPedido) {
            numeroPedido = event.filters.numeroPedido.value;
        }

        if (event.filters.cliente) {
            cliente = event.filters.cliente.value;
        }

        if (event.filters.pesoInicio) {
            pesoInicio = event.filters.pesoInicio.value;
        }

        if (event.filters.pesoFinal) {
            pesoFinal = event.filters.pesoFinal.value;
        }

        if (event.filters.rota) {
            rota = event.filters.rota.value;
        }

        if (event.filters.localizacao) {
            localizacao = event.filters.localizacao.value;
        }

        if (event.filters.previsaoInicio) {
            previsaoInicio = event.filters.previsaoInicio.value;
        }

        if (event.filters.previsaoFinal) {
            previsaoFinal = event.filters.previsaoFinal.value;
        }

        if (event.filters.dataCriacaoInicio) {
            dataCriacaoInicio = event.filters.dataCriacaoInicio.value;
        }

        if (event.filters.dataCriacaoFinal) {
            dataCriacaoFinal = event.filters.dataCriacaoFinal.value;
        }

        if (event.filters.status) {
            status = event.filters.status.value;
        }

        if (event.filters.localizacaoPedido) {
            localizacaoPedido = event.filters.localizacaoPedido.value;
        }

        if (event.filters.situacaoFinal) {
            situacaoFinal = event.filters.situacaoFinal.value;
        }

        if (event.sortField === undefined) {
            sortField = '';
            sortOrder = '';
        } else {
            sortField = event.sortField;
            sortOrder = event.sortOrder;
        }

        this.pedidoService
            .getListaByCriteria(
                sortField,
                sortOrder,
                first,
                rows,
                numeroPedido,
                cliente,
                rota,
                localizacao,
                pesoInicio,
                pesoFinal,
                previsaoInicio,
                previsaoFinal,
                status,
                localizacaoPedido,
                situacaoFinal,
                dataCriacaoInicio,
                dataCriacaoFinal
            )
            .subscribe(
                (onSuccess: any) => {
                    console.log(onSuccess);
                    this.totalRecords = onSuccess.totalList;
                    this.pedidoForm.reset();
                    this.clearForm(<FormArray>this.pedidoForm.get('pedidos'));
                    onSuccess.objs.forEach(entradaPedido => {
                        (<FormArray>this.pedidoForm.get('pedidos')).push(
                            new FormGroup({
                                entradaPedido: new FormGroup({
                                    idEntradaPedido: new FormControl(
                                        entradaPedido.idEntradaPedido
                                    ),
                                    createdDate: new FormControl(
                                        entradaPedido.createdDate
                                    ),
                                    numeroPedido: new FormControl(
                                        entradaPedido.numeroPedido
                                    ),
                                    cliente: new FormControl(
                                        entradaPedido.cliente
                                    )
                                }),
                                idPedido: new FormControl(
                                    entradaPedido.pedido.idPedido
                                ),
                                pesoPedido: new FormControl(
                                    entradaPedido.pedido.pesoPedido
                                ),
                                rota: new FormControl(
                                    entradaPedido.pedido.rota
                                ),
                                localizacao: new FormControl(
                                    entradaPedido.pedido.localizacao
                                ),
                                dataPrevista: new FormControl(
                                    entradaPedido.pedido.dataPrevista
                                ),
                                status: new FormControl(
                                    entradaPedido.pedido.status
                                ),
                                dataEntrega: new FormControl(
                                    entradaPedido.pedido.dataEntrega
                                ),
                                localizacaoPedido: new FormControl(
                                    entradaPedido.pedido.localizacaoPedido
                                ),
                                situacaoFinal: new FormControl(
                                    entradaPedido.pedido.situacaoFinal
                                ),
                                checkOut: new FormControl(
                                    entradaPedido.pedido.checkOut
                                ),
                                observacao: new FormControl(
                                    entradaPedido.pedido.observacao
                                )
                            })
                        );
                    });
                },
                onError => {
                    console.log(onError);
                }
            );
    }

    ngOnDestroy(): void {
        clearInterval(this.intervalValue);
    }

    viewPedidoNull() {
        this.pedidoService.findPedidoIsNull().subscribe(
            (onSuccess: number) => {
                this.messageService.clear();
                if (onSuccess !== 0) {
                    this.messageService.add({
                        severity: 'info',
                        summary: 'Existem Pedidos Pendentes',
                        detail:
                            'Atualize a pagina, por favor {' + onSuccess + '}'
                    });
                }
            },
            onErr => {
                console.log(onErr);
            }
        );
    }

    private addCalenderPtBr() {
        this.ptBr = {
            firstDayOfWeek: 0,
            dayNames: [
                'Domingo',
                'Segunda',
                'Terça',
                'Quarta',
                'Quinta',
                'Sexta',
                'Sabádo'
            ],
            dayNamesShort: ['Dom', 'Seg', 'Terç', 'Qua', 'Qui', 'Sex', 'Sáb'],
            dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
            // tslint:disable-next-line:max-line-length
            monthNames: [
                'Janeiro',
                'Fevereiro',
                'Março',
                'Abril',
                'Maio',
                'Junho',
                'Julho',
                'Agosto',
                'Setembro',
                'Outubro',
                'Novembro',
                'Dezembro'
            ],
            monthNamesShort: [
                'Jan',
                'Fev',
                'Mar',
                'Abr',
                'Mai',
                'Jun',
                'Jul',
                'Ago',
                'Set',
                'Out',
                'Nov',
                'Dez'
            ],
            today: 'hoje',
            clear: 'limpar',
            dateFormat: 'dd/mm/yy'
        };
    }

    clearForm(formArray: FormArray) {
        while (formArray.length !== 0) {
            formArray.removeAt(0);
        }
    }

    updateList() {
        this.dt1._filter();
        this.messageService.clear();
    }
}
