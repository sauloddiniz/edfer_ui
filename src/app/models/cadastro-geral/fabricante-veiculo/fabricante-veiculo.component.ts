import { ConfirmationService, MessageService } from 'primeng/primeng';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FabricanteService } from 'src/app/services';

@Component({
    selector: 'app-fabricante-veiculo',
    templateUrl: './fabricante-veiculo.component.html',
    styleUrls: ['./fabricante-veiculo.component.css']
})
export class FabricanteVeiculoComponent implements OnInit {

    fabricantForm: FormGroup;
    fabricantes: any[] = [];

    constructor(private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private fabricantesService: FabricanteService) { }

    ngOnInit() {
        this.fabricantForm = new FormGroup({
            'idFabricante': new FormControl(null),
            'nome': new FormControl(null, Validators.required)
        });
        this.getListFabricantes();
    }

    onSubmit() {
        const fabricante = this.fabricantForm.value;
        this.fabricantesService.salvarFabricante(fabricante).subscribe(
            onSuccess => {
                this.onShowSuccess();
                this.getListFabricantes();
                this.fabricantForm.reset();
            },
            onErr => this.onShowErr(onErr)
        );
    }

    private getListFabricantes() {
        this.fabricantesService.getFabricantes().subscribe(
            (fabricantes: any[]) => this.fabricantes = fabricantes);
    }

    confirmChange(fabricante) {
        this.confirmationService.confirm({
            message: 'Tem certeza que deseja alterar este item?',
            header: 'Confirmação para alterar',
            accept: () => {
                this.fabricantForm.patchValue({
                    'idFabricante': fabricante.idFabricante,
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
                this.fabricantesService.deleteFabricante(fabricante.idFabricante).subscribe(
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
