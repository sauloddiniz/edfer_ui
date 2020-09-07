import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ParteDiariaService, VeiculoService } from 'src/app/services';
import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/components/common/selectitem';

@Component({
    selector: 'app-consulta-diaria',
    templateUrl: './consulta-diaria.component.html',
    styleUrls: ['./consulta-diaria.component.css']
})

export class ConsultaDiariaComponent implements OnInit {
    parteDiaria: any[];
    totalRecords: number;
    veiculos: SelectItem[] = [];
    display = false;

    constructor(
        private parteDiariaService: ParteDiariaService,
        private veiculoService: VeiculoService,
        private confirmationService: ConfirmationService,
        private router: Router
    ) {}

    ngOnInit() {
        this.getListVeiculo();
    }

    private getListVeiculo() {
        this.veiculoService.getVeiculos().subscribe(
            (veiculos: any[]) => {
                veiculos.forEach(veiculo => this.veiculos.push(
                    {label: veiculo.modelo + ' - ' + veiculo.placa, value: veiculo.idVeiculo}
                ));
            }
        );
    }

    loadParteDiaria(event: any) {

        let veiculos = '';
        let dataParteDiariaMin = '';
        let dataParteDiariaMax = '';
        let cliente = '';
        let nota = '';

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

        if (event.filters.veiculos) {
            veiculos = event.filters.veiculos.value;
        }

        if (event.filters.dataParteDiariaMin) {
            dataParteDiariaMin = event.filters.dataParteDiariaMin.value;
        }

        if (event.filters.dataParteDiariaMax) {
            dataParteDiariaMax = event.filters.dataParteDiariaMax.value;
        }

        if (event.filters.cliente) {
            cliente = event.filters.cliente.value;
        }

        if (event.filters.nota) {
            nota = event.filters.nota.value;
        }

        this.parteDiariaService.getListByCriteria(
            sortField,
            sortOrder,
            first,
            rows,
            veiculos,
            cliente,
            nota,
            dataParteDiariaMin,
            dataParteDiariaMax
            ).subscribe(
                (response: any) => {
                    console.log(response);
                    this.parteDiaria = response.objs;
                    this.totalRecords = response.totalList;
            },
            onErr => {
                console.log('err', onErr);
            }
        );
    }

    confirmChange(idParteDiaira: number) {
        console.log(idParteDiaira);
        this.confirmationService.confirm({
            message: 'Deseja Fazer Alteração?',
            accept: () => {
                this.router.navigate([`veiculo/diaria/${idParteDiaira}/edit`]);
            }
        });
    }
}
