
export interface IDiscountRequest{
    name: string,
    description: string;
    imgPath: string;
}

export interface IDiscountResponse extends IDiscountRequest {
    id: number;
}