import { Products } from "./view";
import { Model } from "./model";

/*interface Ifilter {
    SliderTime: [number, number];
    typeSorting: string;
    productInCart: string;   
}*/

export class Controller {
    model: Model;
    view: Products;
    SliderTime: [number, number];
    typeSorting: string;
    productInCart: string;
    maxProductsInCart: number;
    constructor(baseLink: string, maxProductsInCart: number, SliderTime: [number, number], typeSorting: string, productInCart = '') {
        this.model = new Model(baseLink);
        this.view = new Products();
        this.SliderTime = SliderTime;
        this.typeSorting = typeSorting;
        this.productInCart = productInCart;
        this.maxProductsInCart = maxProductsInCart
    }
    start() {
        this.model.load((data) => {
            if (data !== undefined) this.view.draw(data);
        })
    }

    isFullCart(cartNumber: number): boolean {
        return (cartNumber === this.maxProductsInCart) ? true : false;
    }

    handleProduct(e: Event) {
        const elm = e.target as HTMLElement;
        if (elm.classList.contains("product__button")) {
            const cart = (document.querySelector('.cart__number') as HTMLElement)
            let cartNumber = cart.textContent ? +cart.textContent : 0;

            if (elm.dataset.add === "false") {
                if (this.isFullCart(cartNumber)) { alert("Извините, все слоты заполнены") }
                else {
                    this.view.addProductInCart(elm)
                    this.productInCart = this.productInCart + `${elm.dataset.id}&`
                    cartNumber++
                }
            }
            else {
                this.view.removeProductInCart(elm)
                this.productInCart = this.productInCart.replace(`${elm.dataset.id}&`, '');
                cartNumber--
            }
            cart.textContent = `${cartNumber}`
        }
    }

    handleSorting() {
        const sortingStatus = <HTMLSelectElement>document.querySelector(".sorting");
        this.typeSorting = sortingStatus.value
        const productsOnPageArray = this.view.getroductsOnPage();
        this.model.sorting(productsOnPageArray, sortingStatus.value)
    }

    handleSliderTime(values: number, handle: number) {
        this.SliderTime[handle] = values;
        this.model.load((data) => {
            data = data?.filter(item => (item.time >= this.SliderTime[0]) && (item.time <= this.SliderTime[1]));
            if (data !== undefined) this.view.draw(data);
            const productsOnPageArray = this.view.getroductsOnPage();
            productsOnPageArray.forEach((item) => {
                const elm = <HTMLElement>item.querySelector('.product__button')
                const idItem = elm.dataset.id;
                if (this.productInCart.indexOf(`${idItem}&`) !== -1) {
                    this.view.addProductInCart(elm);
                }
            })
            this.model.sorting(productsOnPageArray, this.typeSorting);
        }
        );
    }

}

