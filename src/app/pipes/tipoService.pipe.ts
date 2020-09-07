import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipoService'
})
export class TipoServicePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value === 0) {
        return 'Item';
    }
    return 'Serviço';
  }

}
