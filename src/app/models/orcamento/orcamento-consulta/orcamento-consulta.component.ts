import { Component, OnInit } from '@angular/core';
import { OrcamentoService } from 'src/app/services';
import { SelectItem } from 'primeng/components/common/api';

@Component({
    selector: 'app-orcamento-consulta',
    templateUrl: './orcamento-consulta.component.html',
    styleUrls: ['./orcamento-consulta.component.css']
})
export class OrcamentoConsultaComponent implements OnInit {

    constructor(private orcamentoService: OrcamentoService) { }
    orcamentos: any[];
    rowGroupMetadata: any;
    formaPagamentoSelect: SelectItem[];
    selectFornecedor: any;

    ngOnInit() {
        this.formaPagamentoSelect = [
            {label: 'Selecione', value: null},
            {label: 'À Vista', value: 1 },
            {label: 'Parcelado', value: 2 }
        ];
        this.orcamentoService.getAll().subscribe(
            (fornecedores: any[]) => { this.orcamentos = fornecedores; console.log(this.orcamentos); },
            onErr => console.log(onErr)
        );
        this.updateRowGroup();
    }

    updateRowGroup() {
        this.rowGroupMetadata = {};
        if (this.orcamentos) {
            for (const orcamento of this.orcamentos) {
                for (let i = 0; i < orcamento.listaItemOrc.lenght; i++) {
                    console.log(orcamento.listaItemOrc[i]);
                    console.log(i);
                }
            }
        }
    }
}
