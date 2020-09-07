import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { VeiculoService, ManutencaoService } from 'src/app/services';
import { MessageService } from 'primeng/components/common/api';

@Component({
    selector: 'app-cadastro-manutencao',
    templateUrl: './cadastro-manutencao.component.html',
    styleUrls: ['./cadastro-manutencao.component.css']
})
export class CadastroManutencaoComponent implements OnInit {

    manutencaoForm: FormGroup;
    veiculos: any[] = [];
    fornecedores: String[];
    tipoManutencao: any[] = [];
    tipoServicos: any[] = [];
    ptBr: any;

    constructor(
        private veiculoService: VeiculoService,
        private manutencaoService: ManutencaoService,
        private messageService: MessageService,
        private router: ActivatedRoute
    ) { }

    ngOnInit() {

        const id = this.router.snapshot.params['id'];

        this.addVeiculos();
        this.addCalenderPtBr();
        this.addTipoManutencao();

        this.manutencaoForm = new FormGroup({
            idManutencao: new FormControl(null),
            dataManutencao: new FormControl(new Date().toLocaleDateString(), Validators.required),
            validadeManutencao: new FormControl(null),
            tipoNota: new FormControl(0, Validators.required),
            tipoServico: new FormControl(null),
            veiculo: new FormGroup({
                idVeiculo: new FormControl(null, Validators.required)
            }),
            fornecedor: new FormControl(null, Validators.required),
            valorManutencao: new FormControl(null),
            hodometroEfetuado: new FormControl(null),
            validadeHodometro: new FormControl,
            numNotaOuNumOrdem: new FormControl(null),
            observacao: new FormControl(null),
            tipoManutencao: new FormControl(null, Validators.required)
        });

        if (id !== undefined) {
            this.manutencaoService.getManutencaoById(id).subscribe(
                (manutencao: any) => {
                    this.manutencaoForm.patchValue(
                        {
                            idManutencao: manutencao.idManutencao,
                            dataManutencao: manutencao.dataManutencao,
                            validadeManutencao: manutencao.validadeManutencao,
                            tipoNota: manutencao.tipoNota,
                            tipoServico: manutencao.tipoServico,
                            veiculo: {
                                idVeiculo: manutencao.veiculo.idVeiculo
                            },
                            fornecedor: manutencao.fornecedor,
                            valorManutencao: manutencao.valorManutencao,
                            hodometroEfetuado: manutencao.hodometroEfetuado,
                            validadeHodometro: manutencao.validadeHodometro,
                            numNotaOuNumOrdem: manutencao.numNotaOuNumOrdem,
                            observacao: manutencao.observacao,
                            tipoManutencao: manutencao.tipoManutencao,
                        }
                    );
                }, onErr => {});
        } else {

        }

        this.manutencaoService.getAllServicos().subscribe(
            (servicos: string[]) => {
                this.tipoServicos = [];
                for (const servico of servicos) {
                    this.tipoServicos.push({label: servico, value: servico});
                }
            }
        );
    }

    private addVeiculos() {
        this.veiculoService.getVeiculos().subscribe(
            (veiculos: any[]) => veiculos.forEach(
                veiculo => this.veiculos.push(
                    {label: veiculo.modelo + ' - ' + veiculo.placa, value: veiculo.idVeiculo}
                )
            )
        );
    }

    private addTipoManutencao() {
        this.tipoManutencao = [
            { label: 'Preventiva', value: 'Preventiva' },
            { label: 'Corretiva', value: 'Corretiva' }
        ];
    }

    onSubmit() {
        console.log(this.manutencaoForm.value);
        if (this.manutencaoForm.get('idManutencao').value === null) {
            this.manutencaoService.salvar(this.manutencaoForm.value).subscribe(
                onSuccess => {
                    this.messageService.add(
                        {severity: 'success', summary: 'Salvo com sucesso', detail: ''}
                        );
                    this.manutencaoForm.reset();
                    },
                onErr => console.log(onErr)
            );
        } else {
            this.manutencaoService.update(this.manutencaoForm.get('idManutencao').value, this.manutencaoForm.value)
            .subscribe(
                onSuccess => {
                    this.messageService.add(
                        {severity: 'success', summary: 'Atualizado com sucesso', detail: ''}
                        );
                    this.manutencaoForm.reset();
                    },
                onErr => console.log(onErr)
            );
        }
    }

    onClickSearchFornecedor(event) {
        this.manutencaoService.getFornecedores(event.query).subscribe(
            onSuccess => {
                this.fornecedores = onSuccess;
            },
            onError => {}
        );
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
