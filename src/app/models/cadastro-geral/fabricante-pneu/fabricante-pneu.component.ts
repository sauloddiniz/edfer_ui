import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/primeng';
import { FabricantePneuService } from 'src/app/services';

@Component({
    selector: 'app-fabricante-pneu',
    templateUrl: './fabricante-pneu.component.html',
    styleUrls: ['./fabricante-pneu.component.css']
})
export class FabricantePneuComponent implements OnInit {

    fabricantPneuForm: FormGroup;
    fabricantes: any[];

    constructor(private confirmationService: ConfirmationService,
                private messageService: MessageService,
                private fabricantePneuService: FabricantePneuService) { }

    ngOnInit() {
        this.fabricantPneuForm = new FormGroup({
            'idFabricantePneu': new FormControl(null),
            'nome': new FormControl(null, Validators.required)
        });
        this.getListFabricantes();
    }

    onSubmit() {
        const fabricante = this.fabricantPneuForm.value;
        this.fabricantePneuService.salvarFabricante(fabricante).subscribe(
            onSuccess => {
                this.onShowSuccess();
                this.getListFabricantes();
                this.fabricantPneuForm.reset();
            },
            onErr => this.onShowErr(onErr)
        );
    }

    private getListFabricantes() {
        this.fabricantePneuService.getFabricantes().subscribe(
            (fabricantes: any[]) => this.fabricantes = fabricantes);
    }

    confirmChange(fabricante) {
        this.confirmationService.confirm({
            message: 'Tem certeza que deseja alterar este item?',
            header: 'Confirmação para alterar',
            accept: () => {
                this.fabricantPneuForm.patchValue({
                    'idFabricantePneu': fabricante.idFabricante,
                    'nome': fabricante.nome
                });
            }
        });

    }
    confirmDelete(fabricante) {
        this.confirmationService.confirm({
            message: 'Deseja Deletar? ' + fabricante.nome,
            header: 'Confirmação para excluir',
            accept: () => {
                this.fabricantePneuService.deleteFabricante(fabricante.idFabricante).subscribe(
                    onSuccess => { this.onShowDelete(), this.getListFabricantes(); },
                    onErr => { }
                );
            }
        });
    }

    onShowDelete() {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Deletado com Sucesso' });
    }

    onShowErr(err: any) {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: err.error[0] });
    }

    onShowSuccess() {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Salvo com Sucesso' });
    }
}
