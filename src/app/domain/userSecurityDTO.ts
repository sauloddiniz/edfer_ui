export class UserSecurityDTO {
    constructor(
        public email?: string,
        public authorities?: string[]
    ) {}
}
