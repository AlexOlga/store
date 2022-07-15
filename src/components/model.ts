type GenericCallback<T> = (data?: T) => void;
import { arrayProducts } from './type'
export class Model {
    baseLink: string;
    maxProductsInCart: number;
    productInCart: string;
    //typeSorting: string;

    constructor(baseLink: string, maxProductsInCart: number, productInCart = "") {
        this.baseLink = baseLink;
        this.maxProductsInCart = maxProductsInCart;
        this.productInCart = productInCart;
        // this.typeSorting = typeSorting;
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
    addProductInCart(elm: HTMLElement) {
        elm.dataset.add = "true"
        elm.textContent = "Передумать"
    }
    removeProductInCart(elm: HTMLElement) {
        elm.dataset.add = "false"
        elm.textContent = "В корзину"
    }

    changeStatusProduct(elm: HTMLElement) {
        const cart = (document.querySelector('.cart__number') as HTMLElement)
        let cartNumber = cart.textContent ? +cart.textContent : 0;
        if (elm.dataset.add === "false") {
            if (this.isFullCart(cartNumber)) { alert("Извините, все слоты заполнены") }
            else {
                this.addProductInCart(elm)
                this.productInCart = this.productInCart + '$' + `${elm.dataset.id}`
                cartNumber++
            }
        }
        else {
            this.removeProductInCart(elm)
            this.productInCart = this.productInCart.replace('$' + `${elm.dataset.id}`, '');
            cartNumber--
        }
        cart.textContent = `${cartNumber}`
    }

    sorting(sortingStatus: string) {
        // this.typeSorting = sortingStatus
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
