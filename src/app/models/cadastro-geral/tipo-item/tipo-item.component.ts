
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/components/common/api';
import { ItemService } from 'src/app/services';

@Component({
  selector: 'app-tipo-item',
  templateUrl: './tipo-item.component.html',
  styleUrls: ['./tipo-item.component.css']
})
export class TipoItemComponent implements OnInit {

    itemForm: FormGroup;
    itens: any[] = [];

    constructor(private confirmationService: ConfirmationService,
                private messageService: MessageService,
                private itemServices: ItemService) { }

    ngOnInit() {
        this.itemForm = new FormGroup({
            'idItem': new FormControl(null),
            'nome': new FormControl(null, Validators.required)
        });
        this.getListItens();
    }

    onSubmit() {
        const item = this.itemForm.value;
        this.itemServices.salvarItem(item).subscribe(
            onSuccess => {
                this.onShowSuccess();
                this.getListItens();
                this.itemForm.reset();
            },
            onErr => this.onShowErr(onErr)
        );
    }

    private getListItens() {
        this.itemServices.getItems().subscribe(
            (itens: any[]) => this.itens = itens);
    }

    confirmChange(item) {
        this.confirmationService.confirm({
            message: 'Tem certeza que deseja alterar este item?',
            header: 'Confirmação para alterar',
            accept: () => {
                this.itemForm.patchValue({
                    'idItem' : item.idItem,
                    'nome' : item.nome
                });
            }
        });

    }
    confirmDelete(item) {
        this.confirmationService.confirm({
            message: 'Deseja Deletar? ' + item.nome,
            header: 'Confirmação para excluir',
            accept: () => {
                this.itemServices.deleteItem(item.idItem).subscribe(
                    onSuccess => {this.onShowDelete(), this.getListItens(); },
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
