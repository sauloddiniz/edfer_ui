import { MessageService } from 'primeng/components/common/api';
import { Cliente } from './../../../domain/cliente';
import { CertificadoService } from './../certificado.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { SharedService } from 'src/app/services';
import { MenuItem } from 'primeng/api';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-certificado_produto',
  templateUrl: './certificado_produto.component.html',
  styleUrls: ['./certificado_produto.component.css']
})
// tslint:disable-next-line:class-name
export class Certificado_produtoComponent implements OnInit {

    @ViewChild('dt1', {static: false}) dt1: Table;
    @ViewChild('dt2', {static: false}) dt2: Table;
    produtoForm: FormGroup;
    loading = true;
    produtoCertificados: any[];
    totalRecords = 0;
    totalRecordsDt2 = 0;
    sideBarDisplay = false;
    idProduto = null;
    title = '';
    shared: SharedService;
    certificados = [];

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
      console.log(this.shared.simplePermicion('ADMINISTRADOR'));
      this.cliente = new Cliente(null, null, null, null, new Date().toLocaleDateString());
      this.produtoForm = new FormGroup({
          idProdutoCertificado: new FormControl(null),
          codigo : new FormControl(null, Validators.required),
          descricao : new FormControl(null, Validators.required),
          classe : new FormControl(null, Validators.required)
      });

      this.items = [
        { label: 'Cliente', icon: 'pi pi-plus', command: (event) => {
            this.cliente.idCertificado = this.selectCertificado.idCertificado;
            this.dialogCliente = true;
            this.produtos = [];
            for (const produtoAux of this.selectCertificado.produtoCertificadoAux) {
                this.produtos.push(
                    {label: produtoAux.produto.codigo, value: produtoAux}
                    );
            }
        } },
    ];
  }

  onSubmit() {
    this.certificadoService.save(this.produtoForm.value).subscribe(
        responseSuccess => {
            this.messageService.add({severity: 'success', summary: '', detail: 'Cadastrado efetuado com sucesso'});
            this.produtoForm.reset();
            this.dt1._filter();
        },
        responseErr => {
            for (const err of responseErr.error) {
                this.produtoForm.controls[err.field].setErrors(
                    {field: err.field, message: err.defaultMessage}
                );
                this.messageService.add({
                    severity: 'error',
                    summary: '406',
                    detail: err.defaultMessage
                });
            }
            console.log(this.produtoForm);
        }
    );
  }

  loadProdutos(event: any) {

    let codigo = '';
    let classe = '';
    let descricao = '';

    let sortField: string;
    let sortOrder: string;
    const first = event.first;
    const rows = event.rows;

    if (event.filters.codigo) {
        codigo = event.filters.codigo.value;
    }

    if (event.filters.classe) {
        classe = event.filters.classe.value;
    }

    if (event.filters.descricao) {
        descricao = event.filters.descricao.value;
    }

    if (event.sortField === undefined) {
        sortField = '';
        sortOrder = '';
    } else {
        sortField = event.sortField;
        sortOrder = event.sortOrder;
    }

    this.certificadoService.getAllProduto(
        first,
        rows,
        sortField,
        sortOrder,
        codigo,
        classe,
        descricao)
    .subscribe(
        (obj: any) => {
            this.produtoCertificados = [];
            this.produtoCertificados = obj.objs;
            this.totalRecords = obj.totalList;
            this.loading = false;
        },
        err => {console.log(err); }
    );
  }

  listCertificados(produto: any) {
    this.title = produto.codigo + ' ' + produto.classe + ' ' + produto.descricao;
    this.sideBarDisplay = true;
    this.certificados = [];
    this.certificadoService.getCertificadosByIdProduto(produto.idProdutoCertificado)
    .subscribe(
        (certificados: any[]) => {
            for (const certificado of certificados) {
                const corridas: string[] = [];
                const volumes: string[] = [];
                const pesos: string[] = [];
                for (const produtosAux of certificado.produtoCertificadoAux) {
                    corridas.push(produtosAux.corrida);
                    volumes.push(produtosAux.volume);
                    pesos.push(produtosAux.peso);
                }
                certificado.corridas = corridas;
                certificado.volumes = volumes;
                certificado.pesos = pesos;
                certificado.produtoCertificadoAux = certificado.produtoCertificadoAux;
                this.certificados.push(certificado);
            }
        },
        err => console.log(err)
    );
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

  onCloseSideBar() {
      this.certificados = [];
      this.title = '';
      this.sideBarDisplay = false;
      this.dt2.reset();
  }

  updateProduto(produto) {
      this.produtoForm.patchValue({
          idProdutoCertificado: produto.idProdutoCertificado,
          codigo : produto.codigo,
          descricao : produto.descricao,
          classe : produto.classe
      });
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
      this.produtos = [];
      this.cliente = new Cliente(null, null, null, null, new Date().toLocaleDateString());
      this.dialogCliente = false;
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
}
