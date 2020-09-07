import { FabricantePneuService } from './../../../../../services/cadastro-geral/fabricantePneu.service';
import { FormGroup, FormControl } from '@angular/forms';
import { PneuService, VeiculoService } from 'src/app/services';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, SelectItem } from 'primeng/components/common/api';
import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/primeng';
import { Table } from 'primeng/table';
@Component({
    selector: 'app-consulta-pneu',
    templateUrl: './consulta-pneu.component.html',
    styleUrls: ['./consulta-pneu.component.css'],
    styles: [
        `
            .pneu-inativo {
                background-color: #1ca979 !important;
                color: #ffffff !important;
            }
        `
    ]
})
export class ConsultaPneuComponent implements OnInit {
    @ViewChild('dt1', { static: true }) dt1: Table;
    listPneus: any[];
    totalRecords: number;

    sideBarTableHistorico: boolean;
    dialogFormHistorico: boolean;

    sideBarTableEstado: boolean;
    dialogFormEstado: boolean;

    dialogFormUpdate: boolean;

    cols: any[];
    historicoPneu: any[];
    estadosPneu: any[];
    posicoes: any[];
    selectedPneu: any;
    pneuSelect: any;
    veiculos: any[];
    eixos: any[];
    cms: MenuItem[];

    historicoPneuForm: FormGroup;
    estadoPneuForm: FormGroup;
    pneuVinculoForm: FormGroup;

    estados: any[];
    ptBr: any;

    listVeiculos: any[];
    listFabricante: any[];

    listEstado: SelectItem[] = [
        { label: 'Novo', value: 'NOVO' },
        { label: 'Usado', value: 'USADO' },
        { label: 'Reformado', value: 'REFORMADO' }
    ];

    estepe: SelectItem[] = [
        { label: 'Selecione', value: null },
        { label: 'Sim', value: 'SIM' }
    ];

    atividades: SelectItem[] = [
        { label: 'Selecione', value: null },
        { label: 'Ativo', value: 'ATIVO' },
        { label: 'Inativo', value: 'INATIVO' }
    ];

    constructor(
        private pneuService: PneuService,
        private veiculoService: VeiculoService,
        private fabricantePneuService: FabricantePneuService,
        private router: Router,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.pneuVinculoForm = new FormGroup({
            idPneu: new FormControl(null),
            numeroEixo: new FormControl(null),
            posicao: new FormControl(null),
            veiculo: new FormGroup({
                idVeiculo: new FormControl(null)
            })
        });

        this.historicoPneuForm = new FormGroup({
            idHistorico: new FormControl(),
            pneu: new FormGroup({
                idPneu: new FormControl(null)
            }),
            placa: new FormControl(null),
            dataHistorico: new FormControl(new Date().toLocaleDateString()),
            numeroEixo: new FormControl(null),
            posicao: new FormControl(null),
            servico: new FormControl(null),
            kmServico: new FormControl(null),
            valorServico: new FormControl(null)
        });

        this.estadoPneuForm = new FormGroup({
            idEstado: new FormControl(null),
            pneu: new FormGroup({
                idPneu: new FormControl(null)
            }),
            estado: new FormControl(null),
            dataReforma: new FormControl(new Date().toLocaleDateString()),
        });

        this.getListVeiculos();
        this.addEstadoPneu();
        this.addCalenderPtBr();
        this.createListVeiculo();
        this.addListaFabricante();
        this.createCms();
    }

    private createCms() {
        this.cms = [
            {
                label: 'Vincular veículo',
                icon: 'fa fas fa-truck',
                command: event => this.veicularVeiculo(this.selectedPneu)
            },
            {
                label: 'Remover vinculo',
                icon: 'fa fas fa-times',
                command: event => this.removerVinculo(this.selectedPneu)
            }
        ];
    }

    veicularVeiculo(pneu: any) {
        if (pneu.veiculo == null) {
            this.dialogFormUpdate = true;
        }

        if (pneu.veiculo) {
            this.confirmationService.confirm({
                message: 'Pneu já vinculado, deseja alterar?',
                header: 'Confirmação',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.dialogFormUpdate = true;
                },
                reject: () => {}
            });
        }
    }

    removerVinculo(pneu: any) {
        if (pneu.veiculo == null) {
            this.messageService.add({
                severity: 'info',
                summary: 'Informação',
                detail: 'Não existe vinculo'
            });
        } else {
            this.confirmationService.confirm({
                message: 'Deseja remover vinculo?',
                header: 'Confirmação',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.selectedPneu.veiculo = null;
                    this.selectedPneu.numeroEixo = null;
                    this.selectedPneu.posicao = null;
                    this.pneuService
                        .updatePneuById(this.selectedPneu)
                        .subscribe(
                            onSuccess => {
                                this.dt1._filter();
                                this.messageService.add({
                                    severity: 'info',
                                    summary: 'Informação',
                                    detail: 'Vinculo removido'
                                });
                            },
                            onErr => {}
                        );
                },
                reject: () => {}
            });
        }
    }

    private getListVeiculos() {
        this.veiculos = [];
        this.veiculoService.getVeiculos().subscribe(
            (veiculos: any[]) => {
                veiculos.forEach(veiculo =>
                    this.veiculos.push({
                        label: veiculo.modelo + ' - ' + veiculo.placa,
                        value: veiculo.idVeiculo
                    })
                );
            },
            onErr => console.log(onErr)
        );
    }

    loadPneuLazy(event: any) {
        let veiculos = '';
        if (event.filters.veiculos) {
            veiculos = event.filters.veiculos.value;
        }

        let codControleEdfer = '';
        if (event.filters.codControleEdfer) {
            codControleEdfer = event.filters.codControleEdfer.value;
        }

        let kmMin = '';
        if (event.filters.kmMin) {
            kmMin = event.filters.kmMin.value;
        }

        let kmMax = '';
        if (event.filters.kmMax) {
            kmMax = event.filters.kmMax.value;
        }

        let compraPneuDateMin = '';
        if (event.filters.compraPneuDateMin) {
            compraPneuDateMin = event.filters.compraPneuDateMin.value;
        }

        let compraPneuDateMax = '';
        if (event.filters.compraPneuDateMax) {
            compraPneuDateMax = event.filters.compraPneuDateMax.value;
        }

        let caracteristicas = '';
        if (event.filters.caracteristicas) {
            caracteristicas = event.filters.caracteristicas.value;
        }

        let fabricantePneu = '';
        if (event.filters.fabricantePneu) {
            fabricantePneu = event.filters.fabricantePneu.value;
        }

        let numSerie = '';
        if (event.filters.numSerie) {
            numSerie = event.filters.numSerie.value;
        }

        let estadoAtual = '';
        if (event.filters.estadoAtual) {
            estadoAtual = event.filters.estadoAtual.value;
        }

        let numNotaOuNumOrdem = '';
        if (event.filters.numNotaOuNumOrdem) {
            numNotaOuNumOrdem = event.filters.numNotaOuNumOrdem.value;
        }

        let estepe = '';
        if (event.filters.estepe) {
            estepe = event.filters.estepe.value;
        }

        let ativo = '';
        if (event.filters.ativo) {
            ativo = event.filters.ativo.value;
        }

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

        this.pneuService
            .getByCriteria(
                sortField,
                sortOrder,
                first,
                rows,
                veiculos,
                codControleEdfer,
                kmMin,
                kmMax,
                compraPneuDateMin,
                compraPneuDateMax,
                caracteristicas,
                fabricantePneu,
                numSerie,
                estadoAtual,
                numNotaOuNumOrdem,
                estepe,
                ativo
            )
            .subscribe(
                (filterDTO: any) => {
                    console.log(filterDTO);
                    this.listPneus = filterDTO.objs;
                    this.totalRecords = filterDTO.totalList;
                },
                onErr => {}
            );
    }

    private addListaFabricante() {
        this.listFabricante = [];
        this.fabricantePneuService
            .getFabricantes()
            .subscribe((fabricantesPneus: any[]) => {
                fabricantesPneus.forEach(fabricante =>
                    this.listFabricante.push({
                        label: fabricante.nome,
                        value: fabricante.idFabricante
                    })
                );
            });
    }

    private addEstadoPneu() {
        this.estados = [
            { label: 'USADO', value: 1 },
            { label: 'REFORMADO', value: 2 }
        ];
    }

    private addPosicoesEixo() {
        this.posicoes = [
            { label: 'Esquerdo', value: 'Esquerdo' },
            { label: 'Direito', value: 'Direito' },
            { label: 'Esquerdo Dentro', value: 'Esquerdo Dentro' },
            { label: 'Esquerdo Fora', value: 'Esquerdo Fora' },
            { label: 'Direito Dentro', value: 'Direito Dentro' },
            { label: 'Direito Fora', value: 'Direito Fora' },
            { label: 'Estepe', value: 'Estepe' }
        ];
    }

    private addPosicoesEixoVeiculoPequeno() {
        this.posicoes = [
            { label: 'Esquerdo', value: 'Esquerdo' },
            { label: 'Direito', value: 'Direito' }
        ];
    }

    private addPosicoesEixoMoto() {
        this.posicoes = [
            { label: 'Dianteiro', value: 'Dianteiro' },
            { label: 'Traseiro', value: 'Traseiro' }
        ];
    }

    alterarAtividade(idPneu: number, ativo: boolean) {
        this.pneuService.alterarEstado(idPneu, ativo).subscribe(
            onSuccess => {
                console.log(onSuccess);
            },
            onErr => {
                return console.log(onErr);
            }
        );
    }

    getHistorico(pneu: any) {
        this.pneuSelect = pneu;
        this.createCols();
        this.addListPneuById(pneu.idPneu);
    }

    private createCols() {
        this.cols = [
            { field: 'data', header: 'Data' },
            { field: 'veiculo', header: 'Veiculo' },
            { field: 'eixo', header: 'Nº Eixo' },
            { field: 'posicao', header: 'Posição' },
            { field: 'estado', header: 'Estado' },
            { field: 'servico', header: 'Servico' },
            { field: 'km', header: 'KM' },
            { field: 'valor', header: 'Valor' }
        ];
    }

    private addListPneuById(idPneu: number) {
        this.historicoPneu = [];
        this.pneuService.getHistorico(idPneu).subscribe(
            (historicos: any[]) => {
                this.historicoPneu = historicos;
            },
            onErr => console.log(onErr)
        );
    }

    getEstados(pneu: any) {
        this.estadosPneu = [];
        this.pneuSelect = pneu;

        this.pneuService.getEstados(pneu.idPneu).subscribe(
            (estados: any[]) => {
                console.log(estados);
                estados.forEach(estado =>
                    this.estadosPneu.push({
                        idEstadoPneu: estado.idEstadoPneu,
                        estado: estado.estado,
                        dataReforma: estado.dataReforma,
                        kmFinal: estado.kmFinal,
                    })
                );
            },
            onErr => console.log(onErr)
        );
    }

    onSubmitVinculo() {
        const pneu = this.pneuVinculoForm.value;
        this.selectedPneu.veiculo = pneu.veiculo;
        this.selectedPneu.numeroEixo = pneu.numeroEixo;
        this.selectedPneu.posicao = pneu.posicao;
        this.pneuService.updatePneuById(this.selectedPneu).subscribe(
            onSucess => {
                this.selectedPneu = null;
                this.pneuVinculoForm.reset();
                this.dt1._filter();
                this.dialogFormUpdate = false;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Atualizado'
                });
            },
            onErr => {
                console.log(onErr);
            }
        );
    }

    onSubmitHistorico() {
        const historico = this.historicoPneuForm.value;
        if (historico) {
            this.pneuService.salvarHistorico(historico.pneu.idPneu, historico).subscribe(
                onSuccess => {
                    if (historico.idHistorico) {
                        this.messageService.add({severity: 'success', summary: 'Atualizado', detail: 'com sucesso'});
                    } else {
                        this.messageService.add({severity: 'success', summary: 'Salvo', detail: 'com sucesso'});
                    }
                    this.addListPneuById(historico.pneu.idPneu);
                    this.historicoPneuForm.reset();
                    this.dialogFormHistorico = false;
                },
                onErr => {
                    console.log(onErr);
                }
            );
        }
    }

    onSubmitEstado() {
        const estado: any = this.estadosPneu[0];
        if (this.pneuSelect) {
            this.pneuService.updateKmFinal(this.pneuSelect.idPneu, estado.idEstadoPneu, estado)
            .subscribe(
                onSuccess => {
                    console.log(this.estadoPneuForm.value);
                    this.pneuService
                    .salvarEstado(this.pneuSelect.idPneu, this.estadoPneuForm.value)
                    .subscribe(
                        onSuccess => {
                            this.getEstados(this.pneuSelect);
                            this.estadoPneuForm.reset();
                            this.dialogFormEstado = false;
                        },
                        onErr => {}
                        );
                    },
                onErr => {
                    console.log(onErr);
                }
            );
        }
    }

    onChangeVeiculo(idVeiculo: any) {
        this.eixos = [];
        this.posicoes = [];

        this.veiculoService.getEixos(idVeiculo).subscribe(
            (veiculo: any) => {
                if (veiculo.categoria.nome === 'MOTO') {
                    this.addPosicoesEixoMoto();
                }
                if (
                    veiculo.categoria.nome === 'ALTOMOVEL' ||
                    veiculo.categoria.nome === 'VAN'
                ) {
                    this.addPosicoesEixoVeiculoPequeno();
                } else {
                    this.addPosicoesEixo();
                }
                for (let i = 1; i <= veiculo.numTotalDeEixos; i++) {
                    this.eixos.push({ label: i, value: i });
                }
                console.log(this.eixos);
            },
            onErr => console.log(onErr)
        );
    }

    onChangePneu(pneu: any) {
        if (pneu.idPneu !== undefined) {
            this.confirmationService.confirm({
                message: 'Deseja alterar o produto?',
                header: 'Atualização',
                accept: () => {
                    this.router.navigate(['/veiculo/pneu', pneu.idPneu]);
                }
            });
        }
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

    onChangeHistorico(historico: any) {
        if (historico) {
            this.confirmationService.confirm({
                message: 'Deseja alterar o historico?',
                header: 'Confirmação',
                accept: () => {
                    this.historicoPneuForm.reset();
                    this.dialogFormHistorico = true;
                    this.historicoPneuForm.patchValue({
                        idHistorico: historico.idHistorico,
                        placa: historico.placa,
                        dataHistorico: historico.dataHistorico,
                        numeroEixo: historico.numeroEixo,
                        posicao: historico.posicao,
                        servico: historico.servico,
                        kmServico: historico.kmServico,
                        valorServico: historico.valorServico,
                        pneu: {
                            idPneu: this.pneuSelect.idPneu
                        }
                    });
                },
                reject: () => {
                    this.historicoPneuForm.reset();
                }
            });
        }
    }

    createHistorico() {
        if (!this.pneuSelect.veiculo) {
            this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Pneu não vinculado'});
        } else {
            this.dialogFormHistorico = true;
            this.historicoPneuForm.patchValue({
                pneu: this.pneuSelect,
                placa: this.pneuSelect.veiculo.placa,
                numeroEixo: this.pneuSelect.numeroEixo,
                posicao: this.pneuSelect.posicao,
            });
        }
    }

    onCleanHistorico() {
        this.historicoPneu = null;
        this.historicoPneuForm.reset();
        this.pneuSelect = undefined;
    }

    onRemoveHistorico(historico: any, rowIndex: number) {
        if (historico !== undefined) {
            this.confirmationService.confirm({
                message: 'Deseja deletar o historico?',
                header: 'Atualização',
                accept: () => {
                    this.pneuService
                        .deleteHistoricoById(
                            historico.idHistorico,
                            historico.pneu.idPneu
                        )
                        .subscribe(onSucces => {}, onErr => {});
                    this.historicoPneu.splice(rowIndex, 1);
                    this.messageService.add({severity: 'success', summary: 'Apagado', detail: 'com sucesso'});
                },
                reject: () => {}
            });
        }
    }

    private createListVeiculo() {
        this.veiculoService.getVeiculos().subscribe(
            (veiculos: any[]) => {
                this.listVeiculos = [{label: `Nenhum 'Não acc combinação'`, value: 0}];
                veiculos.forEach(veiculo =>
                    this.listVeiculos.push({
                        label: veiculo.placa,
                        value: veiculo.idVeiculo
                    })
                );
            },
            onErr => console.log(onErr)
        );
    }
}
