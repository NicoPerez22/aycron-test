export class User {
    id: number;
    email: string;
    password: string;
    displayName: string;
    rol: string;
    idRol: number;

    constructor(obj?: any){
        this.id = obj && obj.id || 0;
        this.email = obj && obj.email || "";
        this.password = obj && obj.password || "";
        this.displayName = obj && obj.displayName || "";
        this.rol = obj && obj.rol || "";
        this.idRol = obj && obj.idRol || 0
    }
}