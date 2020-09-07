import { PedidoService } from 'src/app/services';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-patios',
  templateUrl: './patios.component.html',
  styleUrls: ['./patios.component.css']
})
export class PatiosComponent implements OnInit {

  pedidos: any[];
  formPedidoSeparacao: FormGroup;

  constructor(private pedidoService: PedidoService) { }

  ngOnInit() {
      this.formPedidoSeparacao = new FormGroup({
          'pedidoSeparacao' : new FormArray([])
      });
      this.pedidoService.findAllPedido().subscribe(
          (onSuccess: any[]) => {
              console.log(onSuccess);
              this.pedidos = onSuccess;
              onSuccess.forEach(pedidoAux => {
                (<FormArray>this.formPedidoSeparacao.get('pedidoSeparacao')).push(
                    new FormGroup({
                        pedido : new FormGroup({
                            idPedido : new FormControl(
                                pedidoAux.idPedido
                            ),
                            createdDate : new FormControl(
                                pedidoAux.createdDate
                            ),
                            checkOut : new FormControl(
                                pedidoAux.checkOut
                            ),
                            localizacaoPedido : new FormControl(
                                pedidoAux.localizacaoPedido
                            ),
                            entradaPedido : new FormGroup({
                                cliente : new FormControl(
                                    pedidoAux.entradaPedido.cliente
                                )
                            }),
                            pedidoSeparacao : new FormGroup({
                                separado : new FormControl(
                                    pedidoAux.pedidoSeparacao.separado
                                )
                            })
                        })
                    })
                );
              });
              console.log(this.formPedidoSeparacao);
            },
          onErr => {}
      );
  }

  salvarPedidoSeparacao(rowData: any) {
    const pedidoSeparacao = {
        'separado' : true,
        'pedido' : rowData.pedido
    };
    console.log(pedidoSeparacao);
    this.pedidoService.salverPedidoSeparacao(pedidoSeparacao).subscribe(
        onSuccess => {console.log(onSuccess); },
        onErr => {}
    );
  }

}
