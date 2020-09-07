import { Component, OnInit } from '@angular/core';
import { PrevisaoEntregaProdutoService } from 'src/app/services';

@Component({
    selector: 'app-previsao-consulta',
    templateUrl: './previsao-consulta.component.html',
    styleUrls: ['./previsao-consulta.component.css']
})
export class PrevisaoConsultaComponent implements OnInit {

    previsoes: any[];

    constructor(private previsaoService: PrevisaoEntregaProdutoService) { }

    ngOnInit() {
        this.previsoes = [];
        this.previsaoService.getAllPrevisao().subscribe(
            (previsoes: any) => {this.previsoes = previsoes; },
            onErr => console.log(onErr)
        );
    }

}
