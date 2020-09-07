import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/components/common/api';
import { FornecedorProdutoService } from 'src/app/services';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-fornecedor-produto',
  templateUrl: './fornecedor-produto.component.html',
  styleUrls: ['./fornecedor-produto.component.css']
})
export class FornecedorProdutoComponent implements OnInit {

    fornecedorProdutoForm: FormGroup;
    fornecedoresProduto: any[] = [];

    constructor(private confirmationService: ConfirmationService,
                private messageService: MessageService,
                private fornecedorProdutoService: FornecedorProdutoService) { }

    ngOnInit() {
        this.fornecedorProdutoForm = new FormGroup({
            'idFornecedor': new FormControl(null),
            'nome': new FormControl(null, Validators.required)
        });
        this.getListFornecedores();
    }

    onSubmit() {
        const fornecedor = this.fornecedorProdutoForm.value;
        this.fornecedorProdutoService.savlvarFornecedor(fornecedor).subscribe(
            onSuccess => {
                this.onShowSuccess();
                this.getListFornecedores();
                this.fornecedorProdutoForm.reset();
            },
            onErr => this.onShowErr(onErr)
        );
    }

    private getListFornecedores() {
        this.fornecedorProdutoService.getFornecedores().subscribe(
            (fornecedores: any[]) => this.fornecedoresProduto = fornecedores);
    }

    confirmChange(fornecedor) {
        this.confirmationService.confirm({
            message: 'Tem certeza que deseja alterar este item?',
            header: 'Confirmação para alterar',
            accept: () => {
                this.fornecedorProdutoForm.patchValue({
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
                this.fornecedorProdutoService.deleteFornecedor(fornecedor.idFornecedorProduto).subscribe(
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
