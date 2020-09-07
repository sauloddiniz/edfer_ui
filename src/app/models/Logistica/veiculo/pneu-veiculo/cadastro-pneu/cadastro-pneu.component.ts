import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {
    PneuService,
    FabricantePneuService
} from 'src/app/services';
import { MessageService } from 'primeng/primeng';

@Component({
    selector: 'app-cadastro-pneu',
    templateUrl: './cadastro-pneu.component.html',
    styleUrls: ['./cadastro-pneu.component.css']
})
export class CadastroPneuComponent implements OnInit {
    pneuForm: FormGroup;
    estados: any[];
    veiculos: any[];
    fabricantesPneu: any[];
    ptBr: any;

    constructor(
        private pneuService: PneuService,
        private fabricantePneuService: FabricantePneuService,
        private messageService: MessageService,
        private router: ActivatedRoute
    ) {}

    ngOnInit() {

        this.pneuForm = new FormGroup({
            idPneu: new FormControl(null),
            km: new FormControl(null, Validators.required),
            modelo: new FormControl(null, Validators.required),
            dataCompra: new FormControl(new Date().toLocaleDateString(), Validators.required),
            estadoAtual: new FormControl(null, Validators.required),
            numNotaOuNumOrdem: new FormControl(null),
            codControleEdfer: new FormControl(null, Validators.required),
            numSerie: new FormControl(null),
            fabricantePneu: new FormGroup({
                idFabricante: new FormControl(null, Validators.required)
            }),
            estadosPneu: new FormArray([]),
            veiculo: new FormControl(null),
            numeroEixo: new FormControl(null),
            posicao: new FormControl(null)
        });
        if (this.router.snapshot.params['id'] !== undefined) {
            this.addPneu(this.router.snapshot.params['id']);
        }
        this.addListaEstado();
        this.addListaFabricante();
        this.addCalenderPtBr();
    }

    onSubmit() {
        const pneu = this.pneuForm.value;
        (<FormArray>this.pneuForm.get('estadosPneu')).push(
            new FormGroup({
                idEstadoPneu: new FormControl(null),
                kmInicial: new FormControl(pneu.km),
                estado: new FormControl(pneu.estadoAtual),
                dataReforma: new FormControl(pneu.dataCompra)
            })
         );

        this.pneuService.salvar(this.pneuForm.value).subscribe(
            onSuccess => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Salvo com sucesso',
                    detail: ''
                });
                this.pneuForm.reset();
                this.ngOnInit();
             },
             onErr => console.log(onErr)
         );
    }

    private addPneu(idPneu: number) {
        this.pneuService.getByIdPneu(idPneu).subscribe(
            (pneu: any) => {
                console.log(pneu);
                this.pneuForm.patchValue({
                    idPneu: pneu.idPneu,
                    km: pneu.km,
                    dataCompra: pneu.dataCompra,
                    modelo: pneu.modelo,
                    estadoAtual: pneu.estadoAtual,
                    fabricantePneu: {
                        idFabricante: pneu.fabricantePneu.idFabricante
                    },
                    numNotaOuNumOrdem: pneu.numNotaOuNumOrdem,
                    codControleEdfer: pneu.codControleEdfer,
                    numSerie: pneu.numSerie,
                    veiculo: pneu.veiculo,
                    numeroEixo: pneu.numeroEixo,
                    posicao: pneu.posicao
                });
             },
            onErr => {console.log(onErr); });
    }

    private addListaEstado() {
        this.estados = [];
        this.estados = [
            { label: 'Novo', value: 'Novo' },
            { label: 'Usado', value: 'Usado' },
            { label: 'Reformado', value: 'Reformado' }
        ];
    }

    private addListaFabricante() {
        this.fabricantesPneu = [];
        this.fabricantePneuService
            .getFabricantes()
            .subscribe((fabricantesPneus: any[]) => {
                fabricantesPneus.forEach(fabricante =>
                    this.fabricantesPneu.push(
                        {
                            label: fabricante.nome,
                            value: fabricante.idFabricante
                        })
                );
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
}
