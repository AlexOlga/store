interface IProductItem {
    id: number;
    name: string;
    urlToImage: string;
    time: number;
    placeVizit: Array<string>;
    placeVizitId: Array<string>;
    description: string;
    range: number;
    price: number;
    favorit: boolean;
}
type arrayProducts = Array<IProductItem>;
type GenericCallback<T> = (data?: T) => void;

interface Ifilter {
    SliderTime: [number, number];
    SliderRange: [number, number];
    typeSorting: string;
    productInCart: string;
    placeVizitId: string;
    favorit: boolean;
}
export { arrayProducts, IProductItem, GenericCallback, Ifilter }