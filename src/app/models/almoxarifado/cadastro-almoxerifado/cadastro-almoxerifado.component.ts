import { MessageService } from 'primeng/components/common/api';
import { AlmoxerifadoService } from './../almoxerifado.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { SharedService } from 'src/app/services';

@Component({
    selector: 'app-cadastro-almoxerifado',
    templateUrl: './cadastro-almoxerifado.component.html',
    styleUrls: ['./cadastro-almoxerifado.component.css'],
    styles: [
        `.estoqueMin {
            background-color: #ffce99 !important;
            color: #ffffff !important;
        }`
    ]
})
export class CadastroAlmoxerifadoComponent implements OnInit {

    @ViewChild('dt1', {static: false}) dt1: Table;
    itemForm: FormGroup;
    itens: any[];
    totalRecords: number;
    tipoUnidades = [];
    shared: SharedService;
    errCodigo = false;
    constructor(private almoxerifadoService: AlmoxerifadoService,
                private messageService: MessageService) {
        this.shared = SharedService.getInstance();
                }

    ngOnInit() {
        this.itemForm = new FormGroup({
            idMiudeza: new FormControl(null),
            codigo: new FormControl(null, Validators.required),
            descricao : new FormControl(null, Validators.required),
            estoque : new FormControl({value: null, disabled: true}, Validators.required),
            estoqueMinimo : new FormControl(null),
            tipoUnidade : new FormControl(null, Validators.required),
        });

        this.tipoUnidades = [
            {label: 'Selecione Unidade', value: null},
            {label: 'KG', value: 'KG'},
            {label: 'UN', value: 'UN'},
            {label: 'GL', value: 'GL'},
            {label: 'LT', value: 'LT'},
        ];
    }

    onSubmit() {
        this.almoxerifadoService.save(this.itemForm.value).subscribe(
            responseSuccess => {
                this.itemForm.reset();
                this.dt1._filter();
                this.messageService.add({
                    severity: 'success',
                    summary: '',
                    detail: 'Salvo com sucesso'
                });
            },
            responseErr => {
                for (const err of responseErr.error) {
                    this.itemForm.controls[err.field]
                    .setErrors(
                        {field: err.field, message: err.defaultMessage});
                    this.messageService.add({
                        severity: 'error',
                        summary: '406',
                        detail: err.defaultMessage
                    });
                }
            }
        );
    }

    loadItens(event: any) {
        let sortField: string;
        let sortOrder: string;
        const first = event.first;
        const rows = event.rows;

        if (event.sortField === undefined) {
            sortField = '';
            sortOrder = '';
        } else {
            sortField = event.sortField;
            sortOrder = event.sortOrder;
        }

        let codigo = '';
        let descricao = '';

        if (event.filters.codigo) {
            codigo = event.filters.codigo.value;
        }

        if (event.filters.descricao) {
            descricao = event.filters.descricao.value;
        }

        this.almoxerifadoService.getAlmoxerifadoCriteria(
            first,
            rows,
            sortField,
            sortOrder,
            codigo,
            descricao).subscribe(
                (success: any) => {
                    this.itens = success.objs;
                    this.totalRecords = success.totalList;
                },
                err => {console.log(err); }
            );
    }

    onUpdate(item: any) {
        this.itemForm.patchValue({
            idMiudeza: item.idMiudeza,
            codigo: item.codigo,
            descricao : item.descricao,
            estoque : item.estoque,
            estoqueMinimo : item.estoqueMinimo,
            tipoUnidade : item.tipoUnidade,
        });
    }

    onChange(event) {
        if (event.value) {
            this.itemForm.controls['estoque'].enable();
        } else {
            this.itemForm.controls['estoque'].disable();
        }
    }
}
