import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { VeiculoService, ParteDiariaService } from 'src/app/services';
import { SelectItem, MessageService } from 'primeng/primeng';
import { ColaboradorService } from '../../../services';

@Component({
    selector: 'app-cadastro-diaria',
    templateUrl: './cadastro-diaria.component.html',
    styleUrls: ['./cadastro-diaria.component.css']
})
export class CadastroDiariaComponent implements OnInit {

    @ViewChild('myCalendar', {read: true, static: false}) myCalendar: any;
    display = false;
    displayDialog = false;
    diariaForm: FormGroup;
    veiculos: SelectItem[];
    listaClienteOuFornecedor: any[];
    listMotoristas: SelectItem[];
    listTipoGasto: SelectItem[];
    listAjudanes: SelectItem[];
    clienteOuFornecedor: SelectItem[];
    descricaoItem: SelectItem[];
    tipoNota: SelectItem[];
    tipoViagem: SelectItem[];
    cols: any[];
    indexDiaria = 0;
    ptBr: any;

    constructor(private veiculoService: VeiculoService,
                private diariaService: ParteDiariaService,
                private messageService: MessageService,
                private colaboradorService: ColaboradorService,
                private router: ActivatedRoute) { }

    ngOnInit() {
        const idParteDiaria: number = this.router.snapshot.params['id'];

        this.veiculos = [
            { label: 'Selecione o veículo', value: null }
        ];
        this.tipoNota = [
            { label: 'Nota fiscal', value: 'Nota fiscal' },
            { label: 'Nota de ordem', value: 'Nota de ordem' }
        ];
        this.listTipoGasto = [
            { label: 'Alimentação', value: 'Alimentação' },
            { label: 'Hospedagem', value: 'Hospedagem' },
            { label: 'Pedágio', value: 'Pedágio' },
            { label: 'Outros', value: 'Outros' }
        ];
        this.clienteOuFornecedor = [
            { label: 'Cliente', value: 'Cliente' },
            { label: 'Fornecedor', value: 'Fornecedor' },
            { label: 'Ponto de Apoio', value: 'Ponto de Apoio' },
            { label: 'Carregamento', value: 'Carregamento' }
        ];

        this.colaboradorService.listarMotoristasAtivos().subscribe(
            (onSuccess: any[]) => {
                this.listMotoristas = [
                    {label: 'Selecione', value: null}
                ];
                for (const motorista of onSuccess) {
                    this.listMotoristas.push(
                        {label: motorista.nome, value: motorista.idFuncionario}
                    );
                }
            },
            onError => {
                console.log('Error');
            }
        );

        this.colaboradorService.listarAjudantesAtivos().subscribe(
            (onSuccess: any[]) => {
                this.listAjudanes = [];
                for (const ajudante of onSuccess) {
                    this.listAjudanes.push(
                        {label: ajudante.nome, value: ajudante}
                    );
                }
            },
            onError => {
                console.log('Error');
            }
        );

        this.diariaForm = new FormGroup({
            idParteDiaria: new FormControl(),
            gastos: new FormArray([]),
            dataParteDiaria: new FormControl(new Date().toLocaleDateString(), Validators.required),
            veiculo: new FormGroup({
                idVeiculo: new FormControl(null, Validators.required)
            }),
            motorista: new FormGroup({
                idFuncionario : new FormControl(null, Validators.required)
            }),
            ajudantes: new FormControl(null),
            observacao: new FormControl(null),
            hsInicioAlmoco: new FormControl(null),
            hsFimAlmoco: new FormControl(null),
            rotaDiaria: new FormArray([
                new FormGroup({
                    idRotaDiaria: new FormControl(null),
                    nomeClienteOuFornecedor: new FormControl(null),
                    tipoClienteFornecedor: new FormControl('Cliente'),
                    notas: new FormControl(null),
                    hsInicioCargaDescargaEdfer: new FormControl(null),
                    hsFinalCargaDescargaEdfer: new FormControl(null),
                    hsSaidaParaClienteOuFornecedor: new FormControl(null),
                    hsChegadaEmClienteOuFornecedor: new FormControl(null),
                    hsInicioCargaDescargaClienteOuFornecedor: new FormControl(null),
                    hsFinalCargaDescargaClienteOuFornecedor: new FormControl(null),
                    hsSaidaDoClienteOuFornecedor: new FormControl(null),
                    hsChegada: new FormControl(null),
                    kmInicial: new FormControl(null),
                    kmFinal: new FormControl(null)
                })
            ])
        });

        this.veiculoService.getVeiculos().subscribe(
            (veiculos: any[]) => {
                veiculos.forEach(veiculo => this.veiculos.push(
                    {label: veiculo.modelo + ' - ' + veiculo.placa, value: veiculo.idVeiculo}
                ));
            }
        );
        this.addCalenderPtBr();

        if (idParteDiaria !== undefined) {
            (<FormArray>this.diariaForm.get('rotaDiaria')).removeAt(0);
            this.diariaService.getDiariaById(idParteDiaria).subscribe(
                (diaria: any) => {
                    this.diariaForm.patchValue({
                        idParteDiaria: diaria.idParteDiaria,
                        dataParteDiaria: diaria.dataParteDiaria,
                        veiculo: {
                            idVeiculo : diaria.veiculo.idVeiculo
                        },
                        motorista: {
                            idFuncionario : diaria.motorista.idFuncionario
                        },
                        ajudantes: diaria.ajudantes,
                        observacao: diaria.observacao,
                        hsInicioAlmoco: diaria.hsInicioAlmoco,
                        hsFimAlmoco: diaria.hsFimAlmoco,
                    });
                    for (const gasto of diaria.gastos) {
                        ((<FormArray>this.diariaForm.get('gastos'))).push(
                            new FormGroup({
                                idGastosDiaria: new FormControl(gasto.idGastosDiaria),
                                tipoGasto: new FormControl(gasto.tipoGasto),
                                valor: new FormControl(gasto.valor),
                                observacao: new FormControl(gasto.observacao)
                            })
                        );
                    }
                    for (const rota of diaria.rotaDiaria) {
                        (<FormArray>this.diariaForm.get('rotaDiaria')).push(
                            new FormGroup({
                                idRotaDiaria: new FormControl(rota.idRotaDiaria),
                                nomeClienteOuFornecedor: new FormControl(rota.nomeClienteOuFornecedor),
                                tipoClienteFornecedor: new FormControl(rota.tipoClienteFornecedor),
                                notas: new FormControl(rota.notas),
                                hsInicioCargaDescargaEdfer: new FormControl(rota.hsInicioCargaDescargaEdfer),
                                hsFinalCargaDescargaEdfer: new FormControl(rota.hsFinalCargaDescargaEdfer),
                                hsSaidaParaClienteOuFornecedor: new FormControl(rota.hsSaidaParaClienteOuFornecedor),
                                hsChegadaEmClienteOuFornecedor: new FormControl(rota.hsChegadaEmClienteOuFornecedor),
                                hsInicioCargaDescargaClienteOuFornecedor: new FormControl(rota.hsInicioCargaDescargaClienteOuFornecedor),
                                hsFinalCargaDescargaClienteOuFornecedor: new FormControl(rota.hsFinalCargaDescargaClienteOuFornecedor),
                                hsSaidaDoClienteOuFornecedor: new FormControl(rota.hsSaidaDoClienteOuFornecedor),
                                hsChegada: new FormControl(rota.hsChegada),
                                kmInicial: new FormControl(rota.kmInicial),
                                kmFinal: new FormControl(rota.kmFinal)
                            })
                        );
                    }
                },
                err => {
                    console.log(err);
                }
            );
        }
    }

    onSubmit() {
        const diaria = this.diariaForm.value;
        if (diaria.idParteDiaria == null) {
            this.diariaService.save(diaria).subscribe(
                onSuccess => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Salvo com sucesso',
                        detail: `Código:  ${onSuccess}`,
                        life: 60000
                    });
                    let i = (<FormArray>this.diariaForm.get('rotaDiaria').value)
                        .length;
                    while (i >= 1) {
                        (<FormArray>this.diariaForm.get('rotaDiaria')).removeAt(
                            i
                        );
                        i--;
                    }
                    this.diariaForm.reset();
                    this.ngOnInit();
                },
                (onErr: any) => {
                    console.log(onErr);
                    for (const err of onErr.error) {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Erro',
                            detail: err
                        });
                    }
                }
            );

        } else if (diaria.idParteDiaria !== null) {
            this.diariaService.updateDiaria(diaria).subscribe(
                onSuccess => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Sucesso',
                        detail: 'Salvo com sucesso'
                    });
                    let i = (<FormArray>this.diariaForm.get('rotaDiaria').value)
                        .length;
                    while (i >= 1) {
                        (<FormArray>this.diariaForm.get('rotaDiaria')).removeAt(
                            i
                        );
                        i--;
                    }
                    this.diariaForm.reset();
                    this.ngOnInit();
                },
                (onErr: any) => {
                    console.log(onErr);
                    for (const err of onErr.error) {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Erro',
                            detail: err
                        });
                    }
                }
            );
        }
    }

    addRows() {
        (<FormArray>this.diariaForm.get('rotaDiaria')).push(
            new FormGroup({
                idRotaDiaria: new FormControl(null),
                nomeClienteOuFornecedor: new FormControl(null),
                tipoClienteFornecedor: new FormControl('Cliente'),
                notas: new FormControl(null),
                hsInicioCargaDescargaEdfer: new FormControl(null),
                hsFinalCargaDescargaEdfer: new FormControl(null),
                hsSaidaParaClienteOuFornecedor: new FormControl(null),
                hsChegadaEmClienteOuFornecedor: new FormControl(null),
                hsInicioCargaDescargaClienteOuFornecedor: new FormControl(null),
                hsFinalCargaDescargaClienteOuFornecedor: new FormControl(null),
                hsSaidaDoClienteOuFornecedor: new FormControl(null),
                hsChegada: new FormControl(null),
                kmInicial: new FormControl(null),
                kmFinal: new FormControl(null)
            })
        );
    }

    removeRow(index: number) {
        if (index >= 1 && index !== null) {
            (<FormArray>this.diariaForm.get('rotaDiaria')).removeAt(index);
        }
    }

    addGasto() {
        ((<FormArray>this.diariaForm.get('gastos'))).push(
            new FormGroup({
                idGastosDiaria: new FormControl(null),
                tipoGasto: new FormControl('Alimentação', Validators.required),
                valor: new FormControl(null, Validators.required),
                observacao: new FormControl(null)
            })
        );
    }

    removeGasto(index: number) {
        if (index !== null) {
            ((<FormArray>this.diariaForm.get('gastos'))).removeAt(index);
        }
    }

    private addCalenderPtBr() {
        this.ptBr = {
            firstDayOfWeek: 0,
            dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabádo'],
            dayNamesShort: ['Dom', 'Seg', 'Terç', 'Qua', 'Qui', 'Sex', 'Sáb'],
            dayNamesMin: ['Dom', 'Seg', 'Terç', 'Qua', 'Qui', 'Sex', 'Sáb'],
            // tslint:disable-next-line:max-line-length
            monthNames: [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto' , 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            monthNamesShort: [ 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez' ],
            today: 'hoje',
            clear: 'limpar',
            dateFormat: 'dd/mm/yy'
        };
    }

    searchClienteOuFornecedor(event: any) {
        this.diariaService.getNomeClienteOuFornecedor(event.query).subscribe(
            (clienteOuFornecedor: any[]) => {this.listaClienteOuFornecedor = clienteOuFornecedor; },
            onErr => {console.log(onErr); }
        );
    }
}
