type GenericCallback<T> = (data?: T) => void;
import { arrayProducts } from './type'
export class Model {
    baseLink: string;
    constructor(baseLink: string) {
        this.baseLink = baseLink;
    }
    load(callback: GenericCallback<arrayProducts>): void {
        fetch(this.baseLink)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err: Error) => console.error(err));
    }
    sorting(productsOnPageArray: Array<HTMLElement>, sortingStatus: string) {
        if (sortingStatus === "0") return;
        const productsContener = (document.querySelector('.products') as HTMLElement);
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
