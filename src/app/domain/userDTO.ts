import { UserSecurityDTO } from './userSecurityDTO';
export class UserDTO {
    constructor(
        public userSecurityDTO?: UserSecurityDTO,
        public token?: string,
    ) {}
}
