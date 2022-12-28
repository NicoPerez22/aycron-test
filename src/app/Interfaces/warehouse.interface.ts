export interface Warehouse {
    id?: number;
    name: string;
    code: string;
    address: string;
    state: string;
    country: string;
    zip: string;
    files: Array<any>;
}