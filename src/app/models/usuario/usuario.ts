export interface Usuario{
    id?:string;
    email:string;
    password:string;



    rol:'ADMIN' | 'CLIENTE';
}