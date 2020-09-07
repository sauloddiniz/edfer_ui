import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
moment.updateLocale(moment.locale(), { invalidDate: 'Data Invalida'});

@Pipe({
  name: 'pipeListGenderDate'
})
export class PipeListGenderDatePipe implements PipeTransform {

    transform(value: any[], args?: any): any {
        const gender = value[(value.length) - 1];
    if (args === 'dataRetorno') {
        if (gender.dataRetorno === undefined){
            return 'nulo';
        } else {
            const valueDate = gender.dataRetorno;
            const date = moment(valueDate, 'DD/MM/YYYY HH:mm' );
            return date.format('DD/MM/YYYY HH:mm');
        }
    } else if (args === 'dataVisita') {
        const valueDate = gender.dataVisita;
        const date = moment(valueDate, 'DD/MM/YYYY');
        return date.format('DD/MM/YYYY');
    } else if (args === 'observacao') {
        return gender.observacao;
    } else if (args === 'status') {
        return gender.status;
    }
  }
}
