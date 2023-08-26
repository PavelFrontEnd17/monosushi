export interface IProductRequest{
    name: string;
    description: string;
    weight: number;
    cost: number;
    category: string;
    imgPath: string;
    count: number;
    path: string
}

export interface IProductResponse extends IProductRequest{
    id: number;
}

export interface ICutlery {
    count: number;
    cost: number;
}