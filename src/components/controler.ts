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
            console.log(data);
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
        console.log('sortingStatus', sortingStatus);
        this.filterAll.typeSorting = sortingStatus.value;
        console.log('sortingStatus', sortingStatus.value)
        const productsOnPageArray = this.view.getroductsOnPage();
        this.model.sorting(productsOnPageArray, sortingStatus.value)
    }
    /*
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
        handleSliderRange(values: number, handle: number) {
            this.SliderRange[handle] = values;
            this.model.load((data) => {
                data = data?.filter(item => (item.time >= this.SliderRange[0]) && (item.time <= this.SliderRange[1]));
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
        */
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
        /* this.model.load((data) => {
            if (this.filterAll.favorit) data = data?.filter(itemData => itemData.favorit === this.filterAll.favorit);
             console.log('рисуем нужное', data);
         })*/
    }

    getFilterData(data: arrayProducts) {
        // console.log('data do', data);
        //фильт по избранному
        if (this.filterAll.favorit) data = data?.filter(itemData => itemData.favorit === this.filterAll.favorit);
        console.log('data favorit', this.filterAll.favorit, data);
        //фильт по объектам
        if (this.filterAll.placeVizitId !== '') {
            data = data?.filter(itemData => {
                let isFilter = false;
                const placeVizitArray = this.filterAll.placeVizitId.split('&');
                itemData.placeVizitId.forEach(item => isFilter = (placeVizitArray.includes(item)) ? true : isFilter)
                return isFilter;
            })
        }

        console.log('data obj', data);
        /*
        //фильтр по времени
        data = data?.filter(item => (item.time >= this.SliderTime[0]) && (item.time <= this.SliderTime[1]));
        console.log('data time', data);
        ///фильтр по растоянию
        data = data?.filter(item => (item.time >= this.SliderRange[0]) && (item.time <= this.SliderRange[1]));
        console.log('data itog', data);
        */
        return data
    }
    displayOnPage(data: arrayProducts) {
        console.log('data do', data);
        data = this.getFilterData(data);
        if (data?.length === 0) {
            alert("Извините, совпадений не обнаружено");
            return
        }
        this.view.draw(data);
        const productsOnPageArray = this.view.getroductsOnPage();
        productsOnPageArray.forEach((item) => {
            const elm = <HTMLElement>item.querySelector('.product__button')
            const idItem = elm.dataset.id;
            if (this.filterAll.productInCart.indexOf(`${idItem}&`) !== -1) {
                this.view.addProductInCart(elm);
            }
        })
        this.model.sorting(productsOnPageArray, this.filterAll.typeSorting);
    }
}

