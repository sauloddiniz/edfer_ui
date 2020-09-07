import { Motorista } from './motorista';

export class Veiculo {
    constructor(
        public placa?: string,
        public modelo?: string,
        public motorista?: Motorista,
        public pesoSuportado?: number
    ) {}
}
