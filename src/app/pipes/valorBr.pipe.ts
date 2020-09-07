import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'valorBr'
})
export class ValorBrPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (args === 'valorBr') {
        if (value !== null) {
            const x: number = parseFloat(value);
            return x.toLocaleString('pt-BR', {minimumFractionDigits: 2});
        }
    }
    return null;
  }

}
