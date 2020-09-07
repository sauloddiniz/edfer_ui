export class Usuario {
    constructor(
        public id?: number,
        public nome?: string,
        public senha?: string,
        public ativo?: boolean,
        public telefone?: string,
        public email?: string,
        public dataNascimento?: Date,
        public tipoUsuario?: string,
        public perfil?: string[]
    ) {}
}
