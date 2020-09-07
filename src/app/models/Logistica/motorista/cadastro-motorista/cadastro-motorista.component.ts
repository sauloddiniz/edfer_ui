import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HabilitacaoService, SharedService } from 'src/app/services';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { ColaboradorService } from '../../services';

@Component({
    selector: 'app-cadastro-motorista',
    templateUrl: './cadastro-motorista.component.html',
    styleUrls: ['./cadastro-motorista.component.css']
})
export class CadastroMotoristaComponent implements OnInit {
    selectedValue: string;
    motoristaForm: FormGroup;
    ajudanteForm: FormGroup;
    shared: SharedService;
    cnhCategoria: any[];
    funcionarios: SelectItem[];

    constructor(
        private habilitacaoService: HabilitacaoService,
        private motoristaService: ColaboradorService,
        private messageService: MessageService,
        private router: ActivatedRoute,
        private routes: Router
    ) {
        this.shared = SharedService.getInstance();
    }

    ngOnInit() {
        let idFuncionario = this.router.snapshot.params['id'];
        this.selectedValue = 'motorista';
        this.motoristaForm = new FormGroup({
            idFuncionario: new FormControl(null),
            nome: new FormControl(null),
            telefone: new FormControl(null),
            enumCategoriaCnh: new FormControl(null),
            numberCnh: new FormControl(null),
            dataVencimentoCnh: new FormControl(null),
            ativo: new FormControl(null)
        });
        this.ajudanteForm = new FormGroup({
            idFuncionario: new FormControl(null),
            nome: new FormControl(null),
            telefone: new FormControl(null),
            enumCategoriaCnh: new FormControl(null),
            ativo: new FormControl(null)
        });
        if (idFuncionario !== undefined) {
            this.motoristaService.findById(idFuncionario).subscribe(
                (colaborador: any) => {
                    if (colaborador.instanceOf === 'Ajudante') {
                        this.selectedValue = 'ajudante';
                        this.ajudanteForm.patchValue({
                            idFuncionario: colaborador.idFuncionario,
                            nome: colaborador.nome,
                            telefone: colaborador.telefone,
                            enumCategoriaCnh: colaborador.enumCategoriaCnh,
                            ativo: colaborador.ativo
                        });
                    } else if (colaborador.instanceOf === 'Motorista') {
                        this.motoristaForm.patchValue({
                            idFuncionario: colaborador.idFuncionario,
                            nome: colaborador.nome,
                            telefone: colaborador.telefone,
                            enumCategoriaCnh: colaborador.enumCategoriaCnh,
                            numberCnh: colaborador.numberCnh,
                            dataVencimentoCnh: colaborador.dataVencimentoCnh,
                            ativo: colaborador.ativo
                        });
                    }
                },
                error => {
                    console.log(error);
                }
            );
        }
        this.habilitacaoService
            .getHabilitacao()
            .subscribe((habilitacoes: any[]) => {
                this.cnhCategoria = [
                    {label: 'Selecione', value: null}
                ];
                habilitacoes.forEach(habilitacao =>
                    this.cnhCategoria.push({
                        label: habilitacao,
                        value: habilitacao
                    })
                );
            }
            );
    }

    onSubmitMotorista() {
        this.motoristaService.salvar(this.motoristaForm.value).subscribe(
            onSuccess => {
                this.messageService.add({
                    severity: 'success',
                    summary: '',
                    detail: 'Salvo com sucesso'
                });
                this.motoristaForm.reset();
                this.ngOnInit();
            },
            onError => {}
        );
    }

    onSubmitAjudante() {
        this.motoristaService.salvarAjudante(this.ajudanteForm.value).subscribe(
            onSuccess => {
                this.messageService.add({
                    severity: 'success',
                    summary: '',
                    detail: 'Salvo com sucesso'
                });
                this.motoristaForm.reset();
                this.ngOnInit();
            },
            onError => {}
        );
    }

    change(event) {
        this.selectedValue = event.value;
    }
}
