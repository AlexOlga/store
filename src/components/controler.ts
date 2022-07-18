import { Products } from "./view";
import { Model } from "./model";
import { arrayProducts, Ifilter } from './type'

export class Controller {
    model: Model;
    view: Products;
    maxProductsInCart: number;
    filterAll: Ifilter;
    constructor(baseLink: string, maxProductsInCart: number, filterAll: Ifilter) {
        this.model = new Model(baseLink);
        this.view = new Products();
        this.maxProductsInCart = maxProductsInCart;
        this.filterAll = filterAll;
    }
    start() {
        this.model.load((data) => {
            if (data !== undefined) this.displayOnPage(data);
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
                if (this.isFullCart(cartNumber)) this.view.openPopUp("Извините, все слоты заполнены")
                else {
                    this.view.addProductInCart(elm)
                    this.filterAll.productInCart = this.filterAll.productInCart + `${elm.dataset.id}&`
                    cartNumber++
                }
            }
            else {
                this.view.removeProductInCart(elm)
                this.filterAll.productInCart = this.filterAll.productInCart.replace(`${elm.dataset.id}&`, '');
                cartNumber--
            }
            cart.textContent = `${cartNumber}`
        }
    }

    handleSorting() {
        const sortingStatus = <HTMLSelectElement>document.querySelector(".sorting");
        this.filterAll.typeSorting = sortingStatus.value;
        const productsOnPageArray = this.view.getProductsOnPage();
        this.model.sorting(productsOnPageArray, sortingStatus.value)
    }
    handleSliderTime(values: number, handle: number) {
        this.filterAll.SliderTime[handle] = values;
        this.model.load((data) => { if (data !== undefined) this.displayOnPage(data) })
    }

    handleSliderRange(values: number, handle: number) {
        this.filterAll.SliderRange[handle] = values;
        //this.model.load((data) => { if (data !== undefined) this.displayOnPage(data) })
    }

    handleObjectBlock(e: Event) {
        const elm = e.target as HTMLElement;
        if (elm.classList.contains("chek-object")) {
            const elmInput = elm as HTMLInputElement
            if (elmInput.checked) this.filterAll.placeVizitId += `${elmInput.value}&`
            else this.filterAll.placeVizitId = this.filterAll.placeVizitId.replace(`${elmInput.value}&`, '');
            this.model.load((data) => { if (data !== undefined) this.displayOnPage(data) })

        }
    }

    handleFavorit(e: Event) {
        const elm = e.target as HTMLElement;
        if (elm.classList.contains("chek-object")) {
            const elmInput = elm as HTMLInputElement
            this.filterAll.favorit = elmInput.checked
        }
        this.model.load((data) => { if (data !== undefined) this.displayOnPage(data) })
    }

    getFilterData(data: arrayProducts) {
        //фильт по избранному
        if (this.filterAll.favorit) data = data?.filter(itemData => itemData.favorit === this.filterAll.favorit);
        //фильт по объектам
        if (this.filterAll.placeVizitId !== '') {
            data = data?.filter(itemData => {
                let isFilter = false;
                const placeVizitArray = this.filterAll.placeVizitId.split('&');
                itemData.placeVizitId.forEach(item => isFilter = (placeVizitArray.includes(item)) ? true : isFilter)
                return isFilter;
            })
        }
        //фильтр по времени
        data = data?.filter(itemData => (itemData.time >= this.filterAll.SliderTime[0]) && (itemData.time <= this.filterAll.SliderTime[1]));
        //фильтр по растоянию
        //  data = data?.filter(itemData => (itemData.range >= this.filterAll.SliderRange[0]) && (itemData.range <= this.filterAll.SliderRange[1]));
        return data
    }
    displayOnPage(data: arrayProducts) {
        const inputSearch = <HTMLInputElement>document.getElementById('site-search');
        inputSearch.value = ''
        data = this.getFilterData(data);
        if (data?.length === 0) {
            this.view.openPopUp("Извините, совпадений не обнаружено");
            return
        }
        this.view.draw(data);
        const productsOnPageArray = this.view.getProductsOnPage();
        productsOnPageArray.forEach((item) => {
            const elm = <HTMLElement>item.querySelector('.product__button')
            const idItem = elm.dataset.id;
            if (this.filterAll.productInCart.indexOf(`${idItem}&`) !== -1) {
                this.view.addProductInCart(elm);
            }
        })
        this.model.sorting(productsOnPageArray, this.filterAll.typeSorting);

    }

    filterReset() {
        const objectList = document.querySelectorAll('.chek-object');
        const objectArray = Array.prototype.slice.call(objectList);
        objectArray.forEach((item) => item.checked = false);
        this.filterAll.placeVizitId = '';
        this.filterAll.favorit = false;
        this.model.load((data) => { if (data !== undefined) this.displayOnPage(data) })
    }

}

