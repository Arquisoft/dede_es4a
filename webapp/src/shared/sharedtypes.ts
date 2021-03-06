export type Producto = {
  _id?: string;
  category: string;
  name: string;
  description: string;
  urlImage: string;
  basePrice: number;
  units: number;
  onSale: boolean;
  IVA: number;
}

export enum Roles {ROLE_USER,ROLE_ADMIN}

export type User = {
  email?:string;
  dni?:string;
  username:string;
  password:string;
  confirmPassword?:string;
  token?:string;
  role?:Roles;
}

export type Item = {
  producto: Producto;
  num: number;
}

export type AddressType = {
  street_address: string;
  locality: string;
  region: string;
  postal_code: string;
  country_name: string;
}

export type OrderType = {
    _id: string;
    user: User;
    products: Item[];
    totalPrice: number;
    address?: AddressType;
    status?: string;
    receptionDate?: Date;
    shippingCost?: number;
}

export type PaymentMean = {
  name: string;
  surname: string;
  code: string;
  date: string;
  cvv: string;
}