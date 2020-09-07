import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FornecedorProdutoService, ProdutoService, PrevisaoEntregaProdutoService } from 'src/app/services';
import { Fornecedor, Produto, ProdutoChegada } from 'src/app/domain';
import { MenuItem, MessageService } from 'primeng/components/common/api';

@Component({
    selector: 'app-previsao-cadastro',
    templateUrl: './previsao-cadastro.component.html',
    styleUrls: ['./previsao-cadastro.component.css']
})
export class PrevisaoCadastroComponent implements OnInit {

    previsaoForm: FormGroup;
    @ViewChild('dtRowData', { static: false }) dtRowData: ElementRef;
    @ViewChild('inputCodigo', { static: false }) inputCodigo: ElementRef;
    @ViewChild('inputPeso', { static: false }) inputPeso: ElementRef[];
    fornecedores: Fornecedor[];

    displayProduto = false;
    produtosTemp: Produto[];
    produto: Produto;
    produtoChegada: ProdutoChegada;
    index: number;
    produtoChegadaSelect: any;
    renderer: Renderer2;

    items: MenuItem[];

    constructor(private previsaoEntregaService: PrevisaoEntregaProdutoService,
        private fornecedorProdutoService: FornecedorProdutoService,
        private produtoService: ProdutoService,
        private messageService: MessageService) { }

    ngOnInit() {
        this.produto = new Produto();
        this.produtoChegada = new ProdutoChegada();
        this.previsaoForm = new FormGroup({
            'fornecedorProduto': new FormControl(null, Validators.required),
            'dataPrevisaoEntrega': new FormControl(new Date(), Validators.required),
            'observacao': new FormControl(),
            'produtosChegada': new FormArray([
                new FormGroup({
                    'pesoProdutoChegada': new FormControl(null, Validators.required),
                    'produto': new FormGroup({
                        'idProduto': new FormControl(null, Validators.required),
                        'codigo': new FormControl(null),
                        'descricao': new FormControl(null, Validators.required)
                    })
                })
            ])
        });

        this.items = [
            { label: 'Deletar', icon: 'pi pi-trash', command: (event) => this.onDelete(this.produtoChegadaSelect.value) }
        ];
    }

    onSubmit() {
        console.log(this.previsaoForm.value);
        this.previsaoEntregaService.salvarPrevisao(this.previsaoForm.value).subscribe(
            onSuccess => {
                this.messageService.add({ severity: 'success', summary: '', detail: 'Salvo Com Sucesso' });
                this.previsaoForm.reset();
                this.ngOnInit();
                console.log(onSuccess);
            },
            onErr => console.log(onErr)
        );
    }

    searchFornecedor(event: any) {
        this.fornecedorProdutoService.getFornecedorStartingWith(event.query).subscribe(
            (result: any) => this.fornecedores = result,
            onErr => console.log(onErr)
        );
    }

    searchProdutos(event) {
        this.produtoService.getProdutosStartingWith(event.query).subscribe(
            (produtos: any) => { this.produtosTemp = produtos; },
            onErr => console.log(console.error())
        );
    }

    searchProdutosContais(event) {
        this.produtoService.getAllProdutosContains(event.query).subscribe(
            (produtos: any) => { this.produtosTemp = produtos; console.log(produtos); },
            onErr => console.log(console.error())
        );
    }

    onSelectProduto(event) {
        this.produto = event;
    }

    insertProduto() {
        this.produtoChegada.produto = this.produto;
        if (this.isProdutoExistente(this.produtoChegada.produto) && this.index != null) {
            (<FormArray>this.previsaoForm.get('produtosChegada')).at(this.index).patchValue({
                'pesoProdutoChegada': this.produtoChegada.pesoProdutoChegada,
                'produto': {
                    'idProduto': this.produtoChegada.produto.idProduto,
                    'codigo': this.produtoChegada.produto.codigo,
                    'descricao': this.produtoChegada.produto.descricao
                }
            });
        } else {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Produto Já Existente na Lista' });
            (<FormArray>this.previsaoForm.get('produtosChegada')).at(this.index).reset();
        }
    }

    addColummProduto(value: any) {
        if (value !== '') {
            (<FormArray>this.previsaoForm.get('produtosChegada')).push(
                new FormGroup({
                    'pesoProdutoChegada': new FormControl(null),
                    'produto': new FormGroup({
                        'idProduto': new FormControl(null, Validators.required),
                        'codigo': new FormControl(null),
                        'descricao': new FormControl(null, Validators.required)
                    })
                })
            );
        }
    }

    addProduto(event, inputCodigo: string, index: number) {

        if (inputCodigo !== '') {
            this.produtoService.getProdutoByCodigo(inputCodigo).subscribe(
                (produto: any) => {
                    if (produto != null) {
                        if (this.isValidProduto(produto)) {
                            (<FormArray>this.previsaoForm.get('produtosChegada')).at(index).patchValue({
                                'produto': {
                                    'descricao': produto.descricao,
                                    'idProduto': produto.idProduto,
                                    'codigo': produto.codigo
                                }
                            });
                        } else {
                            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Produto Já Existente na Lista' });
                            (<FormArray>this.previsaoForm.get('produtosChegada')).at(index).reset();
                        }
                    } else {
                        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Produto Não Encontrado' });
                        (<FormArray>this.previsaoForm.get('produtosChegada')).at(index).reset();
                    }
                }
            );
        }
    }

    isValidProduto(produto: any): boolean {
        const lista: any[] = this.previsaoForm.controls['produtosChegada'].value;
        for (let i = 0; i < lista.length; i++) {
            if (lista[i].produto.idProduto === produto.idProduto) {
               return false;
            }
        }
        return true;
    }

    limpar(index) {
        (<FormArray>this.previsaoForm.get('produtosChegada')).at(index).reset();
    }

    onSearch(rowData, index) {
        this.index = index;
        this.produto = new Produto();
        this.produtoChegada = new ProdutoChegada();
    }

    onDelete(value: any) {
        let index = 0;
        for (const produto of this.previsaoForm.get('produtosChegada').value) {
            if (produto === value) {
                (<FormArray>this.previsaoForm.get('produtosChegada')).removeAt(index);
            }
            index++;
        }
    }

    isProdutoExistente(result: any): boolean {
        for (const lista of this.previsaoForm.get('produtosChegada').value) {
            console.log(lista);
            console.log(result);
            if (lista.produto.idProduto === result.idProduto) {
                console.log('====');
                return false;
            }
        }
        console.log('!=');
        return true;
    }
}
