export interface ICategoryRequire {
    name: string,
    path: string,
    imgPath: string
}

export interface ICategoryResponse extends ICategoryRequire{
    id: number
}