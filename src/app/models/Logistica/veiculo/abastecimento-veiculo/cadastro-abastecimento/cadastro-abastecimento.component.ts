import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PostoService, VeiculoService, AbastecimentoService } from 'src/app/services';
import { MessageService, SelectItem } from 'primeng/components/common/api';

@Component({
    selector: 'app-cadastro-abastecimento',
    templateUrl: './cadastro-abastecimento.component.html',
    styleUrls: ['./cadastro-abastecimento.component.css']
})
export class CadastroAbastecimentoComponent implements OnInit {

    abastecimentoForm: FormGroup;
    veiculos: any[];
    postos: any[];
    tipoCombustivel: SelectItem[];
    ptBr: any;

    constructor(private postoService: PostoService,
                private veiculoService: VeiculoService,
                private abastecimentoService: AbastecimentoService,
                private messageService: MessageService,
                private router: ActivatedRoute) { }

    ngOnInit() {
        this.abastecimentoForm = new FormGroup({
            idAbastecimento: new FormControl(null),
            dataAbastecimento: new FormControl(null, Validators.required),
            veiculo: new FormGroup({
                idVeiculo: new FormControl(null, Validators.required)
            }),
            posto: new FormGroup({
                idPosto: new FormControl(null, Validators.required)
            }),
            hodometro: new FormControl(null, Validators.required),
            quantidadeLitro: new FormControl(null, Validators.required),
            valorLitro: new FormControl(0),
            valorTotal: new FormControl(0, Validators.required),
            tipoCombustivel: new FormControl(null)
        });

        const id = this.router.snapshot.params['id'];
        if (id !== undefined) {
            this.abastecimentoService.getAbastecimentoById(id).subscribe(
                (abastecimento: any) => {
                    this.abastecimentoForm.patchValue(
                        {
                            idAbastecimento: abastecimento.idAbastecimento,
                            dataAbastecimento: abastecimento.dataAbastecimento,
                            veiculo: {
                                idVeiculo: abastecimento.veiculo.idVeiculo
                            },
                            posto: {
                                idPosto: abastecimento.posto.idPosto
                            },
                            hodometro: abastecimento.hodometro,
                            quantidadeLitro: abastecimento.quantidadeLitro,
                            valorLitro: abastecimento.valorLitro,
                            valorTotal: abastecimento.valorTotal,
                            tipoCombustivel: abastecimento.tipoCombustivel
                    }
                    );
                },
                onErr => {
                    console.log(onErr);
                }
            );

        } else {

        }

        this.addCalenderPtBr();
        this.addPostos();
        this.addVeiculos();
        this.addListaTipoCombustivel();
    }

    private addVeiculos() {
        this.veiculoService.getVeiculos().subscribe(
            (veiculos: any[]) => {
                this.veiculos = [];
                veiculos.forEach(
                    veiculo => this.veiculos.push(
                        {label: veiculo.modelo + ' - ' + veiculo.placa, value: veiculo.idVeiculo}
                    )
                );
            }
        );
    }

    private addPostos() {
        this.postoService.getPostos().subscribe(
            (postos: any[]) => {
                this.postos = [];
                postos.forEach(
                    posto => this.postos.push(
                        {label: posto.nome, value: posto.idPosto}
                    )
                );
            }
        );
    }

    private addListaTipoCombustivel() {
        this.tipoCombustivel = [
            {label: 'Gasolina Comum', value: 'Gasolina Comum'},
            {label: 'Gasolina Aditivada', value: 'Gasolina Aditivada'},
            {label: 'Gasolina Premiun', value: 'Gasolina Premiun'},
            {label: 'Gasolina Formulada', value: 'Gasolina Formulada'},
            {label: 'Etanol', value: 'Etanol'},
            {label: 'Etanol Aditivado', value: 'Etanol Aditivado'},
            {label: 'Gnv', value: 'Gnv'},
            {label: 'Diesel', value: 'Diesel'},
            {label: 'Diesel S10', value: 'Diesel S10'},
            {label: 'Diesel Aditivado', value: 'Diesel Aditivado'},
            {label: 'Diesel Premiun', value: 'Diesel Premiun'}
        ];
    }

    onSubmit() {
        const abastecimento: any = this.abastecimentoForm.value;
        if (abastecimento.idAbastecimento === null) {
            this.abastecimentoService.salvar(this.abastecimentoForm.value).subscribe(
                onSuccess => {
                    this.messageService.add(
                        {severity: 'success', summary: 'Salvo com sucesso', detail: ''}
                        );
                        this.abastecimentoForm.reset();
                    },
                    (onErr: any) => {
                        (onErr.error).forEach(err =>
                            {this.messageService.add(
                            {severity: 'error', summary: 'Erro', detail: err}
                            );
                        });
                    }
                    );
                } else {
                    this.abastecimentoService.update(abastecimento.idAbastecimento, abastecimento)
                    .subscribe(
                        onSuccess => {
                            this.messageService.add(
                                {
                                    severity: 'success', summary: 'Atualizado com sucesso', detail: ''
                                }
                                );
                                this.abastecimentoForm.reset();
                        },
                        onErr => {});
                }
            }

    private addCalenderPtBr() {
        this.ptBr = {
            firstDayOfWeek: 0,
            dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabádo'],
            dayNamesShort: ['Dom', 'Seg', 'Terç', 'Qua', 'Qui', 'Sex', 'Sáb'],
            dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
            // tslint:disable-next-line:max-line-length
            monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            today: 'hoje',
            clear: 'limpar',
            dateFormat: 'dd/mm/yy'
        };
    }
}
