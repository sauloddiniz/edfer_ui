import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlmoxerifadoService } from '../almoxerifado.service';
import { MessageService, SelectItem } from 'primeng/components/common/api';
import { AutoComplete, ConfirmationService } from 'primeng/primeng';

@Component({
    selector: 'app-lista-almoxerifado',
    templateUrl: './lista-almoxerifado.component.html',
    styleUrls: ['./lista-almoxerifado.component.css']
})
export class ListaAlmoxerifadoComponent implements OnInit {
    tipoEntrada: SelectItem[];
    entradaSaidaMiudezaForm: FormGroup;
    miudezas = [];
    listEntradaSaida: any[];

    constructor(
        private almoxerifadoService: AlmoxerifadoService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit() {
        this.tipoEntrada = [
            { label: 'Compra', value: 'COMPRA' },
            { label: 'Venda', value: 'VENDA' },
            { label: 'Cancelado', value: 'CANCELADO' },
        ];

        this.almoxerifadoService.getAllEntradaSaida().subscribe(
            responseSuccess => {
                this.listEntradaSaida = responseSuccess;
            },
            responseErr => {}
        );
        this.entradaSaidaMiudezaForm = new FormGroup({
            entradaSaida: new FormControl(null, Validators.required),
            miudeza: new FormControl(null),
            quantidade: new FormControl({value: null}, Validators.required),
            numPedido: new FormControl(null)
        });
    }

    onSubmit() {
        this.almoxerifadoService
            .saveEntradaSaida(this.entradaSaidaMiudezaForm.value)
            .subscribe(
                responseSuccess => {
                    if (responseSuccess) {
                        this.messageService.add({
                            severity: 'warn',
                            summary: 'Salvo com sucesso',
                            detail: `Estoque menor que o minimo: ${responseSuccess}`,
                            life: 60000
                        });
                    } else {
                        this.messageService.add({
                            severity: 'success',
                            summary: '',
                            detail: 'Salvo com sucesso',
                        });
                    }
                    this.entradaSaidaMiudezaForm.reset();
                    this.ngOnInit();
                },
                responseErr => {
                    for (const err of responseErr.error) {
                        this.messageService.add({
                            severity: 'error',
                            summary: '406',
                            detail: err
                        });
                    }
                }
            );
    }

    public searchMiudeza(event: any) {
        this.almoxerifadoService
            .getMiudezaStartingWithCodigo(event.query)
            .subscribe(
                responseSucces => {
                    this.miudezas = responseSucces;
                },
                responseErr => {
                    if (responseErr.status === 404) {
                        this.messageService.add({
                            severity: 'error',
                            summary: '404',
                            detail: 'Codigo não encontrado'
                        });
                    }
                }
            );
    }

    onSelect(miudeza: any) {
        this.entradaSaidaMiudezaForm.patchValue({
            miudeza: miudeza
        });
    }

    onCancel(produto: any) {
        if (produto.entradaSaida !== 'CANCELADO') {
            this.confirmationService.confirm({
                message: 'Deseja Cancelar ?',
                header: 'Confirmação',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.almoxerifadoService
                        .cancelAction(produto.idEntradaSaida)
                        .subscribe(
                            onSuccess => {
                                this.ngOnInit();
                            },
                            onErr => {
                                console.log(onErr);
                            }
                        );
                },
                reject: () => {}
            });
        }
    }
}
