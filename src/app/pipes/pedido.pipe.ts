import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pedido'
})
export class PedidoPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    if (args === 'patio') {
        if (value === 0) {
            return 'Loja';
        } else if (value === 1) {
            return 'Vigas_6M';
        } else if (value === 2) {
            return 'Vigas_12M';
        } else if (value === 3) {
            return 'Chapas';
        } else if (value === 4) {
            return 'Telhas';
        } else if (value === 5) {
            return 'Oxicorte';
        } else if (value === 6) {
            return 'Miudezas';
        } else if (value === null) {
            return 'Selecione';
        }
    }

    if (args === 'status') {
        if (value === 0) {
            return 'Em Andamento';
        } else if (value === 1) {
            return 'Aguardando Nota';
        } else if (value === 2) {
            return 'Saiu Para Entrega';
        } else if (value === 3) {
            return 'Entrega Cancelada';
        } else if (value === null) {
            return 'Selecione';
        }
    }

    if (args === 'situacaoFinal') {
        if (value === 0) {
            return 'Entrega Realizada';
        } else if (value === 1) {
            return 'Entrega Realizada em Atraso';
        } else if (value === null) {
            return 'Selecione';
        }
    }
    return value;
  }
}
