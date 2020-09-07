import {
    FormGroup,
    FormControl,
    Validators
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {
    CategoriaVeiculoService,
    FabricanteService,
    VeiculoService
} from 'src/app/services';
import { MessageService } from 'primeng/components/common/api';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-cadastro-veiculo',
    templateUrl: './cadastro-veiculo.component.html',
    styleUrls: ['./cadastro-veiculo.component.css']
})
export class CadastroVeiculoComponent implements OnInit {
    veiculoForm: FormGroup;

    categorias: any[] = [];
    tipoCombustivel: any[];
    fabricantes: any[] = [];
    id: number;
    ptBr: any;

    constructor(
        private messageService: MessageService,
        private categoriaVeiculoService: CategoriaVeiculoService,
        private fabricanteService: FabricanteService,
        private veiculoService: VeiculoService,
        private router: ActivatedRoute
    ) {}

    ngOnInit() {
        this.id = this.router.snapshot.params['id'];
        this.veiculoForm = new FormGroup({
            idVeiculo: new FormControl(null),
            modelo: new FormControl(null, Validators.required),
            placa: new FormControl(null, Validators.required),
            anoModelo: new FormControl(null, Validators.required),
            chassi: new FormControl(null, Validators.required),
            categoria: new FormGroup({
                idCategoria: new FormControl(null)
            }),
            renavam: new FormControl(null, Validators.required),
            dataCompra: new FormControl(null, Validators.required),
            fabricante: new FormGroup({
                idFabricante: new FormControl(null, Validators.required)
            }),
            hodometro: new FormControl(null, Validators.required),
            pesoSuportado: new FormControl(null, Validators.required),
            numTotalDeEixos: new FormControl(null, Validators.required)
        });

        this.categoriaVeiculoService
            .getCategorias()
            .subscribe((categorias: any[]) =>
                categorias.forEach(categoria =>
                    this.categorias.push({
                        label: categoria.nome,
                        value: categoria.idCategoria
                    })
                )
            );

        this.tipoCombustivel = [
            { value: 0, label: 'Gasolina Comum' },
            { value: 1, label: 'Gasolina Aditivada' },
            { value: 2, label: 'Gasolina Premium' },
            { value: 3, label: 'Gasolina Formulada' },
            { value: 4, label: 'Etanol' },
            { value: 5, label: 'Etanol aditivado' },
            { value: 6, label: 'Gás Natural Veícular' },
            { value: 7, label: 'Diesel' },
            { value: 8, label: 'Diesel S10' },
            { value: 9, label: 'Diesel Aditivado' },
            { value: 10, label: 'Diesel Premium' }
        ];

        this.fabricanteService
            .getFabricantes()
            .subscribe((fabricantes: any[]) =>
                fabricantes.forEach(fabricante => {
                    this.fabricantes.push({
                        label: fabricante.nome,
                        value: fabricante.idFabricante
                    });
                })
            );

        if (this.id !== undefined) {
            this.addVeiculo(this.id);
        }
        this.addCalenderPtBr();
    }

    private addVeiculo(id: number) {
        this.veiculoService.getVeiculoById(id).subscribe(
            onSuccess => {
                this.veiculoForm.patchValue({
                    idVeiculo : onSuccess.idVeiculo,
                    modelo: onSuccess.modelo,
                    placa: onSuccess.placa,
                    chassi: onSuccess.chassi,
                    renavam: onSuccess.renavam,
                    anoModelo: onSuccess.anoModelo,
                    categoria: {
                        idCategoria: onSuccess.categoria.idCategoria
                    },
                    combustivel: onSuccess.combustivel,
                    dataCompra: onSuccess.dataCompra,
                    fabricante: {
                        idFabricante: onSuccess.fabricante.idFabricante
                    },
                    hodometro: onSuccess.hodometro,
                    pesoSuportado: onSuccess.pesoSuportado,
                    numTotalDeEixos: onSuccess.numTotalDeEixos
                });
            },
            onErr => {}
        );
    }

    onSubmit() {
        if (this.veiculoForm.value['idVeiculo'] === null) {
            this.veiculoService.salvar(this.veiculoForm.value).subscribe(
                onSuccess => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Sucesso',
                        detail: 'Salvo com sucesso código' + onSuccess
                    });
                    this.veiculoForm.reset();
                },
                onErr => {
                    for (const err of onErr) {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Erro',
                            detail: err
                        });
                    }
                }
            );
        } else {
            this.veiculoService.updateVeiculoById(
                this.veiculoForm.value,
                this.veiculoForm.value['idVeiculo'])
                    .subscribe(
                        onSuccess => {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Atualizado',
                                detail: 'Veiculo Atualizado'
                            });
                            this.veiculoForm.reset();
                        },
                        onErr => {
                            for (const err of onErr) {
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
