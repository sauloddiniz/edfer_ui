import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
moment.locale('pt-br');

@Pipe({
  name: 'hourLog'
})
export class HourLogPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        const duration = moment.duration(value, 'seconds');
        return duration.toISOString().substr(2);
      }

}
