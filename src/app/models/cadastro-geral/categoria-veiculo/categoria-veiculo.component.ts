import { CategoriaVeiculoService } from 'src/app/services';
import { ConfirmationService, MessageService } from 'primeng/components/common/api';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-categoria-veiculo',
    templateUrl: './categoria-veiculo.component.html',
    styleUrls: ['./categoria-veiculo.component.css']
})
export class CategoriaVeiculoComponent implements OnInit {

    categoriaForm: FormGroup;
    categorias: any[] = [];

    constructor(private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private categoriaService: CategoriaVeiculoService) { }

    ngOnInit() {
        this.categoriaForm = new FormGroup({
            'idCategoria': new FormControl(null),
            'nome': new FormControl(null, Validators.required)
        });
        this.getListCategorias();
    }

    onSubmit() {
        const categoria = this.categoriaForm.value;
        this.categoriaService.salvarCategoria(categoria).subscribe(
            onSuccess => {
                this.onShowSuccess();
                this.getListCategorias();
                this.categoriaForm.reset();
            },
            onErr => this.onShowErr(onErr)
        );
    }

    private getListCategorias() {
        this.categoriaService.getCategorias().subscribe(
            (categorias: any[]) => this.categorias = categorias);
    }

    confirmChange(categoria) {
        this.confirmationService.confirm({
            message: 'Tem certeza que deseja alterar este item?',
            header: 'Confirmação para alterar',
            accept: () => {
                this.categoriaForm.patchValue({
                    'idCategoria': categoria.idCategoria,
                    'nome': categoria.nome
                });
            }
        });

    }
    confirmDelete(categoria) {
        this.confirmationService.confirm({
            message: 'Deseja Deletar? ' + categoria.nome,
            header: 'Confirmação para excluir',
            accept: () => {
                this.categoriaService.deleteCategoria(categoria.idCategoria).subscribe(
                    onSuccess => { this.onShowDelete(), this.getListCategorias(); },
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
