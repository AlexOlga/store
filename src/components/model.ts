type GenericCallback<T> = (data?: T) => void;
import { arrayProducts } from './type'
export class Model {
    baseLink: string;
    maxProductsInCart: number;
    constructor(baseLink: string, maxProductsInCart: number) {
        this.baseLink = baseLink;
        this.maxProductsInCart = maxProductsInCart;
    }
    load(callback: GenericCallback<arrayProducts>): void {
        fetch(this.baseLink)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err: Error) => console.error(err));
    }
    isFullCart(cartNumber: number): boolean {
        return (cartNumber === this.maxProductsInCart) ? true : false;
    }
    sorting(sortingStatus: string) {
        if (sortingStatus === "0") return;
        const productsContener = (document.querySelector('.products') as HTMLElement);
        const productsOnPageList = productsContener.querySelectorAll('.product-item');
        const productsOnPageArray = Array.prototype.slice.call(productsOnPageList);
        if (sortingStatus === "alphabet-forvard") {
            productsOnPageArray.sort((a: HTMLElement, b: HTMLElement): number => {
                const elm1 = (a.querySelector('.product__name') as HTMLElement).textContent;
                const elm2 = (b.querySelector('.product__name') as HTMLElement).textContent;
                if (elm1 && elm2) {
                    if (elm1 < elm2) return -1;
                    if (elm1 > elm2) return 1;
                }
                return 0;

            });
        }
        if (sortingStatus === "alphabet-revers") {
            productsOnPageArray.sort((a: HTMLElement, b: HTMLElement): number => {
                const elm1 = (a.querySelector('.product__name') as HTMLElement).textContent;
                const elm2 = (b.querySelector('.product__name') as HTMLElement).textContent;
                if (elm1 && elm2) {
                    if (elm1 < elm2) return 1;
                    if (elm1 > elm2) return -1;
                }
                return 0;

            });
        }
        if (sortingStatus === "price-forvard") {
            productsOnPageArray.sort((a: HTMLElement, b: HTMLElement): number => {
                const elm1 = Number((a.querySelector('.product__price') as HTMLElement).textContent);
                const elm2 = Number((b.querySelector('.product__price') as HTMLElement).textContent);
                if (elm1 && elm2) {
                    if (elm1 < elm2) return -1;
                    if (elm1 > elm2) return 1;
                }
                return 0;

            });
        }
        if (sortingStatus === "price-revers") {
            productsOnPageArray.sort((a: HTMLElement, b: HTMLElement): number => {
                const elm1 = Number((a.querySelector('.product__price') as HTMLElement).textContent);
                const elm2 = Number((b.querySelector('.product__price') as HTMLElement).textContent);
                if (elm1 && elm2) {
                    if (elm1 > elm2) return -1;
                    if (elm1 < elm2) return 1;
                }
                return 0;

            });
        }
        productsContener.innerHTML = '';
        productsOnPageArray.forEach((item) => { productsContener.appendChild(item) });

    }
}
