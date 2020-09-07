import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipoTelefone'
})
export class TipoTelefonePipe implements PipeTransform {

  transform(value: string, args?: any): any {
    if (args === 'telefone') {
        if (value.length === 11) {
            const celular = `(${value.slice(0, 2)})${value.slice(2, 7)}-${value.slice(7, 11)}`;
            return celular;
        } else if (value.length === 10) {
            const telefone = `(${value.slice(0, 2)})${value.slice(2, 6)}-${value.slice(6, 10)}`;
            return telefone;
        }
       }
    if (args === 'valorOrcamento') {
        if (value !== null) {
            const x: number = parseFloat(value);
            return x.toLocaleString('pt-BR', {minimumFractionDigits: 2});
        }
    }
       return value;
    }
}
