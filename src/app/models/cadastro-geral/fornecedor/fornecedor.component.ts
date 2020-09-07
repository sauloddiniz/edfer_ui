import { ConfirmationService, MessageService } from 'primeng/components/common/api';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FornecedorService } from 'src/app/services';
@Component({
    selector: 'app-fornecedor',
    templateUrl: './fornecedor.component.html',
    styleUrls: ['./fornecedor.component.css']
})
export class FornecedorComponent implements OnInit {

    fornecedorForm: FormGroup;
    fornecedores: any[] = [];

    constructor(private confirmationService: ConfirmationService,
                private messageService: MessageService,
                private fornecedorService: FornecedorService) { }

    ngOnInit() {
        this.fornecedorForm = new FormGroup({
            'idFornecedor': new FormControl(null),
            'nome': new FormControl(null, Validators.required)
        });
        this.getListFornecedores();
    }

    onSubmit() {
        const fornecedor = this.fornecedorForm.value;
        this.fornecedorService.savlvarFornecedor(fornecedor).subscribe(
            onSuccess => {
                this.onShowSuccess();
                this.getListFornecedores();
                this.fornecedorForm.reset();
            },
            onErr => this.onShowErr(onErr)
        );
    }

    private getListFornecedores() {
        this.fornecedorService.getFornecedores().subscribe(
            (fornecedores: any[]) => this.fornecedores = fornecedores);
    }

    confirmChange(fornecedor) {
        this.confirmationService.confirm({
            message: 'Tem certeza que deseja alterar este item?',
            header: 'Confirmação para alterar',
            accept: () => {
                this.fornecedorForm.patchValue({
                    'idFornecedor' : fornecedor.idFornecedor,
                    'nome' : fornecedor.nome
                });
            }
        });

    }
    confirmDelete(fornecedor: any) {
        this.confirmationService.confirm({
            message: 'Deseja Deletar? ' + fornecedor.nome,
            header: 'Confirmação para excluir',
            accept: () => {
                this.fornecedorService.deleteFornecedor(fornecedor.idFornecedor).subscribe(
                    onSuccess => {this.onShowDelete(), this.getListFornecedores(); },
                    onErr => {}
                );
            }
        });
    }

    onShowDelete() {
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Deletado com Sucesso'});
    }

    onShowErr(err: any) {
        this.messageService.add({severity: 'error', summary: 'Erro', detail: err.error[0]});
    }

    onShowSuccess() {
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Salvo com Sucesso'});
    }
}
