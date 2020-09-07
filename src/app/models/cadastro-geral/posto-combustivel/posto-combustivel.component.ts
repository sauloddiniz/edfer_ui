import { ConfirmationService, MessageService } from 'primeng/components/common/api';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PostoService } from 'src/app/services';

@Component({
  selector: 'app-posto-combustivel',
  templateUrl: './posto-combustivel.component.html',
  styleUrls: ['./posto-combustivel.component.css']
})
export class PostoCombustivelComponent implements OnInit {

    postoForm: FormGroup;
    postos: any[] = [];

    constructor(private confirmationService: ConfirmationService,
                private messageService: MessageService,
                private postoService: PostoService) { }

    ngOnInit() {
        this.postoForm = new FormGroup({
            'idPosto': new FormControl(null),
            'nome': new FormControl(null, Validators.required)
        });
        this.getListPostos();
    }

    onSubmit() {
        const fornecedor = this.postoForm.value;
        this.postoService.salvarPosto(fornecedor).subscribe(
            onSuccess => {
                this.onShowSuccess();
                this.getListPostos();
                this.postoForm.reset();
            },
            onErr => this.onShowErr(onErr)
        );
    }

    private getListPostos() {
        this.postoService.getPostos().subscribe(
            (postos: any[]) => this.postos = postos);
    }

    confirmChange(posto) {
        this.confirmationService.confirm({
            message: 'Tem certeza que deseja alterar este item?',
            header: 'Confirmação para alterar',
            accept: () => {
                this.postoForm.patchValue({
                    'idPosto' : posto.idPosto,
                    'nome' : posto.nome
                });
            }
        });

    }
    confirmDelete(posto) {
        this.confirmationService.confirm({
            message: 'Deseja Deletar? ' + posto.nome,
            header: 'Confirmação para excluir',
            accept: () => {
                this.postoService.deletePosto(posto.idPosto).subscribe(
                    onSuccess => {this.onShowDelete(), this.getListPostos(); },
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
