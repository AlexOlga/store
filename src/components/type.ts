interface IProductItem {
    id: number;
    name: string;
    urlToImage: string;
    time: number;
    placeVizit: Array<string>;
    description: string;
    range: number;
    price: number;
    favorit: boolean;
}
type arrayProducts = Array<IProductItem>;
type GenericCallback<T> = (data?: T) => void;
export { arrayProducts, IProductItem, GenericCallback }