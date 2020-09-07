import { SelectItem, MenuItem } from 'primeng/components/common/api';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { OrcamentoService } from 'src/app/services';

@Component({
    selector: 'app-orcamento-log',
    templateUrl: './orcamento-log.component.html',
    styleUrls: ['./orcamento-log.component.css']
})
export class OrcamentoLogComponent implements OnInit {

    orcamentoForm: FormGroup;
    tipoOrcamento: SelectItem[];
    itemIndex = 0;
    items: MenuItem[];
    selectProdutoIndex: any;

    constructor(private orcamentoService: OrcamentoService) { }

    ngOnInit() {
        this.tipoOrcamento = [
            {label: 'Item', value: 0},
            {label: 'Servico', value: 1}
        ];

        this.items = [
            { label: 'Delete', icon: 'pi pi-times', command: (event) => this.removeItemOrcamento(this.selectProdutoIndex) }
        ];

        this.orcamentoForm = new FormGroup({
            'dataOrcamento' : new FormControl(new Date()),
            'listaItemOrc' : new FormArray([
                new FormGroup({
                    'tipoOrcamento' : new FormControl(0),
                    'descricao' : new FormControl(null),
                    'quantidade' : new FormControl(null),
                    'fornecedores' : new FormArray([
                        new FormGroup({
                            'nome' : new FormControl(null),
                            'nomeVendedor' : new FormControl(null),
                            'telefone' : new FormControl(null),
                            'formaPagamento' : new FormGroup({
                                'valorAv': new FormControl(null),
                                'quantParcela': new FormControl(null),
                                'valorParcela': new FormControl(null)
                            })
                        }),
                    ])
                })
            ])
        });
    }

    onSubmit() {
        console.log(this.orcamentoForm);
        this.orcamentoService.salvar(this.orcamentoForm.value).subscribe(
            onSucces => {console.log(onSucces); },
            onErr => console.log(onErr)
        );
    }

    addItemOrcamento() {
        (<FormArray>this.orcamentoForm.get('listaItemOrc')).push(
            new FormGroup({
                'tipoOrcamento': new FormControl(0),
                'descricao': new FormControl(null),
                'quantidade': new FormControl(null),
                'fornecedores': new FormArray([
                    new FormGroup({
                        'nome' : new FormControl(null),
                        'nomeVendedor' : new FormControl(null),
                        'telefone' : new FormControl(null),
                        'formaPagamento' : new FormGroup({
                            'valorAv': new FormControl(null),
                            'quantParcela': new FormControl(null),
                            'valorParcela': new FormControl(null)
                        })
                    })
                ])
            })
        );
        this.itemIndex ++;
    }

    removeItemOrcamento(selectProdutoIndex: number) {
        if (selectProdutoIndex >= 1) {
            (<FormArray>this.orcamentoForm.get('listaItemOrc')).removeAt(selectProdutoIndex);
            this.itemIndex = selectProdutoIndex - 1;
        }
    }

    addFornecedorItem() {
        const row = (<FormArray>this.orcamentoForm.get('listaItemOrc')).at(this.itemIndex);
        (<FormArray>row.get('fornecedores')).push(
            new FormGroup({
                'nome' : new FormControl(null),
                'nomeVendedor' : new FormControl(null),
                'telefone' : new FormControl(null),
                'formaPagamento' : new FormGroup({
                    'valorAv': new FormControl(null),
                    'quantParcela': new FormControl(null),
                    'valorParcela': new FormControl(null)
                })
            })
        );
    }

    removerFornecedorItem(index: number) {
        const row = (<FormArray>this.orcamentoForm.get('listaItemOrc')).at(this.itemIndex);
        if ( (<FormArray>row.get('fornecedores')).length >= 4 ) {
            (<FormArray>row.get('fornecedores')).removeAt(index);
        }
    }
}
