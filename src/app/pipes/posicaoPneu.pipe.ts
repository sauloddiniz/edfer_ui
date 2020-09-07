import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'posicaoPneu'
})
export class PosicaoPneuPipe implements PipeTransform {

  transform(value: any[], args?: any): any {
    const index = value.length;
    const historico = value[index - 1];
    const eixo = historico.numeroEixo;
    let posicao = '';
    console.log(historico.posicao);
    if (historico.posicao === 'Esquerdo') {
        posicao = 'E';
    } else if (historico.posicao === 'Direito' || historico.posicao === 'Dianteiro' ) {
        posicao = 'D';
    } else if (historico.posicao === 'Esquerdo Dentro') {
        posicao = 'ED';
    } else if (historico.posicao === 'Esquerdo Fora') {
        posicao = 'EF';
    } else if (historico.posicao === 'Direito Dentro') {
        posicao = 'DD';
    } else if (historico.posicao === 'Direito Fora') {
        posicao = 'DF';
    } else if (historico.posicao === 'Trazeiro') {
        posicao = 'T';
    }

    return `${eixo} : ${posicao}`;
  }

}
