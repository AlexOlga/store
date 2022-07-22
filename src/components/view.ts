import { arrayProducts, Ifilter } from './type'
import './popup.css'

export class Products {
    draw(data: arrayProducts) {
        const fragment = document.createDocumentFragment();
        const newsItemTemp = <HTMLTemplateElement>document.querySelector('#productItemTemp');
        data.forEach((item) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement;
            (newsClone.querySelector('.product__button') as HTMLImageElement).dataset.id = `${item.id}`;
            (newsClone.querySelector('.product__img') as HTMLImageElement).src = item.urlToImage;
            (newsClone.querySelector('.product__name') as HTMLElement).textContent = item.name;
            (newsClone.querySelector('.product__description') as HTMLElement).textContent = item.description;
            (newsClone.querySelector('.product__range') as HTMLElement).textContent = `${item.range} а.е.`;
            (newsClone.querySelector('.product__time') as HTMLElement).textContent = `${item.time}`;
            (newsClone.querySelector('.product__placeVizit') as HTMLElement).textContent = item.placeVizit.join(' ');
            (newsClone.querySelector('.product__price') as HTMLElement).textContent = `${item.price}`;

            fragment.append(newsClone);
        });

        (document.querySelector('.products') as HTMLElement).innerHTML = '';
        (document.querySelector('.products') as HTMLElement).appendChild(fragment);
    }
    addProductInCart(elm: HTMLElement) {
        elm.dataset.add = "true"
        elm.textContent = "Передумать"
        const parentElm = elm.closest('.product-item');
        parentElm?.classList.add('product-item_active')

    }
    removeProductInCart(elm: HTMLElement) {
        elm.dataset.add = "false"
        elm.textContent = "В корзину"
        const parentElm = elm.closest('.product-item');
        parentElm?.classList.remove('product-item_active')
    }

    getProductsOnPage() {
        const productsContener = <HTMLSelectElement>document.querySelector(".products");
        const productsOnPageList = productsContener.querySelectorAll('.product-item');
        const productsOnPageArray = Array.prototype.slice.call(productsOnPageList);
        return productsOnPageArray;
    }
    getLocalStorage(allFilter: Ifilter) {
        //console.log('отрисовка на странице', allFilter)
        //элементы в корзине
        const cart = (document.querySelector('.cart__number') as HTMLElement)
        if (allFilter.productInCart === '') cart.textContent = `0`
        else {
            const numberProductsInCart = allFilter.productInCart.split('&').length - 1;
            cart.textContent = `${numberProductsInCart}`;
        }
        //избранное
        const favoritElement = <HTMLInputElement>document.getElementById('favorit');
        if (allFilter.favorit) favoritElement.checked = true;
        //сортировка
        const sortingStatus = <HTMLSelectElement>document.querySelector(".sorting");
        sortingStatus.value = allFilter.typeSorting;
        //объекты
        if (allFilter.placeVizitId !== '') {
            const objectBody = document.querySelector('.object-body');
            if (objectBody) {
                const objectArrayLoad = allFilter.placeVizitId.split('&');
                objectArrayLoad.forEach((item) => {
                    const elmOnPage = <HTMLInputElement>document.getElementById(item);
                    if (elmOnPage) elmOnPage.checked = true
                });
            }
        }
        //слайдер время
        const timeValues: Array<HTMLInputElement> = [
            <HTMLInputElement>document.getElementById('slider-time-value-lower'),
            <HTMLInputElement>document.getElementById('slider-time-value-upper')
        ];
        timeValues[0].value = `${allFilter.SliderTime[0]}`;
        timeValues[1].value = `${allFilter.SliderTime[1]}`;
        //слайдер растояние
        const rangeValues: Array<HTMLInputElement> = [
            <HTMLInputElement>document.getElementById('slider-range-value-lower'),
            <HTMLInputElement>document.getElementById('slider-range-value-upper')
        ];
        rangeValues[0].value = `${allFilter.SliderRange[0]}`;
        rangeValues[1].value = `${allFilter.SliderRange[1]}`;
    }
    openPopUp(messenge: string) {
        const popup = document.querySelector('.pop');
        const blackout = document.querySelector('.blackout');
        (document.querySelector('.pop__text') as HTMLElement).textContent = messenge;
        if (popup) popup.classList.add('pop-active');
        if (blackout) blackout.classList.add('blackout-active');
        document.body.classList.add('look');
    }
    closePopUp() {
        const popup = document.querySelector('.pop');
        const blackout = document.querySelector('.blackout');
        if (popup) {
            popup.classList.remove('pop-active');
            document.body.classList.remove('look');
            if (blackout) blackout.classList.remove('blackout-active');
        }

    }
}

