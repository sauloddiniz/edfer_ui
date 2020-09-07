import { Table } from 'primeng/table';

import { CertificadoService } from './../certificado.service';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService, MenuItem } from 'primeng/components/common/api';
import { SharedService } from 'src/app/services';
import { Cliente } from 'src/app/domain';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

    @ViewChild('dt1', {static: false}) dt1: Table;
    certificadoForm: FormGroup;
    listCodigoProdutos = [];
    listFornecedor = [];
    listNorma = [];
    shared: SharedService;

    certificados = [];
    totalRecords: number;


    items: MenuItem[];
    selectCertificado: any;

    sideBarCliente = false;
    dialogCliente = false;
    cliente: Cliente;
    listCliente: any[];
    produtos: any[];

    constructor(private certificadoService: CertificadoService,
                private messageService: MessageService) {
    this.shared = SharedService.getInstance();
                }

  ngOnInit() {
    this.cliente = new Cliente(null, null, null, null, new Date().toLocaleDateString());
      this.certificados = [];
      this.certificadoForm = new FormGroup({
        idCertificado : new FormControl(null),
        fornecedor: new FormControl(null, Validators.required),
        dataEmissao: new FormControl(null, Validators.required),
        numero: new FormControl(null, Validators.required),
        norma : new FormControl(null, Validators.required),
        dimensao: new FormControl(null),
        numeroNotaFiscal: new FormControl(null),
        pdf: new FormControl(false),
        produtoCertificadoAux: new FormArray([
            new FormGroup({
                idProdutoCertificadoAux: new FormControl(null),
                corrida: new FormControl(null),
                volume: new FormControl(null),
                peso: new FormControl(null),
                produto: new FormGroup({
                    idProdutoCertificado : new FormControl(null, Validators.required),
                    codigo: new FormControl(null, Validators.required),
                    classe: new FormControl(null),
                    descricao: new FormControl(null),
                })
            })
        ])
      });

      this.items = [
        { label: 'Cliente', icon: 'pi pi-plus', command: (event) => {
            this.dialogCliente = true;
            this.cliente.idCertificado = this.selectCertificado.idCertificado;
            this.produtos = [];
            for (const produtoAuxi of this.selectCertificado.produtoCertificadoAux) {
                const labelAux = `${produtoAuxi.produto.codigo} - ${produtoAuxi.corrida}`;
                this.produtos.push(
                    {label: labelAux, value: produtoAuxi}
                    );
            }
        } },
    ];
  }

  onSubmit() {
      const certificado = this.certificadoForm.value;
      if (certificado.idCertificado === null) {
          this.certificadoService
              .saveCertificado(this.certificadoForm.value)
              .subscribe(
                  success => {
                      this.messageService.add({
                          severity: 'success',
                          summary: '',
                          detail: 'Cadastro efetuado com sucesso'
                      });
                      this.certificadoForm.reset();
                      let x = (<FormArray>(
                          this.certificadoForm.get('produtoCertificadoAux')
                      )).length;
                      while (x >= 1) {
                          (<FormArray>(
                              this.certificadoForm.get('produtoCertificadoAux')
                          )).removeAt(x);
                          x--;
                      }
                      this.dt1._filter();
                      this.messageService.add({severity: 'success', summary: '', detail: 'Salvo com sucesso'});
                  },
                    (responseErr) => {
                        if (responseErr.error.field === 'dadoIncorreto') {
                           console.log(responseErr.error.defaultMessage);
                        }
                        for (const erro of responseErr.error) {
                            this.certificadoForm.controls[erro.field].setErrors(
                                {field: erro.field, message: erro.defaultMessage}
                            );
                            this.messageService.add({
                                severity: 'error',
                                summary: '',
                                detail: erro.defaultMessage
                            });
                        }
                  }
              );
      } else if (certificado.idCertificado !== null) {
        this.certificadoService
        .updateCertificado(certificado)
        .subscribe(
            success => {
                this.messageService.add({
                    severity: 'success',
                    summary: '',
                    detail: 'Cadastro efetuado com sucesso'
                });
                this.certificadoForm.reset();
                let x = (<FormArray>(
                    this.certificadoForm.get('produtoCertificadoAux')
                )).length;
                while (x >= 1) {
                    (<FormArray>(
                        this.certificadoForm.get('produtoCertificadoAux')
                    )).removeAt(x);
                    x--;
                }
                this.dt1._filter();
                this.messageService.add({severity: 'success', summary: '', detail: 'Salvo com sucesso'});
            },
              (responseErr) => {
                  if (responseErr.error.field === 'dadoIncorreto') {
                     console.log(responseErr.error.defaultMessage);
                  }
                  for (const erro of responseErr.error) {
                      this.certificadoForm.controls[erro.field].setErrors(
                          {field: erro.field, message: erro.defaultMessage}
                      );
                      this.messageService.add({
                          severity: 'error',
                          summary: '',
                          detail: erro.defaultMessage
                      });
                  }
            }
        );
      }
  }

  completeIdProduto(event: any) {
        this.certificadoService.getProdutoStartingWithCodigo(event.query).subscribe(
            (produtos: any[]) => {
                this.listCodigoProdutos = [];
                produtos.forEach(produto => this.listCodigoProdutos.push(produto));
             },
            err => {console.log(err); }
        );
  }

  addListFornecedor(event: any) {
    this.certificadoService.getStartingWithFornecedor(event.query).subscribe(
        (fornecedores: String[]) => {
            this.listFornecedor = [];
            fornecedores.forEach(fornecedor => this.listFornecedor.push(fornecedor)); },
        err => {console.log(err); }
    );
  }

  addListNorma(event: any) {
  this.certificadoService.getStartingWithNorma(event.query).subscribe(
      (normas: String[]) => {
          this.listNorma = [];
          normas.forEach(norma => this.listNorma.push(norma)); },
      err => {console.log(err); }
  );
}

  addRow() {
      (<FormArray>this.certificadoForm.get('produtoCertificadoAux')).push(
          new FormGroup({
            idProdutoCertificadoAux: new FormControl(null),
            corrida: new FormControl(null),
            volume: new FormControl(null),
            peso: new FormControl(null),
            produto: new FormGroup({
                idProdutoCertificado : new FormControl(null),
                codigo: new FormControl(null),
                classe: new FormControl(null),
                descricao: new FormControl(null),
            })
        })
    );
  }

  removeRow(index: number) {
    if (index >= 1 && index !== null) {
        (<FormArray>this.certificadoForm.get('produtoCertificadoAux')).removeAt(index);
        }
    }

    loadCertificados(event: any) {
        let codigo = '';
        let dateMin = '';
        let dateMax = '';
        let numero = '';
        let fornecedor = '';
        let norma = '';
        let corrida = '';
        let dimensao = '';
        let volume = '';

        let sortField: string;
        let sortOrder: string;
        const first = event.first;
        const rows = event.rows;

        if (event.filters.codigo) {
            codigo = event.filters.codigo.value;
        }

        if (event.filters.numero) {
            numero = event.filters.numero.value;
        }

        if (event.filters.fornecedor) {
            fornecedor = event.filters.fornecedor.value;
        }

        if (event.filters.norma) {
            norma = event.filters.norma.value;
        }

        if (event.filters.corrida) {
            corrida = event.filters.corrida.value;
        }

        if (event.filters.volume) {
            volume = event.filters.volume.value;
        }

        if (event.filters.dimensao) {
            dimensao = event.filters.dimensao.value;
        }

        if (event.filters.dateMin) {
            dateMin = event.filters.dateMin.value;
        }

        if (event.filters.dateMax) {
            dateMax = event.filters.dateMax.value;
        }

        if (event.sortField === undefined) {
            sortField = '';
            sortOrder = '';
        } else {
            sortField = event.sortField;
            sortOrder = event.sortOrder;
        }

        this.certificadoService.getCertificadoByCriteria(
            first,
            rows,
            sortField,
            sortOrder,
            codigo,
            dateMin,
            dateMax,
            numero,
            fornecedor,
            norma,
            corrida,
            volume,
            dimensao)
            .subscribe(
            (obj: any) => {
                this.certificados = [];
                this.certificados = obj.objs;
                this.totalRecords = obj.totalList;
            },
            err => {console.log(err); }
        );
    }

    updateCertificado(certificado: any) {

        let x = (<FormArray>this.certificadoForm.get('produtoCertificadoAux')).length;
        while ( x >= 0) {
            (<FormArray>this.certificadoForm.get('produtoCertificadoAux')).removeAt(x);
            x--;
        }

        this.certificadoForm.patchValue({
            idCertificado : certificado.idCertificado,
            fornecedor: certificado.fornecedor,
            dataEmissao: certificado.dataEmissao,
            numero: certificado.numero,
            dimensao: certificado.dimensao,
            norma : certificado.norma,
            numeroNotaFiscal: certificado.numeroNotaFiscal,
            pdf: certificado.pdf,
        });

        for (const aux of certificado.produtoCertificadoAux) {
            const produtoAux = new FormGroup({
                idProdutoCertificadoAux: new FormControl(aux.idProdutoCertificadoAux),
                corrida: new FormControl(aux.corrida),
                volume: new FormControl(aux.volume),
                peso: new FormControl(aux.peso),
                produto: new FormGroup({
                    idProdutoCertificado : new FormControl(aux.produto.idProdutoCertificado),
                    codigo: new FormControl(aux.produto.codigo),
                    classe: new FormControl(aux.produto.classe),
                    descricao: new FormControl(aux.produto.descricao),
                })
            });

            (<FormArray>this.certificadoForm.get('produtoCertificadoAux')).push(produtoAux);
        }
    }

    openCertificado(certificado: any) {
        let url = null;
        if (certificado.pdf) {
          url = `http://192.168.1.5:8887/${certificado.numero}.pdf`;
        } else {
          url = `http://192.168.1.5:8887/${certificado.numero}.jpg`;
        }
        window.open(url);
    }

    showListCliente(certificado: any) {
        this.certificadoService.getClienteByCertificado(certificado.idCertificado).subscribe(
            (clientes: any[]) => {
                this.listCliente = [];
                this.listCliente = clientes;
            },
            err => {console.log(err); }
        );
        this.sideBarCliente = true;
    }

    salvarCliente() {
        if (this.cliente.produtoCertificadoAux == null) {
            this.cliente.produtoCertificadoAux = this.produtos[0].value;
        }
        this.certificadoService.saveCliente(this.cliente).subscribe(
            responseSuccess => {
                this.cleanCliente();
                this.messageService.add({severity: 'success', summary: '', detail: 'Cliente cadastrado com sucesso'});
              },
            responseErr => {
                for (const error of responseErr.error.errors) {
                    this.messageService.add({severity: 'error', summary: 'Atenção', detail: error.defaultMessage});
                }
            }
        );
    }

    cleanCliente() {
        this.cliente = new Cliente(null, null, null, null, new Date().toLocaleDateString());
        this.dialogCliente = false;
    }

    copyRow() {
      const lastValue = (<FormArray>this.certificadoForm.get('produtoCertificadoAux')).length;
      const produto = ((<FormArray>this.certificadoForm.get('produtoCertificadoAux')).at(lastValue - 1).get('produto')).value;

      (<FormArray>this.certificadoForm.get('produtoCertificadoAux')).push(
        new FormGroup({
          idProdutoCertificadoAux: new FormControl(null),
          corrida: new FormControl(null),
          volume: new FormControl(null),
          peso: new FormControl(null),
          produto: new FormGroup({
              idProdutoCertificado : new FormControl(produto.idProdutoCertificado),
              codigo: new FormControl(produto.codigo),
              classe: new FormControl(produto.classe),
              descricao: new FormControl(produto.descricao),
            })
        })
        );
    }

    onSelectedProduto(event: any, index) {
        (<FormArray>this.certificadoForm.get('produtoCertificadoAux')).at(index).patchValue({
            produto: {
                idProdutoCertificado : event.idProdutoCertificado,
                codigo: event.codigo,
                classe: event.classe,
                descricao: event.descricao,
            }
        });
      }
}
