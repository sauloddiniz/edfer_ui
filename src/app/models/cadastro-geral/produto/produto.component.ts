import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/primeng';
import { ProdutoService } from 'src/app/services';

@Component({
    selector: 'app-produto',
    templateUrl: './produto.component.html',
    styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

    produtoForm: FormGroup;
    produtos: any[];
    loading: boolean;
    totalRecords: number;

    constructor(private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private produtoService: ProdutoService) { }

    ngOnInit() {
        this.produtoForm = new FormGroup({
            'idProduto': new FormControl(null),
            'codigo': new FormControl(null, Validators.required),
            'descricao': new FormControl(null, Validators.required)
        });
    }

    onSubmit() {
        const produto = this.produtoForm.value;
        this.produtoService.salvarProduto(produto).subscribe(
            onSuccess => {
                this.onShowSuccess();
                this.getListItens();
                this.produtoForm.reset();
            },
            onErr => this.onShowErr(onErr)
        );
    }

    private getListItens() {
        this.loading = true;
        this.produtoService.getAllProdutos().subscribe(
            (produtos: any[]) => {
                this.produtos = produtos;
                this.loading = false;
            },
            onErr => {console.log(onErr); }
            );
    }

    confirmChange(produto) {
        this.confirmationService.confirm({
            message: 'Tem certeza que deseja alterar este item?',
            header: 'Confirmação para alterar',
            accept: () => {
                this.produtoForm.patchValue({
                    'idProduto': produto.idProduto,
                    'descricao': produto.descricao,
                    'codigo' : produto.codigo
                });
            }
        });

    }
    confirmDelete(produto) {
        this.confirmationService.confirm({
            message: 'Deseja Deletar? ' + produto.codigo,
            header: 'Confirmação para excluir',
            accept: () => {
                this.produtoService.deleteProdutoById(produto.idProduto).subscribe(
                    onSuccess => { this.onShowDelete(), this.getListItens(); },
                    onErr => { }
                );
            }
        });
    }

    loadProdutos(event: any) {

        console.log(event);

        let codigo = '';
        let descricao = '';
        let sortField: string;
        let sortOrder: string;
        const first = event.first;
        const rows = event.rows;

        if (event.filters.codigo) {
            codigo = event.filters.codigo.value;
        }

        if (event.filters.descricao) {
            descricao = event.filters.descricao.value;
        }

        if (event.sortField === undefined) {
            sortField = '';
        } else { sortField = event.sortField; }

        if (event.sortOrder === 1) {
            sortOrder = '1';
        } else { sortOrder = '-1'; }

        this.produtoService.getAllProdutoFilter(first, rows, codigo, descricao, sortField, sortOrder).subscribe(
            (response: any) => {
                this.produtos = [];
                this.produtos = response.produtos;
                this.totalRecords = response.totalList;

                console.log(response);
             }
        );
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
