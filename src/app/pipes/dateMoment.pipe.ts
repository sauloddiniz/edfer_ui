import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
moment.locale('pt-br');

@Pipe({
  name: 'dateMoment'
})
export class DateMomentPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return moment(value).format('DD/MM/YYYY HH:mm');
  }
}
