import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/services';
import { MessageService } from 'primeng/components/common/api';

@Component({
    selector: 'app-cadastro',
    templateUrl: './cadastro.component.html',
    styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

    entradaPedidoForm: FormGroup;

    constructor(private pedidoService: PedidoService,
                private messageService: MessageService) { }

    ngOnInit() {
        this.entradaPedidoForm = new FormGroup({
            'numeroPedido': new FormControl(null, Validators.required),
            'cliente': new FormControl(null, Validators.required)
        });
    }

    onSubmit() {
        this.pedidoService.salvar(this.entradaPedidoForm.value).subscribe(
            onSuccess => {
                this.entradaPedidoForm.reset();
                this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Código: ' + onSuccess});
            },
            onErr => {
                if (onErr.error) {
                    for (const err of onErr.error) {
                        this.messageService.add({severity: 'error', summary: 'Atenção', detail: err});
                    }
                }
            }
        );
    }
}
