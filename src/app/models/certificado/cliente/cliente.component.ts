import { MessageService } from 'primeng/primeng';
import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { CertificadoService } from '../../certificado/certificado.service';

@Component({
    selector: 'app-cliente',
    templateUrl: './cliente.component.html',
    styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

    rows: any[];
    columns: any[];
    foot: any[];
    numPedido: string;
    cliente: string;
    dialog = false;
    produto: any;
    rowCreated: any;
    produtos: any[];
    disabled = false;

    constructor(private certificadoService: CertificadoService,
                private messageService: MessageService) {}

    ngOnInit() {
        this.rowCreated = {
            item: null,
            produto: null,
            numCertificado: null,
            numNfs: '',
            nomeRecebedor: '',
            assin: ''
        };
    }

    searchCliente(value: any) {
        this.numPedido = value;
        this.certificadoService.getClienteByNumeroPedido(value).subscribe(
            (clientes: any[]) => {
                let index = 1;
                const rows = [];
                for (const cliente of clientes) {
                    if (cliente.nome != null) {
                        this.cliente = cliente.nome;
                    }
                    const certificado = cliente.produtoCertificadoAux.certificado;
                    const produto = cliente.produtoCertificadoAux.produto;
                    rows.push({
                        item: index,
                        produto: produto.classe + ' ' + produto.descricao,
                        numCertificado: certificado.numero,
                        corrida: cliente.produtoCertificadoAux.corrida,
                        numNfs: '',
                        nomeRecebedor: '',
                        assin: ''
                    });
                    index++;
                }

                const columns = [
                    { title: 'Item', dataKey: 'item' },
                    { title: 'Produto', dataKey: 'produto' },
                    { title: 'Corrida', dataKey: 'corrida' },
                    { title: 'Nº Certificado', dataKey: 'numCertificado' },
                    { title: 'Nº Nota Fiscal', datakey: 'numNfs' },
                    { title: 'Nome recebedor', dataKey: 'nomeRecebedor' },
                    { title: 'Assinatura', dataKey: 'assin' }
                ];

                const foot = [
                    {
                        content: `OC: ${this.numPedido} - Cliente: ${this.cliente}`,
                        colSpan: 4,
                        rowSpan: 1,
                        styles: { halign: 'Left' }
                    },
                    {
                        content: 'Data da Entrega: ____/_____/_______',
                        colSpan: 3,
                        rowSpan: 1,
                        styles: { halign: 'Left' }
                    }
                ];
                this.rows = rows;
                this.columns = columns;
                this.foot = foot;
                this.disabled = true;
            },
            responseErr => {

                if (responseErr.status === 404) {
                    this.messageService.add({severity: 'error', summary: '404', detail: 'Nº Pedido não encontrado'});
                }
            }
        );
    }

    removeRow(rowData) {
        const index = this.rows.indexOf(rowData);
        this.rows.splice(index, 1);
        this.orderNumber();
    }

    private orderNumber() {
        let item = 1;
        for (const row of this.rows) {
            row.item = item;
            item++;
        }
        if (this.rows.length === 0) {
            this.disabled = false;
        }
    }

    public createPdf() {
        if (this.disabled) {
            const doc = new jsPDF({
                orientation: 'l',
                unit: 'mm',
                format: 'a4',
                putOnlyUsedFonts: true
            });

            doc.setLineWidth(0.3);
            doc.line(14, 4, 283, 4);
            doc.line(14, 4, 14, 27);
            doc.line(283, 4, 283, 27);
            doc.line(59, 4, 59, 27);
            doc.line(14, 27, 283, 27);

            doc.text('PROTOCOLO DE ENTREGA DE CERTIFICADOS', 100, 18);

            doc.addImage(this.image(), 'PNG', 17, 5, 40, 20);
            doc.autoTable(this.columns, this.rows, {
                foot: [this.foot],
                theme: 'grid',
                margin: { top: 27.5 }
            });
            doc.save(this.numPedido + '.pdf');
        }
    }

    public addItem() {
        if (this.disabled) {
            this.dialog = true;
        }
    }

    public clean() {

    }

    public incluir() {
        this.rows.push(this.rowCreated);
        this.dialog = false;
        this.rowCreated = {
            item: null,
            produto: null,
            numCertificado: null,
            corrida: null,
            numNfs: '',
            nomeRecebedor: '',
            assin: ''
        };
        this.orderNumber();
    }

    public searchProduto(event: any) {
        this.certificadoService.getProdutoStartingWithCodigo(event.query)
        .subscribe(
            succes => {
                this.produtos = succes;
            }
        );
    }

    onSelect(event) {
        this.rowCreated.produto = event.classe + ' ' + event.descricao;
    }

    private image(): string {
        // tslint:disable-next-line:max-line-length
        return 'data:image/png;base64,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';
    }
}
