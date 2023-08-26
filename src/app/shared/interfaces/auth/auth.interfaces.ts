import { IProductResponse } from "../product/products.interfaces"

export interface ILogin {
    email: string,
    pass: string,
}

export interface IUpdate extends ILogin{
    id: number,
    fName: string,
    sName: string,
    role: string
}

export interface ICheckOut {
    products: Array<IProductResponse>;
    cutlery: number;
    studyCutlery: boolean;
    payment: string;
    name: string;
    number: number;
    delivery: string;
    inAdvance: boolean;
    deliveryDate: string;
    deliveryInterval: string;
    pickupPoints: string;
    street: string;
    building: string;
    entrance: string;
    apartment: string;
    callMe: boolean;
    comment: string;
    kitchenComment: string;
    totalSumm: number;
}